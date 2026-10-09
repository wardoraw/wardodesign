async function test() {
  const url = "https://www.behance.net/imwardo";
  const res1 = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    }
  });
  const text1 = await res1.text();
  const cookieMatch = text1.match(/js_challenge_value=([^;]+)/);
  if (cookieMatch) {
    const cookie = `js_challenge_value=${cookieMatch[1]}`;
    const res2 = await fetch(url, {
      headers: {
        "Cookie": cookie,
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
      }
    });
    console.log("Profile status:", res2.status);
    const text2 = await res2.text();
    console.log("Profile length:", text2.length);
    
    // Find all gallery URLs on profile
    const matches = [...text2.matchAll(/https:\/\/www\.behance\.net\/gallery\/\d+\/[a-zA-Z0-9_-]+/g)];
    const matches2 = [...text2.matchAll(/https:\\u002F\\u002Fwww\.behance\.net\\u002Fgallery\\u002F\d+\\u002F[a-zA-Z0-9_-]+/g)];
    const urls = new Set([
      ...matches.map(m => m[0]),
      ...matches2.map(m => m[0].replace(/\\u002F/g, '/'))
    ]);
    console.log("Gallery URLs on profile:", urls.size);
    for (const u of urls) console.log(u);
  }
}

test();
