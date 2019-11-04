export default {
  actions: {
    setCurrentPlan({ commit, getters }, id) {
      commit("setCurrentPlan", {plan: getters.getPlan(id), checkpoints: getData(id, "Plan")})

      function getData(id, type) {
        let res = [];
        function getNested(id) {
          let array = [];
          let subChecks = getters.getSubCheckpoints(id, "Checkpoint", true);
          if (subChecks) {
            subChecks.forEach(item => {
              let obj = {
                item: item,
                id: item.id,
                nested: getNested(item.id)
              };
              array.push(obj);
            });
            return array;
          } else return [];
        }
        getters.getSubCheckpoints(id, type).forEach(item => {
          let obj = {
            item: item,
            id: item.id,
            nested: getNested(item.id)
          };
          res.push(obj);
        });
        return res;
      }
    },

    async updateCheckpoint({ commit, getters, dispatch }, payload) {
      await dispatch('DBupdateCheckpoint', payload);
      let checkpoints = getters.currentPlanCheckpoints;
      let updatedCheckpoint = getDeepObject(checkpoints, getters.editCheckpointModalId)
      updatedCheckpoint.item = {...updatedCheckpoint.item, ...payload}
      commit("updateCheckpoint", checkpoints)
      

      function getDeepObject(data, searchId) {
        let returnedObj = null;
        search(data, searchId);
        function search(start, searchId) {
          start.some((item, index) => {
            if (item.id != searchId && item.nested.length > 0) {
              search(item.nested, searchId);
            } else {
              if (item.id == searchId) {
                returnedObj = item;
              }
              return false;
            }
          });
        }
        return returnedObj;
      }
    },

    async addCheckpoint({ commit, getters, dispatch }, payload) {
      let newCheckpoint = await dispatch('newCheckpoint', {checkable_type: "Checkpoint", checkable_id: getters.parentCheckpointId, ...payload});
      let checkpoints = getters.currentPlanCheckpoints;
      let parentCheckpoint = getDeepObject(checkpoints, getters.parentCheckpointId);
      newCheckpoint = {id: newCheckpoint.id, item: newCheckpoint, nested: []}
      parentCheckpoint.nested.push(newCheckpoint);
      commit("addCheckpoint", checkpoints)

      function getDeepObject(data, searchId) {
        let returnedObj = null;
        search(data, searchId);
        function search(start, searchId) {
          start.some((item, index) => {
            if (item.id != searchId && item.nested.length > 0) {
              search(item.nested, searchId);
            } else {
              if (item.id == searchId) {
                returnedObj = item;
              }
              return false;
            }
          });
        }
        return returnedObj;
      }
    }
  },
  mutations: {
    setCurrentPlan(state, payload) {
      state.plan = payload.plan;
      state.checkpoints = payload.checkpoints;
    },

    addCheckpoint(state, payload) {
      state.checkpoints = payload;
    },

    updateCheckpoint(state, payload) {
      state.checkpoints = payload
    }
  },
  state: {
    plan: {},
    checkpoints: {}
  },
  getters: {
    currentPlanCheckpoints(state) {
      return state.checkpoints
    }
  }
};
