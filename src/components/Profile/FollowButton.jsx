import fetchData from "@/lib/fetchData";

export default async function FollowButton({ user, loggedInUser }) {
  let isFollowing = false;

  let followingList = [];
  if (loggedInUser) {
    for (let i = 0; i < Math.ceil(loggedInUser.following_count / 30); i++) {
      const resData = await fetchData(
        `/users/${loggedInUser.username}/following/?per_page=30&page=${i}`
      );

      followingList.push(...resData);

      const userFound = followingList.find((item) => {
        if (item.username === user.username) return true;
      });

      if (userFound) {
        isFollowing = true;
        break;
      }
    }
  }
  return (
    <a
      href={`https://unsplash.com/@${user.username}`}
      target="_blank"
      className="btn-outline"
    >
      {isFollowing ? "Followed" : "Follow"}
    </a>
  );
}
