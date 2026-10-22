import { loadFacts } from "@/lib/data";
import { llmsText } from "@/lib/llms";

// Re-built at most once an hour, like the pages, so the counts follow the repo.
export const revalidate = 3600;

export async function GET() {
  return new Response(llmsText(await loadFacts()), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
