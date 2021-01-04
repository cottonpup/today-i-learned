> Set과 Map에 대해 공부합니다. 모던 자바스크립트 딥 다이브 책을 바탕으로 했습니다. 
> 
> 이론 정리를 위해 간략화했을 뿐, 다듬어진 포스트가 아닙니다. 

# Set과 Map

## Set

Set 객체는 중복되지 않는 유일한 값들의 집합

- 중복된 값을 삭제
- 인덱스로 요소 접근이 불가능
- 요소 순서에 의미가 없음

## 요소 개수 확인

Set 객체의 요소 개수를 확인할 때는 Set.prototype.size 프로퍼티를 사용한다. 

```js
// 분해할당으로 Set.Prototype.size 프로퍼티 사용. 
const {size} = new Set([1, 2, 3, 3]);
console.log(size); // 3
```

size 프로퍼티는 setter 함수 없이, getter 함수만 존재하는 접근자 프로퍼티이다. 

```js
const set = new Set([1, 2]);

console.log(Object.getOwnPropertyDescriptor(Set.prototype, 'size'));
set.size = 10;
/*
{
  get: [Function: get size],
  set: undefined, // => set이 undefined임. 
  enumerable: false,
  configurable: true
}
*/

console.log(set.size); // 2
```

## 요소 추가

Set 객체에 요소를 추가할 때는 Set.prototype.add 메서드를 사용한다.

add 메서드는 새로운 요소가 추가된 Set 객체를 반환한다. 따라서 연속적으로 호출(method chaining)할 수 있다.

NaN과 NaN, +0과 -0은 서로 같다고 간주하여 중복 추가를 허용하지 않는다.

Set 객체는 객체나 배열과 같이 자바스크립트의 모든 값을 요소로 저장할 수 있다. 
```js
const set = new Set();

set.add({})
    .add({})

console.log(set); // Set(2) { {}, {} }
```

## 요소 존재 확인

Set.prototype.has 메서드 사용

## 요소 삭제

Set.prototype.delete 메서드 사용

add메서드와 다르게 연속호출 불가능.

## 요소 일괄 삭제

Set.prototype.clear 메서드 사용

## 요소 순회

```js
const set = new Set([1, 2, 3, 4]);

for(item of set){
    console.log(item);
}

console.log(...set);
```

# Map

## Map 객체의 생성

Map 객체는 키와 값의 쌍으로 이루어진 컬렉션이다. 

Map 생성자 함수는 이터러블을 인수로 전달받아 Map객체를 생성한다. 이 때 인수로 전달되는 이터러블은 `키와 값의 쌍으로 이루어진 요소`로 구성되어야 한다.

중복된 키는 Map 객체에 저장되지 않는다.

## 요소 개수 확인

Set과 마찬가지로 Map 객체의 요소 개수를 확인할 때는 Map.prototype.size 프로퍼티를 사용한다. 

## 요소 추가

Map 객체에 요소를 추가할 때는 Map.prototype.set 메서드를 사용한다.

set 메서드를 호출할 뒤, set 메서드를 연속적으로 호출할 수 있다. 

`Map 객체는 키 타입에 제한이 없다. 따라서 객체를 포함한 모든 값을 키로 사용할 수 있다.`

```js
const map = new Map();

const emily = {name: 'Emily', age: 24};
const renato = {name: 'Renato', age: 26};

map
   .set(emily, 'student')
   .set(renato, 'developer')

console.log(map);

// Map(2) {
//     { name: 'Emily', age: 24 } => 'student',
//     { name: 'Renato', age: 26 } => 'developer'
//   }
  
```

## 요소 취득 

Map 객체에서 특정 요소를 취득할려면 Map.prototype.get 메서드를 사용한다. get 메서드의 인수로 키를 전달하면 Map 객체에서 인수로 전달한 키를 갖는 값을 반환한다. Map 객체에서 인수로 전달한 키를 갖는 요소가 존재하지 않으면 undefined를 반환한다. 

```js
const map = new Map();

const emily = {name: 'Emily', age: 24};
const renato = {name: 'Renato', age: 26};

map
   .set(emily, 'student')
   .set(renato, 'developer')

console.log(`${emily.name}의 직업은 ${map.get(emily)}입니다.`);
// Emily의 직업은 student입니다.
```

## 요소 순회

- Map.prototype.keys
- Map.prototype.values
- Map.prototype.entries

