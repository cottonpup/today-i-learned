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

#