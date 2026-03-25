import fs from 'fs';

async function checkUrl(url: string) {
    try {
        const res = await fetch(url, { method: 'HEAD' });
        console.log(url, res.status);
    } catch (e) {
        console.log(url, 'Error');
    }
}

async function main() {
    const urls = [
        'https://mir-s3-cdn-cf.behance.net/projects/404/111fcf223997693.Y3JvcCwxMDIyLDgwMCwxODcsMA.jpg',
        'https://mir-s3-cdn-cf.behance.net/projects/808/111fcf223997693.Y3JvcCwxMDIyLDgwMCwxODcsMA.jpg',
        'https://mir-s3-cdn-cf.behance.net/projects/max_808/111fcf223997693.Y3JvcCwxMDIyLDgwMCwxODcsMA.jpg',
        'https://mir-s3-cdn-cf.behance.net/projects/original/111fcf223997693.Y3JvcCwxMDIyLDgwMCwxODcsMA.jpg',
        'https://mir-s3-cdn-cf.behance.net/projects/fs/111fcf223997693.Y3JvcCwxMDIyLDgwMCwxODcsMA.jpg'
    ];
    for (const u of urls) await checkUrl(u);
}
main();
