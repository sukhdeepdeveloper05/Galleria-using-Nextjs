import TopicsNav from "@/components/Header/TopicsNav";
import fetchData from "@/lib/fetchData";

export default async function WithTopicsListLayout({ children }) {
  const topics = await fetchData("/topics/?per_page=30");

  return (
    <>
      <TopicsNav topics={topics} />
      {children}
    </>
  );
}
