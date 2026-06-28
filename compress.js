const sharp = require('sharp');
sharp('mpbb97br-BSIT-Cordero-Linard-T_filipiniana_edited.jpg')
  .resize(900, null, { withoutEnlargement: true })
  .webp({ quality: 82 })
  .toFile('photo-hero.webp', function(err, info) {
    if (err) { console.error(err); process.exit(1); }
    console.log('done ' + Math.round(info.size / 1024) + 'KB');
  });
