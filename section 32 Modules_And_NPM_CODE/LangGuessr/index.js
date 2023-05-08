const franc = require('franc');
const langs = require('langs');
const input = process.argv[2];


const langCode = franc(input);
if (langCode === 'und') {
    console.log("sorry, couldn't figure it out! Try with more sample text");
    return;
}
const langauage = langs.where("3", langCode);

console.log(`Our best guess is: ${langauage.name}`);
