export default {
  actions: {
    addCheckpoint({ commit, dispatch, rootGetters }, payload) {
      return new Promise(async resolve => {
        let place = await dispatch('addPlace', {position: payload.position});
        let checkpoints = rootGetters.allCheckpoints;
        let id = checkpoints[checkpoints.length-1].id+1;
        payload = {id, ...payload}
        commit("addCheckpoint", payload);
      })
    },
    setMainCheckpointModalId({ commit }, id) {
      commit("setMainCheckpointModalId", id);
    },
    setEditCheckpointModalId({ commit }, id) {
      commit("setEditCheckpointModalId", id);
    },
    toggleMainCheckpointModal({ commit }) {
      commit("toggleMainCheckpointModal");
    },
    toggleNewCheckpointModal({ commit }) {
      commit("toggleNewCheckpointModal");
    },
    toggleEditCheckpointModal({ commit }) {
      commit("toggleEditCheckpointModal");
    },
    toggleEditPlanModal({ commit }) {
      commit("toggleEditPlanModal");
    },
    setEditPlanModalId({ commit }, id) {
      commit("setEditPlanModalId", id);
    },
    toggleMobileMapModal({ commit }) {
      commit("toggleMobileMapModal");
    },
    setMobileMapModalItemId({ commit }, id) {
      commit("setMobileMapModalItemId", id);
    },
    setMobileMapModalItemType({ commit }, type) {
      commit("setMobileMapModalItemType", type);
    },
  },
  mutations: {
    createCheckpoint(state, payload) {
      state.checkpoints.push(payload);
    },
    setMainCheckpointModalId(state, id) {
      state.main_checkpoint_modal_id = id;
    },
    toggleMainCheckpointModal(state) {
      state.main_checkpoint_modal_display = !state.main_checkpoint_modal_display;
    },
    toggleNewCheckpointModal(state) {
      state.new_checkpoint_modal_display = !state.new_checkpoint_modal_display;
    },
    toggleEditCheckpointModal(state) {
      state.edit_checkpoint_modal_display = !state.edit_checkpoint_modal_display;
    },
    setEditCheckpointModalId(state, id) {
      state.edit_checkpoint_modal_id = id;
    },
    toggleEditPlanModal(state) {
      state.edit_plan_modal_display = !state.edit_plan_modal_display;
    },
    setEditPlanModalId(state, id) {
      state.edit_plan_modal_id = id;
    },
    toggleMobileMapModal(state) {
      state.mobile_map_modal_display = !state.mobile_map_modal_display;
    },
    setMobileMapModalItemId(state, id) {
      state.mobile_map_modal_item_id = id;
    },
    setMobileMapModalItemType(state, type) {
      state.mobile_map_modal_item_type = type;
    }
  },
  state: {
    checkpoints: [
      {
        id: 1,
        place_id: 1,
        title: "City1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et placerat elit. Proin quis ultricies mauris, vitae ornare mauris. Mauris sapien ante, ullamcorper sit amet magna ut, dignissim dignissim leo. Nam interdum tincidunt mi quis faucibus. Praesent bibendum lacus in eros mollis, ac eleifend augue ultricies. Aliquam ullamcorper gravida metus vitae fringilla. Aliquam ac vehicula lectus. Maecenas leo sapien, accumsan in mi vel, mollis eleifend sapien. Nunc sed est vitae eros cursus rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce eu dictum nisl, sed pellentesque ante. Etiam sed ornare nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et placerat elit. Proin quis ultricies mauris, vitae ornare mauris. Mauris sapien ante, ullamcorper sit amet magna ut, dignissim dignissim leo. Nam interdum tincidunt mi quis faucibus. Praesent bibendum lacus in eros mollis, ac eleifend augue ultricies. Aliquam ullamcorper gravida metus vitae fringilla. Aliquam ac vehicula lectus. Maecenas leo sapien, accumsan in mi vel, mollis eleifend sapien. Nunc sed est vitae eros cursus rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce eu dictum nisl, sed pellentesque ante. Etiam sed ornare nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et placerat elit. Proin quis ultricies mauris, vitae ornare mauris. Mauris sapien ante, ullamcorper sit amet magna ut, dignissim dignissim leo. Nam interdum tincidunt mi quis faucibus. Praesent bibendum lacus in eros mollis, ac eleifend augue ultricies. Aliquam ullamcorper gravida metus vitae fringilla. Aliquam ac vehicula lectus. Maecenas leo sapien, accumsan in mi vel, mollis eleifend sapien. Nunc sed est vitae eros cursus rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce eu dictum nisl, sed pellentesque ante. Etiam sed ornare nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et placerat elit. Proin quis ultricies mauris, vitae ornare mauris. Mauris sapien ante, ullamcorper sit amet magna ut, dignissim dignissim leo. Nam interdum tincidunt mi quis faucibus. Praesent bibendum lacus in eros mollis, ac eleifend augue ultricies. Aliquam ullamcorper gravida metus vitae fringilla. Aliquam ac vehicula lectus. Maecenas leo sapien, accumsan in mi vel, mollis eleifend sapien. Nunc sed est vitae eros cursus rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce eu dictum nisl, sed pellentesque ante. Etiam sed ornare nisi.",
        checkable_type: "Plan",
        checkable_id: 1
      },
      {
        id: 2,
        place_id: 2,
        title: "City2",
        description: "Description2",
        checkable_type: "Plan",
        checkable_id: 1
      },
      {
        id: 3,
        place_id: 3,
        title: "City1 - place",
        description: "Description city1 - place",
        checkable_type: "Checkpoint",
        checkable_id: 1
      },
      {
        id: 4,
        place_id: 4,
        title: "City1 - place2",
        description: "Description city1 - place2",
        checkable_type: "Checkpoint",
        checkable_id: 1
      },
      {
        id: 5,
        place_id: 5,
        title: "City1 - place3",
        description: "Description city1 -place3",
        checkable_type: "Checkpoint",
        checkable_id: 1
      },
      {
        id: 6,
        place_id: 6,
        title: "USA City1",
        description: "Description city1",
        checkable_type: "Plan",
        checkable_id: 2
      },
      {
        id: 7,
        place_id: 7,
        title: "USA City2",
        description: "Description city2",
        checkable_type: "Plan",
        checkable_id: 2
      },
      {
        id: 8,    toggleEditPlanModal({ commit }) {
          commit("toggleEditPlanModal");
        },
        place_id: 8,
        title: "City 1 Place 3 subPlace 1",
        description: "City 1 Place 3 subPlace 1",
        checkable_type: "Checkpoint",
        checkable_id: 5
      },
      {
        id: 9,
        place_id: 9,
        title: "City 1 Place 3 subPlace 2",
        description: "City 1 Place 3 subPlace 2",
        checkable_type: "Checkpoint",
        checkable_id: 5
      }
    ],
    main_checkpoint_modal_id: null,
    main_checkpoint_modal_display: false,
    edit_checkpoint_modal_id: null,
    edit_checkpoint_modal_display: false,
    new_checkpoint_modal_display: false,
    edit_plan_modal_id: null,
    edit_plan_modal_display: false,
    mobile_map_modal_display: false,
    mobile_map_modal_item_id: null,
    mobile_map_modal_item_type: null
  },
  getters: {
    allCheckpoints(state) {
      return state.checkpoints;
    },
    getCheckpoint(state) {
      return id => {
        return state.checkpoints.find(checkpoint => {
          return checkpoint.id == id;
        });
      };
    },
    getSubCheckpoints(state, getters) {
      return (id, type, canBeNull) => {
        let sub = state.checkpoints.filter(checkpoint => {
          return (
            checkpoint.checkable_id == id && checkpoint.checkable_type == type
          );
        });
        if (sub.length) return sub;
        if (type == "Checkpoint" && canBeNull) return false;
        if (type == "Checkpoint") return [getters.getCheckpoint(id)];
      };
    },
    mainCheckpointModalId(state) {
      return state.main_checkpoint_modal_id;
    },
    mainCheckpointModalDisplay(state) {
      return state.main_checkpoint_modal_display;
    },
    editCheckpointModalDisplay(state) {
      return state.edit_checkpoint_modal_display;
    },
    editCheckpointModalId(state) {
      return state.edit_checkpoint_modal_id;
    },
    newCheckpointModalDisplay(state) {
      return state.new_checkpoint_modal_display;
    },
    editPlanModalDisplay(state) {
      return state.edit_plan_modal_display;
    },
    editPlanModalId(state) {
      return state.edit_plan_modal_id;
    },
    mobileMapModalDisplay(state) {
      return state.mobile_map_modal_display;
    },
    mobileMapModalItemId(state) {
      return state.mobile_map_modal_item_id;
    },
    mobileMapModalItemType(state) {
      return state.mobile_map_modal_item_type
    }
  }
};
