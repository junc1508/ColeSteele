const fs = require('fs');

//the first argument is the folder name
//default folder name 'Project' if no name passed
const folderName = process.argv[2] || 'Project';

// async
// fs.mkdir('apple', { recursive: true }, (err) => {
//     console.log("In the callback")
//     if (err) throw err;
// });
// console.log('I come after MKDIR')
try {
    fs.mkdirSync(folderName);
    // must pass in the '' as content to create empty folder, 
    // otherwise throws reference error
    fs.writeFileSync(`${folderName}/index.html`, '');
    fs.writeFileSync(`${folderName}/app.js`, '');
    fs.writeFileSync(`${folderName}/styles.css`, '');
} catch (e) {
    console.log("Error!!!");
    console.log(e);
}
