import { cdn } from "@/lib/site";
import { type Video, videoDate, videoLength, videoViews } from "@/lib/videos";

function Cards({ videos }: { videos: Video[] }) {
  return (
    <ul className="press-grid video-grid">
      {videos.map((v) => (
        <li key={v.id}>
          <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener" className="press-card video-card">
            <span className="video-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cdn(`/press/videos/${v.id}.jpg`)} alt="" width={480} height={360} loading="lazy" decoding="async" />
              <span className="video-play" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
                </svg>
              </span>
              {v.duration > 0 && <span className="video-length">{videoLength(v.duration)}</span>}
            </span>
            <span className="press-body">
              <span className="press-title">{v.title}</span>
              <span className="press-date">{[v.channel, videoDate(v.date), videoViews(v.views)].filter(Boolean).join(" · ")}</span>
              <span className="sr-only"> (YouTube, opens in a new tab)</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Video cards in the /press card style, linking to YouTube (no embeds). The most watched show; the rest fold into a details. */
export default function VideoGrid({ videos, shown = 6 }: { videos: Video[]; shown?: number }) {
  const rest = videos.slice(shown);
  return (
    <div className="video-section">
      <Cards videos={videos.slice(0, shown)} />
      {rest.length > 0 && (
        <details className="video-more">
          <summary>
            <span className="video-more-open">Show all {videos.length} videos</span>
            <span className="video-more-close">Show fewer videos</span>
          </summary>
          <Cards videos={rest} />
        </details>
      )}
    </div>
  );
}
