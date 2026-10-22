import { loadFacts } from "@/lib/data";
import { llmsFullText } from "@/lib/llms";

// Re-built at most once an hour, like the pages, so the README here follows the repo.
export const revalidate = 3600;

export async function GET() {
  return new Response(llmsFullText(await loadFacts()), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
