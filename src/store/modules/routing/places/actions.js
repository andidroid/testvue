export default {
    createPlace (context, place) {
        //place.id = Math.random()
        context.commit('ADD_PLACE', { place })
      }
}