import { redirect } from "next/navigation";
import { apiKey } from "../../../config";

export async function GET(request) {
  const redirect_uri = request.nextUrl.origin + "/callback";

  const params = `redirect_uri=${redirect_uri}&response_type=code&scope=public+read_user+write_user+read_photos+write_photos+write_likes+write_followers+read_collections+write_collections&client_id=${apiKey}`;

  return redirect("https://unsplash.com/oauth/authorize?" + params);
}
