import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Question from '@/components/Question'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: []
    },
    {
      path: '/question/:id',
      name: 'Question',
      component: Question,
      children: []
    }
  ]
})
