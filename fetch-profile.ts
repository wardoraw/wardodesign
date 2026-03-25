import fs from 'fs';

async function getProfileProjects() {
    try {
        const res = await fetch('https://www.behance.net/imwardo');
        const html = await res.text();
        
        // Find gallery links
        const matches = [...html.matchAll(/"url":"(https:\/\/www\.behance\.net\/gallery\/\d+\/[^"]+)"/g)];
        const matches2 = [...html.matchAll(/href="(https:\/\/www\.behance\.net\/gallery\/\d+\/[^"]+)"/g)];
        const matches3 = [...html.matchAll(/https:\\u002F\\u002Fwww\.behance\.net\\u002Fgallery\\u002F\d+\\u002F[^"'\s\?]+/g)];
        
        let uniqueUrls = [...new Set([
            ...matches.map(m => m[1]), 
            ...matches2.map(m => m[1]),
            ...matches3.map(m => m[0].replace(/\\u002F/g, '/'))
        ])];
        
        console.log(`Found ${uniqueUrls.length} projects:`);
        console.log(uniqueUrls.slice(0, 15));
    } catch (e) {
        console.error(e);
    }
}

getProfileProjects();
