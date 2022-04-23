import axios from "axios";

export default {
  ADD_PLACE(state, place) {
    state.places.push(place);
  },
};
