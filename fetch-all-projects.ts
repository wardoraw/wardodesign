import fs from 'fs';

async function fetchProjectImages(url: string) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    
    // Find cover image
    const coverMatch = html.match(/https:\/\/mir-s3-cdn-cf\.behance\.net\/projects\/404\/[^"']+/);
    let cover = coverMatch ? coverMatch[0] : null;
    if (cover) {
        cover = cover.replace('/404/', '/original/');
    }
    
    // Find gallery images
    const galleryMatches = [...html.matchAll(/https:\/\/mir-s3-cdn-cf\.behance\.net\/project_modules\/[^/]+\/([^"'\s,]+)/g)];
    const galleryMatchesJSON = [...html.matchAll(/https:\\u002F\\u002Fmir-s3-cdn-cf\.behance\.net\\u002Fproject_modules\\u002F[^/]+\\u002F([^"'\s,]+)/g)];
    
    const uniqueFilenames = new Set([
        ...galleryMatches.map(m => m[1]),
        ...galleryMatchesJSON.map(m => m[1])
    ]);
    
    const gallery = Array.from(uniqueFilenames).map(filename => `https://mir-s3-cdn-cf.behance.net/project_modules/1400/${filename}`);
    
    // Find title
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1].split(' on Behance')[0] : 'Project';
    
    return {
        title,
        url,
        cover,
        gallery
    };
  } catch (e) {
    console.error('Error fetching', url, e);
    return null;
  }
}

async function main() {
    const res = await fetch('https://www.behance.net/feeds/user?username=imwardo');
    const xml = await res.text();
    
    const linksMatches = [...xml.matchAll(/<link><!\[CDATA\[(.*?)\]\]><\/link>/g)];
    const pubDateMatches = [...xml.matchAll(/<pubDate><!\[CDATA\[(.*?)\]\]><\/pubDate>/g)];
    
    const links = linksMatches.map(m => m[1]).slice(0, 11);
    const years = pubDateMatches.map(m => {
        const date = new Date(m[1]);
        return isNaN(date.getFullYear()) ? '2024' : date.getFullYear().toString();
    }).slice(0, 11);
    
    console.log(`Found ${links.length} projects`);
    
    const projects = [];
    for (let i = 0; i < links.length; i++) {
        console.log(`Fetching ${i+1}/${links.length}: ${links[i]}`);
        const data = await fetchProjectImages(links[i]);
        if (data) {
            projects.push({
                id: i + 1,
                title: data.title,
                client: data.title.split('|')[0].trim(),
                year: years[i] || '2024',
                category: data.title.split('|')[1]?.trim() || 'Design',
                image: data.cover,
                description: `Proyecto de ${data.title.split('|')[1]?.trim() || 'diseño'} para ${data.title.split('|')[0].trim()}.`,
                gallery: data.gallery
            });
        }
    }
    
    fs.writeFileSync('./projects-data.json', JSON.stringify(projects, null, 2));
    console.log('Saved to ./projects-data.json');
}

main();
