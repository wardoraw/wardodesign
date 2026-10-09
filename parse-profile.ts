import fs from 'fs';

async function test() {
  const res1 = await fetch("https://www.behance.net/imwardo");
  const html = await res1.text();
  fs.writeFileSync('profile.html', html);
  console.log("Saved profile.html, length:", html.length);
  
  // Look for gallery urls
  const matches = [...html.matchAll(/\/gallery\/(\d+)\/([^"'?&]+)/g)];
  const projects = new Map();
  for (const m of matches) {
    if (!projects.has(m[1])) {
      projects.set(m[1], m[2]);
    }
  }
  console.log("Distinct gallery projects found in profile HTML:", projects.size);
  for (const [id, slug] of projects.entries()) {
    console.log(`https://www.behance.net/gallery/${id}/${slug}`);
  }
}

test();
