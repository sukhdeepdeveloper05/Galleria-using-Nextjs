import { getToken } from "@/helpers/token";
import fetchProfile from "@/lib/fetchProfile";
import Link from "next/link";
import AvatarButton from "./AvatarButton";
import SearchForm from "./SearchForm";

export default async function Header() {
  const token = await getToken();
  let profile = null;

  if (token !== undefined) {
    profile = await fetchProfile();
  }

  return (
    <header className="flex items-center justify-between sm:sticky top-0 z-[4] bg-white py-2 px-4 sm:py-3 sm:px-6 gap-2">
      <Link href="/" className="text-2xl text-black font-semibold">
        Galleria.
      </Link>
      <div className="flex items-center justify-center gap-2">
        <SearchForm />
        {!token ? (
          <Link href="/login" className="btn-outline">
            Log in
          </Link>
        ) : (
          <AvatarButton profile={profile} />
        )}
      </div>
    </header>
  );
}
