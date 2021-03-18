import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  namespaced: true,
  //我是帥哥
  state() {
    return {
      requests: []
    };
  },
  mutations,
  getters,
  actions
};
