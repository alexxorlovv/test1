<template>
  <div class="search__item">
    <div class="search__item-info row">
      <div class="search__item-author col">
        <span>{{item.owner.display_name}}</span>
        <span class="badge badge-secondary badge-pill search__item-count-answers">{{item.score}}</span>
      </div>
    </div>
    <div class="">
      Body Access Token Required
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {SET_QUESTION} from "@/store/modules/answers_mutation_types";

export default {
  props:["item", "index"],
  name: 'Answer',
  data () {
    return {
    }
  },
  methods: {

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
