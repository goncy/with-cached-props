import { unstable_cache as cache } from "next/cache";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ user: string }>;
}) {
  // Get the information we want to use in the keyparts
  const cookieStore = await cookies();
  const { user } = await searchParams;

  // Create a fetch page method
  const fetchPageData = cache(
    async () => {
      return {
        title: "Home Page",
        user,
        bucket: cookieStore.get("bucket")?.value,
        timestamp: new Date().toISOString(),
      };
    },
    // Key parts are optional, but in here you can add cookies and params you are not using in the request itself to make it unique for this subset
    [cookieStore.get("bucket")?.value, user],
    // Define tags and revalidation time, defining a tag will allow you to invalidate all permutations you have tagged with that tag at once
    {
      tags: ["home-page"],
      revalidate: 30,
    }
  );

  // Fetch the page data
  const pageData = await fetchPageData();

  return (
    <div>
      <h1>{pageData.title}</h1>
      <p>User: {pageData.user}</p>
      <p>Bucket: {pageData.bucket}</p>
      <p>Timestamp: {pageData.timestamp}</p>
    </div>
  );
}
