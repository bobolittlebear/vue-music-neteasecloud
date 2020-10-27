<template>
  <transition name="slide">
    <div class="singer-detail">
      <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex';
import { getSingerDetail } from 'api/singer';
import { CODE_OK } from 'api/config';
import Song from 'api/song';
import { createSong } from 'api/song';
import MusicList from 'components/music-list/music-list';
export default {
  data() {
    return {
      songs: [],
    };
  },
  computed: {
    title() {
      return this.singer.name;
    },
    bgImage() {
      return this.singer.avatar;
    },
    ...mapGetters(['singer']),
  },
  created() {
    this._getDetail();
    // console.log(this.singer);
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer');
        return;
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === CODE_OK) {
          this.songs = this._normalizeSongs(res.songs);
        //   console.log(this.songs);
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach((musicData) => {
        if (musicData.id && musicData.al.id) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    },
  },
  components: {
    MusicList,
  },
};
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/variable';

.singer-detail {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: $color-background;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.5s;
}

.slide-enter, .slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
