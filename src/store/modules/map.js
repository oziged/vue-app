export default {
  actions: {
    updateMapPlaces({ commit, rootGetters }, checkpoints) {
      if (!(checkpoints instanceof Array))
      checkpoints = [checkpoints]

      let places = [];
      if (checkpoints.length == 1) places = [rootGetters.getPlace(checkpoints[0].place_id)];
      else if (checkpoints.length > 1) {
        checkpoints.forEach(checkpoint => {
          let place = rootGetters.getPlace(checkpoint.place_id);
          places.push(place);          
        });
      }
      console.log(places);
      commit('updateMapPlaces', places)
    }
  },
  mutations: {
    updateMapPlaces(state, places) {
      state.map.places = places;
    }
  },
  state: {
    map: {
      places: []
    }
  },
  getters: {
    mapCurrentPlaces(state) {
      return state.map.places;
    }
  }
}