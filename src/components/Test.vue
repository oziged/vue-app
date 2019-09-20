<template>
 <draggable :element="'ul'" :list="tasks" class="dragArea" :options="{group:{ name:'g1'}}" > 
			<li v-for="(el,index) in tasks" :key="index">
         <p>{{el.item.title}}</p>
         <test :tasks="el.nested"></test>
			  </li>
	</draggable>

  <!-- <li class="checkpoint_modal_edit">
    <span style="display: block; cursor: pointer; transition: .3s;" @click="selected=true" :style="{backgroundColor: selected ? 'rgba(38, 226, 44, 0.51)' : ''}" v-click-outside="console" >  {{ data.item.title }}</span>
    <ul v-if="data.nested.length > 0">
      <test v-for="(item, index) in data.nested" :key="index" :data="item" />
    </ul>
  </li> -->
</template>

<script>
import draggable from 'vuedraggable'
import nestedDraggable from 'vuedraggable'

export default {
  name: "Test",
  props: ["data", "tasks"],
  inject: ["moveDown"],
  data() {
    return {
      selected: false,
    }
  },
  components: {
    draggable, nestedDraggable
  },
  methods: {
    console() {
      this.selected = false;
    },
  },
  mounted() {
    window.test = () => {
      return this.moveDown;
    }
  },
};
</script>

<style lang="scss" scoped>
ul {
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.7s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

ul {
  padding-left: 15px!important;
}

.checkpoint_modal_edit {
}
</style>