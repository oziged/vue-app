export default {
  actions: {
    // update current plan (set subcheckpoints of plan in vuex)
    setCurrentPlan({ commit, getters }, id) {
      // let checkpoints = getData(id, "Plan", getters);
      // console.log('che')
      // console.log(checkpoints);
      commit("setCurrentPlan", {plan: getters.getPlan(id), checkpoints: getData(id, "Plan", getters)})
    },

    async updateCheckpoint({ commit, getters, dispatch }, payload) {
      await dispatch('DBupdateCheckpoint', payload); // update checkpoint in DB
      let checkpoints = getters.currentPlanCheckpoints;
      let updatedCheckpoint = getDeepObject(checkpoints, getters.editCheckpointModalId)
      updatedCheckpoint.item = {...updatedCheckpoint.item, ...payload}
      commit("updateCheckpoint", checkpoints)
    },

    async newCheckpoint({ commit, getters, dispatch }, payload) {
      let newCheckpoint = await dispatch('DBnewCheckpoint', {checkable_type: "Checkpoint", checkable_id: getters.parentCheckpointId, ...payload});
      let checkpoints = getters.currentPlanCheckpoints;
      let parentCheckpoint = getDeepObject(checkpoints, getters.parentCheckpointId);
      newCheckpoint = {id: newCheckpoint.id, item: newCheckpoint, nested: [], parentType: "Checkpoint", parentId: getters.parentCheckpointId}
      parentCheckpoint.nested.push(newCheckpoint);
      commit("newCheckpoint", checkpoints)
    },

    async removeCheckpoint({ commit, getters, dispatch }, id) {
      // when checkpoint is deleting, we alse have to delete his subcheckpoints
      await dispatch("DBremoveCheckpoint", id);
      let checkpoints = getters.currentPlanCheckpoints;
      let checkpoint = getDeepObject(checkpoints, id);
      let parentId = checkpoint.parentId;
      let parentType = checkpoint.parentType;

      if (parentType == "Checkpoint") {
        let parentCheckpoint = getDeepObject(checkpoints, parentId);
        let nestedIndexToRemove = parentCheckpoint.nested.findIndex(item => item.id == checkpoint.id);
        parentCheckpoint.nested.splice(nestedIndexToRemove, 1);
      } else if (parentType == "Plan") {
        let indexToRemove = checkpoints.findIndex(item => item.id == checkpoint.id);
        checkpoints.splice(indexToRemove, 1);
      }
      commit('removeCheckpoint', checkpoints)
    }
  },
  mutations: {
    setCurrentPlan(state, payload) {
      state.plan = payload.plan;
      state.checkpoints = payload.checkpoints;
      window.checkpoints = state.checkpoints;
    },

    newCheckpoint(state, payload) {
      state.checkpoints = payload;
    },

    updateCheckpoint(state, payload) {
      state.checkpoints = payload
    },

    removeCheckpoint(state, checkpoints) {
      state.checkpoints = checkpoints
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

// get subcheckpoints for plan/checkpoint (items with nested array)
function getData(id, type, getters) { 
  let res = [];
  function getNested(id) {
    let array = [];
    let subChecks = getters.getSubCheckpoints(id, "Checkpoint", true);
    if (subChecks) {
      subChecks.forEach(item => {
        let obj = {
          item: item,
          id: item.id,
          parentId: id,
          parentType: "Checkpoint",
          nested: getNested(item.id)
        };
        array.push(obj);
      });
      return array;
    } else return [];
  }
  let subChecks = getters.getSubCheckpoints(id, type);
  if (!subChecks) return [];
  subChecks.forEach(item => {
    let obj = {
      item: item,
      id: item.id,
      parentId: +id,
      parentType: type,
      nested: getNested(item.id)
    };
    res.push(obj);
  });
  return res;
}