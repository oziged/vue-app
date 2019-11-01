export default {
  actions: {
    addPlace({commit, rootGetters}, payload) {
      return new Promise(resolve => {
        let places = rootGetters.allPlaces;
        let id = places[places.length-1].id+1;
        payload = {id, ...payload}
        commit("addPlace", payload);
        resolve(payload);
      })

    },
  },
  mutations: {
    addPlace(state, payload) {
      state.places.push(payload);
    }
  },
  state: {
    places: [{
        id: 1,
        user_id: 1,
        title: "City1",
        description: "desc",
        position: {
          lat: 10,
          lng: 10
        }
      },
      {
        id: 2,
        user_id: 1,
        title: "City2",
        description: "desc",
        position: {
          lat: 12,
          lng: 10
        }
      },
      {
        id: 3,
        user_id: 1,
        title: "City1 Place",
        description: "desc",
        position: {
          lat: 10.1,
          lng: 10
        }
      },
      {
        id: 4,
        user_id: 1,
        title: "City1 Place2",
        description: "desc",
        position: {
          lat: 10.2,
          lng: 10
        }
      },
      {
        id: 5,
        user_id: 1,
        title: "City1 Place3",
        description: "desc",
        position: {
          lat: 10.3,
          lng: 10
        }
      },
      {
        id: 6,
        user_id: 1,
        title: "usa place city1",
        description: "usa place desc",
        position: {
          lat: 44.9,
          lng: 10
        }
      },
      {
        id: 7,
        user_id: 1,
        title: "usa place city2",
        description: "usa place desc",
        position: {
          lat: 46.9,
          lng: 10
        }
      },
      {
        id: 8,
        user_id: 1,
        title: "subplace1 title",
        description: "desc",
        position: {
          lat: 10.34,
          lng: 10
        }
      },
      {
        id: 9,
        user_id: 1,
        title: "subplace2 title",
        description: "desc",
        position: {
          lat: 10.36,
          lng: 10
        }
      }
    ]
  },
  getters: {
    allPlaces(state) {
      return state.places;
    },
    getPlace(state) {
      return id => {
        return state.places.find(place => {
          return place.id == id;
        });
      };
    }
  }
};