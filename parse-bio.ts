import fs from 'fs';

const html = fs.readFileSync('profile.html', 'utf-8');

// Look for user bio, avatar, location, etc.
const avatarMatch = html.match(/https:\/\/mir-s3-cdn-cf\.behance\.net\/user\/[^\s"']+/);
console.log("Avatar:", avatarMatch ? avatarMatch[0] : null);

// Search for json data embedded in html (like window.__INITIAL_STATE__ or similar)
const jsonRegex = /<script[^>]*>\s*window\.(?:__INITIAL_STATE__|__BEHANCE_STATE__)\s*=\s*({[\s\S]*?});\s*<\/script>/;
const jsonMatch = html.match(jsonRegex);
if (jsonMatch) {
  console.log("Found state match!");
} else {
  // search for "user":
  const userMatches = [...html.matchAll(/"user"\s*:\s*({[^}]+})/g)];
  console.log("User matches count:", userMatches.length);
  if (userMatches.length > 0) {
    console.log(userMatches[0][0].slice(0, 300));
  }
}

// Check title and meta
const title = html.match(/<title>(.*?)<\/title>/)?.[1];
const metaDesc = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/)?.[1];
console.log("Title:", title);
console.log("Meta desc:", metaDesc);

// Look for occupation / company / fields
const occ = html.match(/"occupation":"([^"]+)"/)?.[1];
const city = html.match(/"city":"([^"]+)"/)?.[1];
const country = html.match(/"country":"([^"]+)"/)?.[1];
console.log("Occupation:", occ, "Location:", city, country);
