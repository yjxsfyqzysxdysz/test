import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoList: [
    {
      text: 'leson testScript',
      complete: false
    },
    {
      text: 'leson testScript II',
      complete: false
    }
  ]
  },
  mutations: {
    updateList(state, { index, content }) {
      state.todoList[index].text = content
    },
    todoItemComplete(state, index) {
      state.todoList[index].complete = true
    }
  },
  actions: {
  },
  modules: {
  }
});
