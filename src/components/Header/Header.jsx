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
    <header className="flex items-center justify-between sticky top-0 z-[4] bg-white py-3 px-6">
      <Link href="/" className="text-2xl text-black font-semibold">
        Galleria.
      </Link>
      <div className="flex items-center justify-center gap-4">
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
