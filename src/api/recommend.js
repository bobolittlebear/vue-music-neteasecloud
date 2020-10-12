import { get } from 'common/js/common';
import { NETEASE_API_URL } from './config';

export function getRecommend() {
  const url = `${NETEASE_API_URL}/banner`;

  return get(url);
}

export function getDiscList() {
  const url = `${NETEASE_API_URL}/top/playlist?limit=10&order=hot`;

  return get(url);
}
