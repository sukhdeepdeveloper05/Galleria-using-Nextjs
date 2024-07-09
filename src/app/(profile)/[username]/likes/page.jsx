import Images from "@/components/UI/Images";
import fetchData from "@/lib/fetchData";

export default async function UserLikedPhotos({ params }) {
  const username = params.username.replace("%40", "");

  const userLikedPhotos = await fetchData(
    `/users/${username}/likes/?per_page=30&page=1`
  );
  const user = await fetchData(`/users/${username}`);

  return (
    <section className="min-h-96">
      <Images
        staticImages={userLikedPhotos}
        total_photos={user.total_likes}
        endpoint={`/users/${username}/likes/?per_page=30`}
      />
    </section>
  );
}
