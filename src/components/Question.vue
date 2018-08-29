<template>
<div tabindex="0" @keyup="keyHandler" class="container-fluid focus-container">
<div class="container">
  <h2 style="padding-top:20px;">{{question.title}}</h2>
<div class="question-body"><b>Access Token Required</b></div>
<div class="row  justify-content-center">
  <div class="answers col-12">
    <Answer
    v-for="(item,index) in answers"
    :key="index"
    :index="index"
    :item="item"
    />

  </div>
</div></div>
</div>

</template>

<script>
import Answer from "./Answer"
import { mapState } from 'vuex'
import {SET_AUTHOR} from "@/store/modules/answers_mutation_types"
export default {
  name: 'Question',
  data () {
    return {
      search: "",
      //showInfo: false
    }
  },
  computed: mapState({
    answers: state => state.answers.answers,
    question: state => state.answers.question,
  }),

  methods: {
    keyHandler(e){
      if(e.key === "Escape") {
        this.$router.replace("/");
      }
    }
  },

  getAnswers(){

  },
  created(){
    if(this.$route.params.id) {
      this.$store.dispatch("getAnswers",this.$route.params.id)
    }
  },
  mounted(){
     if(this.question.result) {
       this.$router.replace("/");
    }
    document.querySelector(".focus-container").focus()
  },
  components: {Answer}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.focus-container:focus{
outline: none;
}
.focus-container{
  min-height: 100vh;
}
</style>
