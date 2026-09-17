const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;
    for (const [search, replace] of replacements) {
        content = content.split(search).join(replace);
    }
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Updated ${filePath}`);
    }
}

function removeVineArts(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf-8');
    if (filePath.endsWith('.json')) {
        let data = JSON.parse(content);
        data = data.filter(p => p.id !== 'vine-arts');
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`Removed vine-arts from ${filePath}`);
    }
}

const dir = path.join(__dirname, 'src');
const files = [];

function walk(directory) {
    const items = fs.readdirSync(directory);
    for (const item of items) {
        const fullPath = path.join(directory, item);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.match(/\.(tsx?|json)$/)) {
            files.push(fullPath);
        }
    }
}

walk(dir);

for (const file of files) {
    if (file.endsWith('rawProjects.json') || file.endsWith('enrichedProjects.json')) {
        removeVineArts(file);
    }

    replaceInFile(file, [
        [', AB', ''],
        [' AB', ''],
        ['Alberta', 'Scarborough'],
        ['Vine Arts', 'Ivory Denture Clinic'], // Replace name in ghData.ts and others
        ['vine-arts', 'ivory-denture-clinic']
    ]);
}
