// export get id from url
const ytUrlRegex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/

export function getIdFromUrl(url) {
  const match = url.match(ytUrlRegex);

  if (!match || !match[1]) {
    return false;
  }

  return match[1];
};

export function swapObject(obj){
  const newObj = {};

  for (var k in obj) {
    newObj[obj[k]] = k;
  }

  return newObj;
}
