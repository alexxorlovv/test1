import Vue from "vue";

import {SET_SEARCHED_RESULT, SET_AUTHOR, SET_QUESTION, ADD_SEARCHED_RESULT, SET_ANSWERS} from './answers_mutation_types'



export default {
  state: {
    searchedAnswers: [],
    question: {result:true},
    author: [],
    answers: [],
    loaded: false
  },
  getters: {},
  mutations: {
    [ADD_SEARCHED_RESULT](state, payload) {
      Vue.set(state.searchedAnswers, state.searchedAnswers.length, payload)
    },
    [SET_SEARCHED_RESULT](state, payload) {
      state.searchedAnswers = payload
    },
    [SET_AUTHOR](state, payload) {
      state.author = payload
    },
    [SET_QUESTION](state, payload) {
      state.question = payload
    },
    [SET_ANSWERS](state, payload) {
      state.answers = payload
    }
  },
  actions: {
    getAnswers({commit, state, getters, dispatch, rootState}, payload){
      let params = {...rootState.baseParams}
      return this._vm.$http.get(`questions/${payload}/answers`, {params}).then((response) => {
        commit(SET_ANSWERS, response.data.items)
      })
    },
    getAuthor({commit, state, getters, dispatch, rootState}, payload){
      let dynamicParams = {
         pagesize: 5
      }
      let params = {...rootState.baseParams, ...dynamicParams}
      return this._vm.$http.get(`users/${payload}/questions`, {params}).then((response) => {
        commit(SET_AUTHOR, response.data.items)
      })
    },
    search({commit, state, getters, dispatch, rootState}, payload){
      let dynamicParams = {
        intitle: payload.search,
         filter: "default"
      }
      let params = {...rootState.baseParams, ...dynamicParams}
      return this._vm.$http.get("search", {params}).then((response) => {
        commit(SET_SEARCHED_RESULT, [])
        let time = 0
        for (let item of response.data.items) {
          let timer = window.setTimeout(()=> {
            commit(ADD_SEARCHED_RESULT, item)
            clearTimeout(timer)
          },time)
          time += 150
        }

      })
    },

  }
}
