<template>
  <div class="singer">
    <list-view @select="selectSinger" :data="singers"></list-view>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import Singer, { getSingerList } from 'api/singer';
import { CODE_OK } from 'api/config';
import ListView from 'base/listview/listview';
import { mapMutations } from 'vuex';

const HOT_NAME = '热门';
const HOT_SINGER_LEN = 20;

export default {
  data() {
    return {
      singers: [],
    };
  },
  created() {
    this._getSingerList();
  },
  components: {
    ListView,
  },
  methods: {
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`,
      });
      this.setSinger(singer);
    },
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === CODE_OK) {
          this.singers = res.artists;
          console.log(res);
          this._getSingerFirstLetter();
          this.singers = this._normalizeSinger(this.singers);
        }
      });
    },
    _getSingerFirstLetter() {
      this.singers.forEach((singer) => {
        singer.Findex = window.pinyinUtil.getFirstLetter(singer.name)[0].toUpperCase();
      });
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: [],
        },
      };
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(
            new Singer({
              id: item.id,
              name: item.name,
              avatar: item.img1v1Url,
            })
          );
        }
        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: [],
          };
        }
        map[key].items.push(
          new Singer({
            id: item.id,
            name: item.name,
            avatar: item.img1v1Url,
          })
        );
      });
      let hot = [];
      let ret = [];
      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(ret);
    },
    ...mapMutations({
      setSinger: 'SET_SINGER',
    }),
  },
};
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
