const xData = () => {
  return {
    show: false,
    init() {
      console.log("x");
    },
    open() {
      this.show = !this.show;
    },
  };
};

export default xData;
