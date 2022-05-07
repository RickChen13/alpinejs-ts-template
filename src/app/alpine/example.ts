import ExampleController from "@/api/controller/ExampleController";

const xData = () => {
  return {
    show: false,
    exApi: new ExampleController(),
    init() {
      this.getArrayList();
    },

    async getArrayList() {
      let res = await this.exApi.getArrayList({
        data: { page: 1 },
        chain: true,
      });
      console.log(res);

      this.exApi.getArrayList({
        data: { page: 1 },
        success: (res: any) => {
          console.log(res);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    },

    open() {
      this.show = !this.show;
    },
  };
};

export default xData;
