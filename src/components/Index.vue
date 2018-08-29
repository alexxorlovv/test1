<template>
<div style="min-height:110vh;" class="container">
  <h2>Stackoverflow</h2>
<div class="row  justify-content-center">
    <div class="search-form col-12">
      <input v-model="search" @keyup="searching" placeholder="Search..." class="form-control" type="text">
    </div>
  <div class="col search">
    <div v-if="answers.length === 0" class="info alert-info">No results.</div>
    <transition-group name="list" tag="div">
      <SearchItem v-for="(item,i) in answers"
                  class="list-item"
                  :index="i"
                  @keydown.native="keyControl($event,item)"
                  @clickTagEvent="searchTag"
                  :item="item"
                  :key="i"
                  @clickCounterEvent="clickCounterHandler"
                  @clickAuthorEvent="clickAuthorHandler"
                  @clickQuestionEvent="clickQuestionHandler"/>

  </transition-group>
    </div>
<transition name="custom">
  <div v-show="showInfo" class="col info">
    <div class="fix-container">
    <!-- <h3>Author's questions.</h3> -->
  <div v-show="author.length === 0" class="info alert-info">No results.</div>
    <div class="result-items">
      <SearchItem v-for="(item,i) in author"
            :index="i"
            @keydown.native="keyControl"
            @clickTagEvent="searchTag"
            :item="item"
            :key="i"
            @clickCounterEvent="clickCounterHandler"
            @clickQuestionEvent="clickQuestionHandler"/>
    </div>
    <div @click="closeAuthorWindow" style="margin-top:20px;" class="btn btn-primary">Close</div>
    </div>
  </div>
</transition>

</div></div>
</template>

<script>
import SearchItem from "./SearchItem"
import { mapState } from 'vuex'
import {SET_QUESTION} from "@/store/modules/answers_mutation_types";
export default {
  name: 'Index',
  data () {
    return {
      search: "",
      showInfo: false,
      timer: null
    }
  },
  computed: mapState({
    answers: state => state.answers.searchedAnswers,
    author: state => state.answers.author,
  }),

  methods: {
    closeAuthorWindow(){
      this.showInfo = false
    },
    clickCounterHandler(payload){

    },
    clickAuthorHandler(payload){
        this.$store.dispatch("getAuthor",payload).then(()=>{
          this.showInfo = true
        })
    },
    clickQuestionHandler(payload){

      this.$router.replace({ name: 'Question', params: { id: payload }})
    },
    searchTag(payload) {
      this.search = payload
      if(this.showInfo) {
        this.closeAuthorWindow()
      }
      this.searching(null, true)
    },
    keyControl(e, payload){
      e.preventDefault();
      if(e.key === "ArrowDown") {
        if (e.srcElement.nextSibling) {
          e.srcElement.nextSibling.focus()

        } else {
          document.querySelector(".search__item:first-child").focus()
        }
      } else if(e.key === "ArrowUp"){
        if(e.srcElement.previousSibling) {
          e.srcElement.previousSibling.focus()
        } else {
          document.querySelector(".search__item:last-child").focus()
        }
      } else if(e.key === "Enter") {
        this.$store.commit(SET_QUESTION, payload)
        this.$router.replace({ name: 'Question', params: { id: payload.question_id }})
      }

    },

    afterSearch(){
      let time = window.setTimeout(()=> {
        let item = document.querySelector(".search__item:nth-child(1)")
        if(item) {
          item.focus()
        }
        window.clearTimeout(time)
      },150)

      if(this.timer) {
        window.clearTimeout(this.timer)
      }
    },
    searching(e,type = false){

      const searchData = this.search.trim();
      if(searchData.length > 1) {

        if(!type) {
          if(this.timer) {
            window.clearTimeout(this.timer)
          }
          this.timer = window.setTimeout(()=> {
            this.$store.dispatch("search",{search:searchData}).then(this.afterSearch)
          }, 600)
        } else {
          this.$store.dispatch("search",{search:searchData}).then(this.afterSearch)
        }


      }
    },

  },
  created(){

  },
  components: {SearchItem}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.custom-transition {
    transition: .25s height ease-in-out, .25s padding-top ease-in-out, .25s padding-bottom ease-in-out
}

.custom-enter-active {
  transition: opacity .25s ease-in, max-width .25s ease-in;
}
.custom-leave-active{
  transition: opacity .25s ease-out, max-width .25s ease-out;
}
.custom-enter, .custom-leave-to{
  opacity: 0;
  max-width: 0;
}
.search-form{
  padding-bottom: 20px;
  padding-top: 10px;
}
.info{
  overflow: hidden;
}
.fix-container{
min-width: 550px;
}

.list-enter-active {
  transition: opacity .45s ease;
}
.list-enter {
  opacity: 0;
}
html{
  min-height: 110vh;
}
</style>
