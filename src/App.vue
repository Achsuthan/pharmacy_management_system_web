<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
      :loader="dots"
      :color="color"
    ></loading>
  </div>
</template>

<script>
import Vue from 'vue'
import VueRouter from 'vue-router'
import Header from './components/Header/Header'
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

Vue.use(VueRouter)

export default {
  name: 'app',
  data(){
    return {
      fullPage: true,
      dots: "dots",
      color: "#012847",
    };
  },
  components:{
    Header,
    Loading
  },
  computed:{
    isLoading(){
      return this.$store.getters.getLoading
    }
  },
  beforeMount(){
    this.$store.dispatch(
      "setUser",
      JSON.parse(localStorage.getItem("user"))
    );
  }
}
</script>

<style lang="scss">
// CoreUI Icons Set
@import "~@coreui/icons/css/coreui-icons.min.css";
/* Import Font Awesome Icons Set */
$fa-font-path: "~font-awesome/fonts/";
@import "~font-awesome/scss/font-awesome.scss";
/* Import Simple Line Icons Set */
$simple-line-font-path: "~simple-line-icons/fonts/";
@import "~simple-line-icons/scss/simple-line-icons.scss";
/* Import Flag Icons Set */
@import "~flag-icon-css/css/flag-icon.min.css";
/* Import Bootstrap Vue Styles */
@import "~bootstrap-vue/dist/bootstrap-vue.css";
// Import Main styles for this application
@import "assets/scss/style";
</style>

