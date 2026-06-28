try { require('sharp'); console.log('sharp'); } catch(e) {
  try { require('jimp'); console.log('jimp'); } catch(e2) {
    console.log('none');
  }
}
