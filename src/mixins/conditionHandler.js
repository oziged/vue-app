export default {
  methods: {
    conditionHandler(conditionName, conditionFunc) {
      return new Promise(resolve => {
        console.log(`Waiting : "${conditionName}"`);
        let interval = setInterval(() => {
          let returnVal = conditionFunc();
          if (returnVal) {
            clearInterval(interval);
            console.log(`${conditionName} : done`);
            resolve(returnVal);
          }
        }, 100);
      });
    },
  },
}