import { Database } from "@/common/db/database";
// get a list of videos
export async function GET() {
  try {
    const data = await Database.videos();

    return Response.json(data);
  } catch {
    return new Response(`File not found`, { status: 400 });
  }
}
