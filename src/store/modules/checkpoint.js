export default {
  actions: {
    setParentCheckpointId({ commit }, id) {
      commit("setParentCheckpointId", id);
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
    setParentCheckpointId(state, id) {
      state.parent_checkpoint_id = id;
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
    parent_checkpoint_id: null,
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
    parentCheckpointId(state) {
      return state.parent_checkpoint_id
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
