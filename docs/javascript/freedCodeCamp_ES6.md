# Object.freeze()

const는 immutable함을 나타내는 키워드가 아니다. 하지만 Object.freeze()을 사용하
면, 값의 변경을 막아주고, 아무리 외부에서 값에 대해 접근해도 무시한다.

## arrow function 사용 시, 실행문장이 한 줄이면, 브라켓과 return 키워드를 생략해도 된다.

# Default Parameters

```js
const greeting = (name = "Anonymous") => "Hello " + name;

console.log(greeting("John")); // Hello John
console.log(greeting()); // Hello Anonymous
```

# 스프레드 연산자

스프레드 연산자는 오직 함수의 인자값, 배열 리터럴에서만 사용이 가능하다. 

```js
const spreaded = ...arr; // will throw a syntax error
```

스프레드 연산자가 있기 전에는, apply를 이용했다. 

```js
var arr = [6, 89, 3, 45];
var maximus = Math.max.apply(null, arr); // returns 89
// We had to use Math.max.apply(null, arr) because Math.max(arr) returns NaN. Math.max() expects comma-separated arguments, but not an array.
```

# Destructuring

```js
const user = { name: 'John Doe', age: 34 };
const {name, age} = user; // 1. 프로퍼티 키 그대로 추출하는 방법.
const { name: userName, age: userAge } = user; // 2. 프로퍼티 키가 아닌 새로 지정한 변수이름으로 추출하는 방법.
// userName = 'John Doe', userAge = 34
```

# 자바스크립트 클래스는 첫 레터는 대문자로, 카멜케이스로 작성

# getter, setter

getter는 정보를 은닉화하여, 유저의 접근 없이, 데이터를 받아올 수 있고, setter는 유저의 접근없이, 데이터의 변경을 가능케 한다.

getter와 setter는 함수가 아니다!

> Note: It is convention to precede the name of a private variable with an underscore (_)

# 모듈?

https://poiemaweb.com/es6-module

Node.js에서는 표준은 아니지만 모듈이 지원된다. 따라서 Node.js 환경에서는 모듈 별로 독립적인 스코프, 즉 모듈 스코프를 갖는다.

script 태그에 type="module" 어트리뷰트를 추가하면 로드된 자바스크립트 파일은 모듈로서 동작한다. ES6 모듈의 파일 확장자는 모듈임을 명확히 하기 위해 mjs를 사용하도록 권장한다.

https://ko.javascript.info/modules-intro


다른 파일에서 함수 export하기

1. 첫번째 방법
   
``` js
export const add = (x, y) => {
  return x + y;
}
```

2. 두번째 방법

``` js
const add = (x, y) => {
  return x + y;
}

export { add };
```

3. 세번째 방법 (export multiple things)

``` js
export { add, subtract };
```

# 파일을 import 하기

``` js
import { add } from './math_functions.js';
// add를 제외하곤 모두 무시됩니다. 
// The ./ tells the import to look for the math_functions.js file in the same folder as the current file.
```

# object를 만들어 파일을 import 하기

``` js
import * as myMathModule from "./math_functions.js";

// myMathModule 이라는 object를 create 함! 

myMathModule.add(2,3);
myMathModule.subtract(5,3);
``` 

# export default

https://www.daleseo.com/js-module-import/

you cannot use export default with var, let, or const.

하나의 모듈에서 **하나의 객체**만 내보내기 때문에 이를 Default Export라고 일겉습니다. 

(잠만, 이거 리액트에서도 쓰잖아!!! 🤩)