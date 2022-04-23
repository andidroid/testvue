import { createStore } from "vuex";

import authModule from "./modules/auth/index.js";
import placesModule from "./modules/routing/places/index.js";

const store = createStore({
  modules: {
    auth: authModule,
    places: placesModule,
  },
});

export default store;
