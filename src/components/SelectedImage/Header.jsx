import { CheckCircleIcon } from "../Icons/Check";
import Image from "next/image";
import Link from "next/link";
import DownloadBtnFull from "../UI/DownloadBtnFull";

export default function SelectedImageHeader({ image }) {
  return (
    <header className="bg-white flex items-center justify-between sticky top-0 sm:top-16 left-0 right-0 z-10 px-5 py-3 rounded">
      <Link
        className="flex items-center text-black no-underline"
        href={`/@${image.user.username}`}
      >
        <figure className="rounded-full overflow-hidden mr-2 border border-[#0000000d]">
          <Image
            alt={image.user.name}
            src={image.user.profile_image.small}
            width={32}
            height={32}
          />
        </figure>
        <div className="flex flex-col text-sm">
          <span>{image.user.name}</span>
          {image.user.for_hire ? (
            <span className="text-[#007fff] text-xs inline-flex items-center">
              Available for hire&nbsp;
              <CheckCircleIcon />
            </span>
          ) : (
            <span className="text-xs text-gray">@{image.user.username}</span>
          )}
        </div>
      </Link>
      <DownloadBtnFull image={image} />
    </header>
  );
}
