<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script type="ecmascript-6">
// <keep-alive>标签包裹 router-view，可以缓存tab的页面元素和数据，在切换tab的时候，就不会再次去请求数据和重新渲染tab item
// 此处注册使用到的组件
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
export default {
  components: {
    MHeader,
    Tab
  }
}
</script>

<style></style>
