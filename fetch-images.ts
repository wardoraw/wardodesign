import fs from 'fs';

async function fetchProjectImages(url: string) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    
    // Find cover image
    const coverMatch = html.match(/https:\/\/mir-s3-cdn-cf\.behance\.net\/projects\/404\/[^"']+/);
    const cover = coverMatch ? coverMatch[0] : null;
    
    // Find gallery images - prefer 1400 or fs (full size)
    const galleryMatches = [...html.matchAll(/https:\/\/mir-s3-cdn-cf\.behance\.net\/project_modules\/(1400|fs|1400_webp|fs_webp)\/[^"'\s,]+/g)];
    
    const uniqueImages = new Map();
    for (const match of galleryMatches) {
        const fullUrl = match[0];
        const filename = fullUrl.split('/').pop();
        
        if (!uniqueImages.has(filename)) {
            uniqueImages.set(filename, fullUrl);
        } else {
            // If we already have it, prefer non-webp or 'fs' over '1400'
            const existing = uniqueImages.get(filename);
            if (fullUrl.includes('/fs/') && !existing.includes('/fs/')) {
                uniqueImages.set(filename, fullUrl);
            } else if (fullUrl.includes('/1400/') && existing.includes('_webp')) {
                uniqueImages.set(filename, fullUrl);
            }
        }
    }
    
    const gallery = Array.from(uniqueImages.values());
    
    console.log(`\n--- ${url} ---`);
    console.log('Cover:', cover);
    console.log('Gallery:');
    console.log(JSON.stringify(gallery, null, 2));
  } catch (e) {
    console.error('Error fetching', url, e);
  }
}

async function main() {
  await fetchProjectImages('https://www.behance.net/gallery/223997693/Americans-Broaster-Branding');
  await fetchProjectImages('https://www.behance.net/gallery/206925051/MC-Electric-Contractors-Branding');
  await fetchProjectImages('https://www.behance.net/gallery/195211213/Morning-Glory-eSports-Team-Branding');
  await fetchProjectImages('https://www.behance.net/gallery/188413609/Media-Maraton-de-Bogota-Rebranding');
}

main();
