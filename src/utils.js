// export get id from url
const id_regex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/

export function getIdFromUrl(url) {
  const match = url.match(id_regex)

  if (!match || !match[1]) {
    return false
  }

  return match[1]
}

// export reverse fonction
export function swapObject(obj){
  const new_obj = {}

  for(var k in obj) {
    new_obj[obj[k]] = k;
  }

  return new_obj
}
