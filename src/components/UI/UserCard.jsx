import Image from "next/image";
import Link from "next/link";

export default function UserCard({ user }) {
  return (
    <div className="flex flex-col gap-4 rounded-lg p-4 border border-[#d1d1d1] hover:border-black transition">
      <Link href={`/@${user.username}`} className="flex items-center">
        <figure className="overflow-hidden rounded-full border border-[#0000000d] mr-4">
          <Image
            src={user.profile_image.medium}
            width={64}
            height={64}
            alt={`Avatar of user ${user.name}`}
          />
        </figure>
        <div className="min-w-0">
          <h5 className="text-lg font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
            {user.name}
          </h5>
          <p className="text-lightGray text-[15px]">{user.username}</p>
        </div>
      </Link>
      {user.photos.length !== 0 && (
        <Link href={`/@${user.username}`} className="flex gap-2">
          {Array(3)
            .fill(null)
            .map((v, i) => {
              return user.photos[i] ? (
                <figure className="relative flex-1 aspect-[4/3]">
                  <Image src={user.photos[i].urls.thumb} fill sizes="100px" />
                </figure>
              ) : (
                <div className="flex-1 aspect-[4/3] bg-[#eee]" />
              );
            })}
        </Link>
      )}
      <Link href={`/@${user.username}`} className="btn-outline text-center">View profile</Link>
    </div>
  );
}
