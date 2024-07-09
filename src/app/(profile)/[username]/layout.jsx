import ProfileTabsNav from "@/components/Profile/TabsNav";
import UserDetails from "@/components/Profile/UserDetails";
import { getToken } from "@/helpers/token";
import fetchData from "@/lib/fetchData";
import fetchProfile from "@/lib/fetchProfile";

export async function generateMetadata({ params }) {
  const username = params.username.replace("%40", "");
  // %40 for the sign @
  if (username) {
    const user = await fetchData(`/users/${username}`);

    return {
      title: `${user.name} (@${user.username}) | Galleria`,
      description: `See the best ${user.total_photos} free to download photos, images, and wallpapers by ${user.name} on Galleria.`,
    };
  }
}

export default async function ProfileLayout({ children, params }) {
  const username = params.username.replace("%40", "");
  // %40 for the sign @
  const user = await fetchData(`/users/${username}`);

  const token = await getToken();
  let loggedInUser = null;
  let isAdmin = false;

  if (token !== undefined) {
    loggedInUser = await fetchProfile();
    
    if (loggedInUser.username === username) {
      isAdmin = true;
    }
  }

  return (
    <main>
      <UserDetails user={user} loggedInUser={loggedInUser} isAdmin={isAdmin} />
      <ProfileTabsNav user={user} />
      {children}
    </main>
  );
}
