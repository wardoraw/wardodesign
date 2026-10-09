async function test() {
  const url = "https://www.behance.net/gallery/256803777/HONOR-600-Campaign";
  const res1 = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    }
  });
  const text1 = await res1.text();
  const cookieMatch = text1.match(/js_challenge_value=([^;]+)/);
  console.log("Challenge cookie found:", !!cookieMatch);
  
  if (cookieMatch) {
    const cookie = `js_challenge_value=${cookieMatch[1]}`;
    const res2 = await fetch(url, {
      headers: {
        "Cookie": cookie,
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
      }
    });
    console.log("Response 2 status:", res2.status);
    const text2 = await res2.text();
    console.log("Response 2 length:", text2.length);
    
    const galleryMatches = [...text2.matchAll(/https:\/\/mir-s3-cdn-cf\.behance\.net\/project_modules\/[^/]+\/([^"'\s,]+)/g)];
    const galleryMatchesJSON = [...text2.matchAll(/https:\\u002F\\u002Fmir-s3-cdn-cf\.behance\.net\\u002Fproject_modules\\u002F[^/]+\\u002F([^"'\s,]+)/g)];
    const unique = new Set([...galleryMatches.map(m => m[1]), ...galleryMatchesJSON.map(m => m[1])]);
    console.log("Unique gallery images found:", unique.size);
    console.log("Sample:", Array.from(unique).slice(0, 5));
  }
}

test();
