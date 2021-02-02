const fs = require('fs');

const folderName = (process.argv[2] || 'Project')

try {
  fs.mkdirSync(folderName)
  fs.writeFileSync(`${folderName}/app.js`, "")
  fs.writeFileSync(`${folderName}/index.html`, "")
  fs.writeFileSync(`${folderName}/style.css`, "")
} catch (e) {
  console.log("Error occurred :(")
  console.log(e)
}