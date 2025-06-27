import { parse } from "node-html-parser";

export async function getSpotifyPreviewUrl(id: string): Promise<string> {
  const res = await fetch(`https://embed.spotify.com/?uri=spotify:track:${id}`);
  const data = await res.text();

  const root = parse(data);
  const scriptTag = root.querySelector("script#__NEXT_DATA__");

  if (!scriptTag) return "";

  const jsonData = JSON.parse(scriptTag.text);

  const audioPreviewUrl =
    jsonData?.props?.pageProps?.state?.data?.entity?.audioPreview?.url;

  return audioPreviewUrl || "";
}
