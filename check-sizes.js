const fs = require('fs');
const path = require('path');
const d = __dirname;
fs.readdirSync(d)
  .filter(f => /\.(jpg|png|jpeg)$/i.test(f))
  .forEach(f => {
    const s = fs.statSync(path.join(d, f)).size;
    console.log(Math.round(s / 1024) + 'KB\t' + f);
  });
