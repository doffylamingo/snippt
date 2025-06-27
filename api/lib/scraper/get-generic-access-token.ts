export async function getGenericAccessToken(): Promise<string> {
  const res = await fetch("https://everynoise.com/research.cgi");
  const html = await res.text();

  const tokenRegex = /Bearer\s+([A-Za-z0-9-_]+)/;
  const match = html.match(tokenRegex);

  if (!match) {
    throw new Error("Token regex didn't match");
  }

  const token = match[1];
  return token;
}
