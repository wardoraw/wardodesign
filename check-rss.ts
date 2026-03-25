import fs from 'fs';

async function checkRss() {
    try {
        const res = await fetch('https://www.behance.net/feeds/user?username=imwardo');
        console.log(res.status);
        const text = await res.text();
        console.log(text.slice(0, 500));
    } catch (e) {
        console.error(e);
    }
}

checkRss();
