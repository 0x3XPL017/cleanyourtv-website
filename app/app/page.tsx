import { redirect } from "next/navigation";

// /app is the short link for the community Android app page.
export default function AppIndex() {
  redirect("/app/android");
}
