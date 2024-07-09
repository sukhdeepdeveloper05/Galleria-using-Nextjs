import { redirect } from "next/navigation";
import { apiKey } from "../../../config";

export async function GET(request) {
  const params = `redirect_uri=http://localhost:3000/callback&response_type=code&scope=public+read_user+write_user+read_photos+write_photos+write_likes+write_followers+read_collections+write_collections&client_id=${apiKey}`;

  return redirect("https://unsplash.com/oauth/authorize?" + params);
}
