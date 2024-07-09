import Image from "next/image";
import FollowButton from "./FollowButton";
import { CheckCircleIcon } from "../Icons/Check";
import LocationIcon from "../Icons/Location";

export default function UserDetails({ user, loggedInUser, isAdmin }) {
  return (
    <section className="grid grid-cols-12 px-5 py-12 relative items-start gap-x-6">
      <figure className="flex justify-end col-span-4 pr-8">
        <Image
          src={user.profile_image.large}
          alt={`Avatar of user ${user.name}`}
          width={150}
          height={150}
          className="rounded-full bg-[#eee] overflow-hidden border border-[#0000000d]"
        />
      </figure>
      <div className="col-span-8 flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <h2 className="text-[40px]">{user.name}</h2>
          {!isAdmin && <FollowButton user={user} loggedInUser={loggedInUser} />}
        </div>
        <div className="flex flex-col gap-y-4">
          <p className="whitespace-pre-line max-w-[70%] leading-relaxed">
            {user.bio ||
              `Download free, beautiful high-quality photos curated by ${user.first_name}.`}
          </p>
          <ul className="flex flex-col gap-x-6 gap-y-2 list-none">
            {user.for_hire && (
              <li className="text-[#007fff] fill-current flex items-center gap-2">
                <CheckCircleIcon />
                Available for hire
              </li>
            )}
            {user.location && (
              <li className="flex items-center gap-2 text-gray fill-current">
                <LocationIcon />
                {user.location}
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
