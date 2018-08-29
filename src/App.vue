<template>
  <div id="app">
    <div v-show="showLoader" class="loader">
      <BallScaleRippleLoader class="element-loader" color="#fff" size="40px"/>
    </div>
    <transition name="slideLeft">
      <router-view/>
    </transition>

  </div>
</template>

<script>
import {BallScaleRippleLoader} from 'vue-loaders'
export default {
  name: 'App',
  data () {
    return {
      showLoader: false
    }
  },
  created(){
    let vue = this
    this.$http.interceptors.request.use(function (config) {
        vue.showLoader = true
        return config;
      }, function (error) {
        return Promise.reject(error);
      });
    this.$http.interceptors.response.use((response) => {
      vue.showLoader = false
      return response;
    }, (error) =>{
      this.$notify("Request Error","error")
      return Promise.reject(error);
    });
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.loader{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 9999999999;
  background-color: rgba(0,0,0,.7);
}
</style>
