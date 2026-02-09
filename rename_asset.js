const fs = require('fs');
const path = require('path');

const src = path.join('assets', 'EventMimg', 'Jewelary', 'jewelaryV (2).mp4');
const dest = path.join('assets', 'EventMimg', 'Jewelary', 'jewellery_video.mp4');

try {
    if (fs.existsSync(src)) {
        fs.renameSync(src, dest);
        console.log('Successfully renamed:', src, 'to', dest);
    } else {
        console.log('Source file not found:', src);
        // List files in directory to see what's there
        const dir = path.join('assets', 'EventMimg', 'Jewelary');
        if (fs.existsSync(dir)) {
            console.log('Files in directory:', fs.readdirSync(dir));
        } else {
            console.log('Directory not found:', dir);
        }
    }
} catch (err) {
    console.error('Error renaming file:', err);
}
