import fs from 'fs';

interface ProjectInfo {
  id: number;
  title: string;
  client: string;
  year: string;
  category: string;
  image: string;
  description: string;
  gallery: string[];
  behanceUrl?: string;
  isNew?: boolean;
}

let cookieValue = '';

async function fetchWithChallenge(url: string): Promise<string | null> {
  try {
    let headers: Record<string, string> = {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    };
    if (cookieValue) {
      headers['Cookie'] = `js_challenge_value=${cookieValue}`;
    }

    let res = await fetch(url, { headers });
    let text = await res.text();

    if (text.includes('js_challenge_value=')) {
      const match = text.match(/js_challenge_value=([^;]+)/);
      if (match) {
        cookieValue = match[1];
        headers['Cookie'] = `js_challenge_value=${cookieValue}`;
        res = await fetch(url, { headers });
        text = await res.text();
      }
    }

    if (res.status === 200) {
      return text;
    }
    console.warn(`Fetch returned status ${res.status} for ${url}`);
    return null;
  } catch (err) {
    console.error(`Fetch error for ${url}:`, err);
    return null;
  }
}

async function scrapeProject(url: string, fallbackCover: string, fallbackDesc: string, pubYear: string): Promise<Partial<ProjectInfo> | null> {
  const html = await fetchWithChallenge(url);
  if (!html) {
    return {
      image: fallbackCover,
      description: fallbackDesc,
      gallery: [fallbackCover]
    };
  }

  // Cover image
  const coverMatch = html.match(/https:\/\/mir-s3-cdn-cf\.behance\.net\/projects\/(?:404|original)\/[^"'\s\\]+/);
  let cover = coverMatch ? coverMatch[0].replace('/404/', '/original/') : fallbackCover;

  // Gallery images (1400 / original)
  const galleryMatches = [...html.matchAll(/https:\/\/mir-s3-cdn-cf\.behance\.net\/project_modules\/[^/]+\/([^"'\s,]+)/g)];
  const galleryMatchesJSON = [...html.matchAll(/https:\\u002F\\u002Fmir-s3-cdn-cf\.behance\.net\\u002Fproject_modules\\u002F[^/]+\\u002F([^"'\s,]+)/g)];

  const uniqueImages = Array.from(new Set([
    ...galleryMatches.map(m => m[1]),
    ...galleryMatchesJSON.map(m => m[1])
  ])).filter(filename => !filename.includes('silhouette') && !filename.includes('avatar'));

  const gallery = uniqueImages.map(filename => `https://mir-s3-cdn-cf.behance.net/project_modules/1400/${filename}`);

  return {
    image: cover,
    gallery: gallery.length > 0 ? gallery : [cover]
  };
}

async function main() {
  const rssRes = await fetch('https://www.behance.net/feeds/user?username=imwardo');
  const xml = await rssRes.text();
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];

  console.log(`Found ${items.length} projects in RSS feed`);

  const rssProjects: any[] = [];
  for (let i = 0; i < items.length; i++) {
    const raw = items[i][1];
    const fullTitle = raw.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] || 'Project';
    const link = raw.match(/<link><!\[CDATA\[(.*?)\]\]><\/link>/)?.[1] || '';
    const pubDate = raw.match(/<pubDate><!\[CDATA\[(.*?)\]\]><\/pubDate>/)?.[1] || '';
    const dateObj = new Date(pubDate);
    const year = isNaN(dateObj.getFullYear()) ? '2026' : dateObj.getFullYear().toString();

    // Extract cover and description from description tag
    const descContent = raw.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/)?.[1] || '';
    const imgMatch = descContent.match(/<img[^>]*src='([^']+)'/);
    const coverUrl = imgMatch ? imgMatch[1].replace('/404/', '/original/') : '';
    const textDesc = descContent.replace(/<[^>]+>/g, '').trim();

    // Client and category
    const parts = fullTitle.split('|').map(s => s.trim());
    const client = parts[0] || fullTitle;
    const category = parts[1] || 'Branding';

    rssProjects.push({
      fullTitle,
      client,
      category,
      link,
      year,
      coverUrl,
      description: textDesc || `Proyecto de ${category.toLowerCase()} para ${client}.`
    });
  }

  // Load existing projects-data.json for fallback or older projects
  let existing: any[] = [];
  try {
    existing = JSON.parse(fs.readFileSync('./projects-data.json', 'utf-8'));
  } catch (e) {}

  const finalProjects: ProjectInfo[] = [];

  for (let i = 0; i < rssProjects.length; i++) {
    const item = rssProjects[i];
    console.log(`Processing [${i+1}/${rssProjects.length}] ${item.fullTitle}...`);

    // Check if we already have gallery in existing
    const existingMatch = existing.find(e => e.client === item.client || e.title.includes(item.client));

    let gallery: string[] = [];
    let image = item.coverUrl;

    if (existingMatch && existingMatch.gallery && existingMatch.gallery.length > 5 && item.year !== '2026') {
      gallery = existingMatch.gallery;
      image = existingMatch.image || item.coverUrl;
      console.log(`  Using cached gallery (${gallery.length} items)`);
    } else {
      console.log(`  Scraping gallery from ${item.link}...`);
      const scraped = await scrapeProject(item.link, item.coverUrl, item.description, item.year);
      if (scraped && scraped.gallery && scraped.gallery.length > 0) {
        gallery = scraped.gallery;
        if (scraped.image) image = scraped.image;
        console.log(`  Found ${gallery.length} gallery items`);
      } else {
        gallery = [item.coverUrl];
      }
      // Wait 1.5s between requests to be gentle
      await new Promise(r => setTimeout(r, 1500));
    }

    finalProjects.push({
      id: i + 1,
      title: item.fullTitle,
      client: item.client,
      year: item.year,
      category: item.category,
      image,
      description: item.description,
      gallery,
      behanceUrl: item.link,
      isNew: parseInt(item.year, 10) >= 2026
    });
  }

  // Append older projects from existing that are not in RSS feed (Puerta Urbana, Caqueta Birding, Alebrije, Moca Tentaciones)
  for (const oldP of existing) {
    const alreadyIncluded = finalProjects.some(p => p.client.toLowerCase() === oldP.client.toLowerCase());
    if (!alreadyIncluded) {
      finalProjects.push({
        id: finalProjects.length + 1,
        title: oldP.title.replace(' :: Behance', ''),
        client: oldP.client.replace(' :: Behance', ''),
        year: oldP.year,
        category: oldP.category.replace(' :: Behance', ''),
        image: oldP.image,
        description: oldP.description.replace(' :: Behance', ''),
        gallery: oldP.gallery || [oldP.image],
        behanceUrl: 'https://www.behance.net/imwardo',
        isNew: false
      });
      console.log(`Added historic project: ${oldP.client}`);
    }
  }

  fs.writeFileSync('./projects-data.json', JSON.stringify(finalProjects, null, 2));
  console.log(`Saved ${finalProjects.length} projects to ./projects-data.json`);
}

main();
