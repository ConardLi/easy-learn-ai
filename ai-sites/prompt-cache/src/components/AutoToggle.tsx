import type { PlaybackMode } from "../hooks/useAudioPlayer";
import "./AutoToggle.css";

interface Props {
  mode: PlaybackMode;
  onCycle(): void;
}

const LABEL: Record<PlaybackMode, string> = {
  manual: "MANUAL",
  audio: "AUDIO",
  auto: "AUTO",
};

/**
 * Hidden-on-hover playback mode toggle, fixed top-right.
 * Default opacity 0; hover the corner reveals it. Click cycles the mode.
 * `data-no-advance` so clicking the button doesn't advance the stage.
 */
export function AutoToggle({ mode, onCycle }: Props) {
  return (
    <div className="at-hover" data-no-advance>
      <button
        className={`at-btn at-${mode}`}
        onClick={(e) => {
          e.stopPropagation();
          onCycle();
        }}
        title="切换播放模式（M）"
      >
        <span className="at-dot" />
        <span className="at-label">{LABEL[mode]}</span>
      </button>
    </div>
  );
}
