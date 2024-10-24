"use client";

import setCookie from "@/helpers/setCookie";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function LoginBtn() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();

    await setCookie("redir", pathname);
    // document.cookie = `redir=${pathname}`;

    return router.push("/login");
  }
  return (
    <Link
      href="/login"
      onClick={async (e) => await handleLogin(e)}
      className="btn-outline"
    >
      Log in
    </Link>
  );
}
