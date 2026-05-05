#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# synthesize-audio.sh — read audio-segments.json and call MiniMax CLI
# (mmx) to produce one mp3 per segment under public/audio/<chapter>/<N>.mp3.
#
# Prereq:
#   1. npm run extract-narrations   (writes audio-segments.json)
#   2. mmx-cli installed and authenticated (`mmx auth status`)
#
# Behavior:
#   • Serial calls (TTS APIs commonly rate-limit parallel requests).
#   • Skips segments whose mp3 already exists (so you can rerun safely
#     after a partial failure). Pass --force to re-synthesize all.
#   • Prints progress per segment with elapsed time.
#
# Usage:
#   bash scripts/synthesize-audio.sh                # incremental
#   bash scripts/synthesize-audio.sh --force        # overwrite all
#   bash scripts/synthesize-audio.sh --voice=<id>   # override voice
# ─────────────────────────────────────────────────────────────────────
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SEGMENTS="$ROOT/audio-segments.json"
OUT_DIR="$ROOT/public/audio"

FORCE=false
VOICE_ID=""
for arg in "$@"; do
  case "$arg" in
    --force) FORCE=true ;;
    --voice=*) VOICE_ID="${arg#--voice=}" ;;
    *) echo "✗ unknown arg: $arg" >&2; exit 1 ;;
  esac
done

if [[ ! -f "$SEGMENTS" ]]; then
  echo "✗ $SEGMENTS not found. Run: npm run extract-narrations" >&2
  exit 1
fi
if ! command -v mmx >/dev/null; then
  cat <<EOF >&2
✗ mmx CLI not found in PATH.

  Install:  npm install -g mmx-cli
  Login:    mmx auth login --api-key sk-xxxxx
            (get a key at https://platform.minimaxi.com)

If you don't want to use MiniMax, see references/AUDIO.md "用户自带 TTS"
for how to plug in any other TTS engine.
EOF
  exit 1
fi
if ! command -v jq >/dev/null; then
  echo "✗ jq is required to read audio-segments.json" >&2
  exit 1
fi

total=$(jq 'length' "$SEGMENTS")
i=0
synthesized=0
skipped=0
failed=0

while IFS= read -r row; do
  i=$((i + 1))
  chapter=$(echo "$row" | jq -r '.chapter')
  step=$(echo "$row" | jq -r '.step')
  text=$(echo "$row" | jq -r '.text')
  out="$OUT_DIR/$chapter/$step.mp3"

  if [[ -f "$out" && "$FORCE" != true ]]; then
    skipped=$((skipped + 1))
    printf "[%3d/%d] %-20s skip (exists)\n" "$i" "$total" "$chapter/$step.mp3"
    continue
  fi

  mkdir -p "$(dirname "$out")"
  start=$(date +%s)
  # Build args as an array so values containing spaces / parens (e.g. voice
  # id "Chinese (Mandarin)_Gentleman") survive word-splitting.
  args=(--text "$text" --out "$out")
  if [[ -n "$VOICE_ID" ]]; then
    args=(--voice "$VOICE_ID" "${args[@]}")
  fi
  err_log="$(mktemp)"
  attempt=0
  max_attempts=3
  while :; do
    attempt=$((attempt + 1))
    if mmx speech synthesize "${args[@]}" >/dev/null 2>"$err_log"; then
      elapsed=$(( $(date +%s) - start ))
      synthesized=$((synthesized + 1))
      printf "[%3d/%d] %-20s ✓ %ss\n" "$i" "$total" "$chapter/$step.mp3" "$elapsed"
      rm -f "$err_log"
      break
    fi
    err_msg=$(tr '\n' ' ' < "$err_log" | head -c 160)
    # Auto-retry on transient RPM / rate-limit errors with backoff
    if [[ "$err_msg" == *"rate limit"* || "$err_msg" == *"RPM"* ]] \
         && (( attempt < max_attempts )); then
      printf "[%3d/%d] %-20s … rate-limited, retry %d/%d after %ds\n" \
        "$i" "$total" "$chapter/$step.mp3" "$attempt" "$max_attempts" \
        $((attempt * 5))
      sleep $((attempt * 5))
      continue
    fi
    failed=$((failed + 1))
    rm -f "$err_log"
    printf "[%3d/%d] %-20s ✗ FAILED · %s\n" "$i" "$total" "$chapter/$step.mp3" "$err_msg" >&2
    sleep 3
    break
  done
  # pacing between calls — keep request rate well under typical TTS RPM limits
  sleep 1.2
done < <(jq -c '.[]' "$SEGMENTS")

echo
echo "✓ done — synthesized $synthesized, skipped $skipped, failed $failed"
[[ $failed -eq 0 ]] || exit 2
