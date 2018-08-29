<template>
  <div tabindex="0" class="search__item">
    <div @click="clickQuestion" class="search__item-content">{{item.title}}</div>
    <div class="search__item-info row">
      <div class="search__item-author col">
        <span @click="clickAuthor">{{item.owner.display_name}}</span>
        <span @click="clickCounter" class="badge badge-secondary badge-pill search__item-count-answers">{{item.answer_count}}</span>
      </div>
    <div class="search__item-tags col">
      <div v-for="(tag, i) in item.tags" :key="i" @click="clickTag($event,tag)" class="search__item-tag badge badge-primary badge-pill">{{tag}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {SET_QUESTION} from "@/store/modules/answers_mutation_types";

export default {
  props:["item", "index"],
  name: 'SearchItem',
  data () {
    return {
    }
  },
  methods: {
    clickTag(e, payload){
      this.$emit("clickTagEvent",payload)
    },
    clickQuestion(){
      this.$store.commit(SET_QUESTION, this.item)
      this.$emit("clickQuestionEvent",this.item.question_id)
    },
    clickAuthor(){
      if(this.item.owner.user_id) {
        this.$emit("clickAuthorEvent",this.item.owner.user_id)
      } else {
        this.$notify("User - not found.","warning")
      }
    },
    clickCounter(){
      this.$emit("clickCounterEvent",this.item.question_id)
    }
  },
  created(){
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search__item{
  padding: 20px 5px;
  text-align: left;
  border-bottom: 1px solid gray;
}

.search__item-content,.search__item-author > span,.search__item-tag{
  cursor: pointer;
}
.search__item-content{
  color: #212121;
  font-size: 16px;
  margin: 5px 0;
}
.search__item-tag{
  margin-right:10px;
}
.search__item-count-answers{
  font-size: 12px;
  line-height:  12px;
  margin-left: 5px;
}
.search__item-author{
  font-size: 12px;
  line-height:  12px;
  max-width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
}
.search__item:focus{
  outline: none;
  background-color: #f3f3f3;
}
</style>
