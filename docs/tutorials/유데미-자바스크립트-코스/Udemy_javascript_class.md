[2020.Dec.16]

# 91

https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop

https://developer.mozilla.org/en-US/docs/Glossary/Call_stack

https://blog.sessionstack.com/

https://velog.io/@thms200/Event-Loop-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A3%A8%ED%94%84

[how-does-javascript-actually-work-part-1](https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf)
[Check]

# 92 Scope and the scope chain

스코프는 "변수는 어딨지?", "특정 변수를 어디에서 접근해야하지?"와 같은 질문이다.

Lexical Scoping: Scoping is controlled by placement of functions and blocks in the code.

Scope: Space or environment in which a certain variable is declared. (for functions as well)

Global scope: outside of any function or block.

Function scope: variables are accessible only inside function, not outside. (also called local
scope)

Block scope(ES6): Variables are accessible only inside block, HOWEVER, this only applies to let and
const variables.

Functions are also block scoped. (only in strict mode).

스코프는 부모 스코프에 있는 변수에 접근할 수 있다. current scope에 찾는 변수가 없다면, 부모 스코프로
가서 변수를 찾는다. 하지만, 그 반대로는 일어나진 않는다.

## scope chain vs call stack

call stack은 함수가 호출된 순서이다.

scope chain은 함수의 호출 순서와는 관련이 없다.

# 93

```js
function printAge() {
    if (true) {
        var millenial = true;
        const str = 'you are millenial';
        // variables are only accessible inside the block.
    }
    // console.log(str); // error
    // console.log(millenial); // true
}
printAge();
// 블락 스코프 안에 함수를 만들어도 블락 스코프 안에서만 호출할 수 있다. (strict mode에서만!)
```

자바스크립트는 가장 가까운 스코프 먼저 변수를 찾기 시작한다. 현재 스코프에 변수가 존재한다면, 스코프
체인은 필요하지 않는다.

다른 스코프에 있는 경우, 변수의 이름을 번복해도 상관이 없다!

# 94

Hoisting: Makes some types of variables accessible/ usable in the code before they are actually
declared.

<img width="1225" alt="Screen Shot 2020-12-17 at 12 09 37 AM" src="https://user-images.githubusercontent.com/67526014/102376213-bd9b8700-4006-11eb-9ba8-1232b735ad03.png">

## Temporal Dead Zone, Let and const

TDZ: the region of the scope in which the variable is defined, but can't be used in any way.

Why TDZ? Makes it easier to avoid and catch errors: accessing variables before declaration is bad
practice and should be avoided.

# 95

```js
console.log(me); // hoisting이 일어나지만, undefined
console.log(job); //
console.log(year); // job과 마찬가지로 TDZ에 머물고 있음.

var me = 'Jonas';
let job = 'teacher';
const year = 1991;
```

```js
// Functions
console.log(addDecl(2, 3)); // 5
// console.log(addExpr(2, 3)); // addExpr가 TDZ에 있기 때문
console.log(addArrow); // var로 변경했을 땐, undefined
// console.log(addArrow(2, 3));

function addDecl(a, b) {
    return a + b;
}

const addExpr = function (a, b) {
    return a + b;
};

var addArrow = (a, b) => a + b;
```

```js
// Example
console.log(undefined);

if (!numProducts) deleteShoppingCart(); // All products deleted!
// numProducts 가 undefined 이기 때문에, 즉, false가 반환된다. 고로 deleteShoppingCart 함수가 실행된다.

var numProducts = 10;

function deleteShoppingCart() {
    console.log('All products deleted!');
}

var x = 1;
let y = 2;
const z = 3;

// window is global object!
// var로 변수를 선언하면, window 즉, 전역객체에 x 프로퍼티가 생성된다.

console.log(x === window.x); // true
console.log(y === window.y); // false
console.log(z === window.z); // false
```

# 96

this keyword/variables: Special variables that is created for every context(every function). this
keyword is not **static.**

<img width="1200" alt="Screen Shot 2020-12-17 at 1 09 14 AM" src="https://user-images.githubusercontent.com/67526014/102376293-d5730b00-4006-11eb-8e3f-93a7eab292df.png">
