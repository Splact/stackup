import fetch from 'isomorphic-fetch';
import Vibrant from 'node-vibrant';


export default function getRandomPictureUrl() {
  return fetch('http://source.unsplash.com/collection/462855/1600x900')
    .then(response => response.url)
    .then(url => {
      const img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');
      img.src = url;

      return new Promise(((resolve, reject) => {
        img.onload = () => {
          resolve(img);
        };
        img.onerror = reject;
      }));
    })
    .then(img => new Promise((resolve, reject) => {
      Vibrant.from(img).getPalette((err, palette) => {
        if (err) {
          return reject(err);
        }

        return resolve({ url: img.src, color: palette.Vibrant.getHex() });
      });
    }))
    .catch(e => {
      console.error('Failed to get random picture', e);
    });
}
