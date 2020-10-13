export function get(url) {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest()
    request.open('GET', url)
    request.onreadystatechange = function () {
      if (request.readyState === 4 && request.status === 200) {
        resolve(JSON.parse(request.responseText))
      }
    }
    request.send()
  })
}
