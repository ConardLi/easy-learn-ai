import "./AutoStartGate.css";

interface Props {
  visible: boolean;
  onStart(): void;
}

/**
 * Full-screen overlay shown ONCE when `?auto=1` is loaded. Browsers block
 * audio playback until the page receives a user gesture, so we show this
 * gate and let the user press Space (or click) to release auto playback.
 *
 * After the user starts, the gate is hidden for the rest of the session.
 */
export function AutoStartGate({ visible, onStart }: Props) {
  if (!visible) return null;
  return (
    <div
      className="auto-gate"
      data-no-advance
      onClick={onStart}
      role="button"
      tabIndex={0}
    >
      <div className="auto-gate-card">
        <div className="auto-gate-kicker">AUTO PLAYBACK</div>
        <div className="auto-gate-title">Press SPACE to start</div>
        <div className="auto-gate-sub">
          Audio plays per step and advances automatically.
          <br />
          Press <kbd>M</kbd> any time to switch modes.
        </div>
      </div>
    </div>
  );
}
