import { get } from 'common/js/common';
import { NETEASE_API_URL } from './config';

export function getSingerList() {
  const url = `${NETEASE_API_URL}/artist/list?type=1&area=7&limit=100`;

  return get(url);
}

export default class Singer {
  constructor({ id, name, avatar }) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
  }
}

export function getSingerDetail(singerId) {
  const url = `${NETEASE_API_URL}/artist/top/song?id=${singerId}`;
  return get(url);
}
