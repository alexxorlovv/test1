import mutations from "./mutations"
import actions from "./actions"
import modules from "./modules/"
import axios from "axios"
import axiosData from "@/axiosData"


export default {

  state: {
    baseParams: {
      site:"stackoverflow",
      order: "desc",
      sort: "activity",
      key: "U4DMV*8nvpm3EOpvf69Rxw(("
    }
  },
  mutations,
  actions,
  modules
}
