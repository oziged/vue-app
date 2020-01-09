export default {
  data() {
    return {
      debounceTimeout: null
    }
  },
  methods: {
    debounce(func, delay) {
      return () => {
        clearTimeout(this.debounceTimeout)
        this.debounceTimeout = setTimeout(func, delay);
      }
    }
  }
}