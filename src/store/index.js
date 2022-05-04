import { createStore } from 'vuex'

export default createStore({
  state: {
    tip_amount: 0,
    total_amount: 0
  },
  getters: {
  },
  mutations: {
    calculateTip(state, {billValue, tipValue, peopleValue}) {
      let term = tipValue === 100 ? 1 : tipValue / 100;

      state.tip_amount = (billValue * term) / peopleValue
      state.total_amount = (billValue + (state.tip_amount * peopleValue)) / peopleValue;
    }
  },
  actions: {
  },
  modules: {
  }
})
