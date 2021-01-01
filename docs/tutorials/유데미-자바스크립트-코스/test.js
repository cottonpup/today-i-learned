let me = {
  name: '람쥐',
  thisInArrow: () => {
    console.log('내 이름은 ' + this.name); // this 바인딩이 일어나지 않는다.
  },
  thisInRegular() {
    console.log('내 이름은 ' + this.name); // this 바인딩이 일어난다.
  }
};
me.thisInArrow();
me.thisInRegular();