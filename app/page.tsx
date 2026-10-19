import TvSite from "@/components/TvSite";
import { loadSiteData } from "@/lib/data";

// Content comes from the cleanyourtv repo and GitHub, re-fetched at most once an hour.
export const revalidate = 3600;

export default async function Page() {
  const data = await loadSiteData();
  return <TvSite data={data} />;
}
