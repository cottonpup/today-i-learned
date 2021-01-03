// 참조 방식, 복사 방식

const a = {
  name: 'emily',
  age: 12
};

b = 4;


function hello(first, second){

  second = 10;

  first.age = 26;

console.log(`${first.name}은 나이를 먹어서 ${first.age}살이 되고 이제 ${second}해가 지났습니다..`);
}

hello(a, b);
console.log(`${a.name}은 나이를 먹어서 ${a.age}살이 되고 이제 ${b}해가 지났습니다..`);