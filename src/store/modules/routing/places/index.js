import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  state() {
    return {
      places: [{id: '1',value:'dummy'}]
    };
  },
  mutations,
  actions,
  getters
};