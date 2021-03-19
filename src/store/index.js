import { createStore } from 'vuex';

import coachesModule from './modules/coaches/index';
import requestsModule from './modules/requests/index';
import AuthModule from './modules/Auth/index';

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
    auth: AuthModule
  },

});

export default store;
