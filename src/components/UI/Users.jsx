"use client";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import { useState } from "react";
import fetchData from "@/lib/fetchData";
import filterImages from "@/helpers/filterImages";
import ImageCard from "./ImageCard";
import UserCard from "./UserCard";

export default function Users({ staticUsers, totalUsers = 200, endpoint }) {
  const [pageNum, setPageNum] = useState(2);
  const [filteredUsers, setFilteredUsers] = useState([...staticUsers]);
  const [error, setError] = useState(filteredUsers.length >= totalUsers);

  async function fetchNextPage() {
    const data = await fetchData(`${endpoint}&page=${pageNum}`);
    let users = data;

    if (data.length === 0) {
      setError(true);
      return;
    }

    if (data.results) {
      users = data.results;
    }

    const filteredData = filterImages([...filteredUsers, ...users]);

    setFilteredUsers(filteredData);
    setPageNum((prev) => prev + 1);
  }

  return (
    <main className="my-10 mx-12">
      <InfiniteScroll
        dataLength={filteredUsers.length}
        next={fetchNextPage}
        hasMore={filteredUsers.length < totalUsers && !error}
        loader={<Loader />}
        endMessage={<p></p>}
      >
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 300: 1, 550: 2, 1024: 3, 1440: 4 }}
        >
          <Masonry gutter="24px">
            {filteredUsers.flatMap((user) => {
              return <UserCard user={user} key={user.id} />;
            })}
          </Masonry>
        </ResponsiveMasonry>
      </InfiniteScroll>
    </main>
  );
}
