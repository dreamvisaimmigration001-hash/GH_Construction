const fs = require("fs");
const path = require("path");

function replaceInFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, "utf-8");
  let original = content;
  for (const [search, replace] of replacements) {
    content = content.split(search).join(replace);
  }
  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`Updated ${filePath}`);
  }
}

const dir = path.join(__dirname, "src");
const files = [];

function walk(directory) {
  const items = fs.readdirSync(directory);
  for (const item of items) {
    const fullPath = path.join(directory, item);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.match(/\.(tsx?|json|ts)$/)) {
      files.push(fullPath);
    }
  }
}

walk(dir);

for (const file of files) {
  replaceInFile(file, [
    ["Scarborough Town Centre"],
    ["Scarborough"],
    ["scarborough"],
    ["Scarborough, Scarborough", "Scarborough"],
  ]);
}
