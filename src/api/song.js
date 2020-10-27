import { NETEASE_API_URL } from './config'
import moment from 'moment'
import { get } from 'common/js/common'

export default class Song {
  constructor({ id, singer, name, album, duration, image, url }) {
    this.id = id
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.ar[0].id,
    singer: filterSinger(musicData.ar),
    name: musicData.name,
    album: musicData.al.name,
    duration: moment(musicData.dt).format('mm:ss'),
    image: musicData.al.picUrl,
    url: `${NETEASE_API_URL}/song/url?id=${musicData.id}`,
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

export function getSongUrl(url) {
  return get(url)
}
