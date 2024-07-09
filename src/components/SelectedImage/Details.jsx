import CalenderIcon from "../Icons/Calender";
import CameraIcon from "../Icons/Camera";
import SafetyIcon from "../Icons/Safety";

export default function Details({ image }) {
  const formattedDate = new Date(image.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <div className="details flex flex-col gap-2">
      {image.location.name && (
        <div className="flex items-center gap-2 text-gray text-sm fill-current">
          <LocationIcon />
          <span>{image.location.name}</span>
        </div>
      )}

      <div className="flex items-center gap-2 text-gray text-sm fill-current">
        <CalenderIcon />
        <span>
          Published on&nbsp;
          <time dateTime={formattedDate}>{formattedDate}</time>
        </span>
      </div>

      {image.exif.name && (
        <div className="flex items-center gap-2 text-gray text-sm fill-current">
          <CameraIcon />
          <span>{image.exif.name}</span>
        </div>
      )}

      <div className="flex items-center gap-2 text-gray text-sm fill-current">
        <SafetyIcon />
        <span>
          Free to use under the&nbsp;
          <a
            href="https://unsplash.com/license"
            target="_blank"
            rel="noreferrer"
          >
            Unsplash License
          </a>
        </span>
      </div>
    </div>
  );
}

function LocationIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      version="1.1"
      aria-hidden="false"
    >
      <path d="M17.6 4.2C16 2.7 14.1 2 12 2s-4 .7-5.6 2.2C4.8 5.7 4 7.7 4 10.2c0 1.7.7 3.5 2 5.4 1.3 2 3.3 4.1 6 6.4 2.7-2.3 4.7-4.4 6-6.4 1.3-2 2-3.8 2-5.4 0-2.5-.8-4.5-2.4-6zm-1.1 10.1c-1 1.5-2.5 3.2-4.5 5.1-2-1.9-3.5-3.6-4.5-5.1-1-1.5-1.5-2.9-1.5-4.1 0-1.8.6-3.3 1.7-4.5C8.9 4.6 10.3 4 12 4s3.1.6 4.3 1.7c1.2 1.2 1.7 2.6 1.7 4.5 0 1.2-.5 2.5-1.5 4.1zm-2-4.3c0 1.4-1.1 2.5-2.5 2.5S9.5 11.4 9.5 10s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5z"></path>
    </svg>
  );
}
