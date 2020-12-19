[2020.Dec.16]

# 91. Execution Contexts and The Call Stack

https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop

https://developer.mozilla.org/en-US/docs/Glossary/Call_stack

https://blog.sessionstack.com/

https://velog.io/@thms200/Event-Loop-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A3%A8%ED%94%84

[how-does-javascript-actually-work-part-1](https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf)
[Check]

# 92 Scope and the scope chain

스코프는 "변수는 어딨지?", "특정 변수를 어디에서 접근해야하지?"와 같은 질문이다.

Lexical Scoping: Scoping is controlled by placement of functions and blocks in
the code.

Scope: Space or environment in which a certain variable is declared. (for
functions as well)

Global scope: outside of any function or block.

Function scope: variables are accessible only inside function, not outside.
(also called local scope)

Block scope(ES6): Variables are accessible only inside block, HOWEVER, this only
applies to let and const variables.

Functions are also block scoped. (only in strict mode).

스코프는 부모 스코프에 있는 변수에 접근할 수 있다. current scope에 찾는 변수가없
다면, 부모 스코프로가서 변수를 찾는다. 하지만, 그 반대로는 일어나진 않는다.

## scope chain vs call stack

call stack은 함수가 호출된 순서이다.

scope chain은 함수의 호출 순서와는 관련이 없다.

# 93. Scoping in Practice

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

자바스크립트는 가장 가까운 스코프 먼저 변수를 찾기 시작한다. 현재 스코프에 변수
가 존재한다면, 스코프체인은 필요하지 않는다.

다른 스코프에 있는 경우, 변수의 이름을 번복해도 상관이 없다!

# 94. Variable Environment: Hoisting and The TDZ

Hoisting: Makes some types of variables accessible/ usable in the code before
they are actually declared.

<img width="1225" alt="Screen Shot 2020-12-17 at 12 09 37 AM" src="https://user-images.githubusercontent.com/67526014/102376213-bd9b8700-4006-11eb-9ba8-1232b735ad03.png">

## Temporal Dead Zone, Let and const

TDZ: the region of the scope in which the variable is defined, but can't be used
in any way.

Why TDZ? Makes it easier to avoid and catch errors: accessing variables before
declaration is bad practice and should be avoided.

# 95. Hoisting and TDZ in Practice

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

# 96. The this Keyword

this keyword/variables: Special variables that is created for every
context(every function). this keyword is not **static.**

<img width="1200" alt="Screen Shot 2020-12-17 at 1 09 14 AM" src="https://user-images.githubusercontent.com/67526014/102376293-d5730b00-4006-11eb-8e3f-93a7eab292df.png">

# 97. The this Keyword in Practice

브라우저 콘솔에 `console.log(this);`을 입력하면 `Window 객체`가 출력된다.

```js
const calcAgeArrow = (birthYear) => {
  console.log(2037 - birthYear);
  console.log(this);
};

calcAgeArrow(1980); // Window / lexical this keyword
// it uses the this keyword of its parent function or scope
```

```js
const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  }
};
jonas.calcAge(); // 부모객체인 즉, owner인 jonas 객체가 나옴.
```

# 98. Regular Functions vs. Arrow Functions

- **메서드로 화살표 함수는 사용하지 않기**

```js
///////////////////////////////////////
// Regular Functions vs. Arrow Functions
// var firstName = 'Matilda';
// var를 사용하는 것은 전역객체를 만들기 때문에 꽤나 위험하다.
// var 변수를 선언하면, greet 메서드에서 undefined가 아닌 마틸다를 지칭할 것이다.
const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    // console.log(this);
    console.log(2037 - this.year);

    // Solution 1
    // const self = this; // self or that
    // const isMillenial = function () {
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };

    // Solution 2
    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };

    isMillenial();
  }, // 화살표 함수는 부모의 this keyword를 사용한다.
  // 따라서, this는 jonas를 가르킨다.
  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  }
};
jonas.greet();
// jonas.calcAge();
```

## Arguments 키워드

추가 arg를 추가하여 사용하는 것이 가능하다. 하지만, Arguments 키워드는 regular
function안에서만 존재하고, arrow function에선 존재하지 않는다.

```js
// arguments keyword
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 5);
addExpr(2, 5, 8, 12);
var addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};
addArrow(2, 5, 8);
```

# 99. Primitives vs. Objects (Primitive vs. Reference Types)

```js
// Objects vs. primitives
let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);
const me = {
  name: 'Jonas',
  age: 30,
};
const friend = me;
friend.age = 27;
console.log('Friend:', friend); // 'friend': {name: 'Jonas', age: 27}
console.log('Me', me); // 'Me': {name: 'Jonas', age: 27}
Primitive data types: number, string, boolean, undefined, null, symbol. (Primitive type) => Get stored in `the call stack`
Objects: object literal, arrays, functions..many more. (Reference type) => Get stored in `the memory heap`.
```

It's not true to say const are immutable. In fact, that is only true for
primitive values, but not for reference values.

# 100. Primitives vs. Objects in Practice

```js
## Object.assign

이 기술은 오리지널을 그대로 카피할 수 있게 해준다. 그러나, 오직 first level 에서만 가능하다는 문제가 존재한다. 즉, 오직 shallow copy만 가능하다.

## Manipulation the copied object with Push method

// Copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};
const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';
jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');
console.log('Before marriage:', jessica2);
console.log('After marriage: ', jessicaCopy);
```

외부 라이브러리인 Lo-Dash를 통해서도 깊은 복사가 가능하다!

[2020.Dec.18]

# 103. Destructing Arrays

```js
///////////////////////////////////////
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  }
};

// Destructuring Arrays
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];
const [x, y, z] = arr;
console.log(x, y, z); // 2, 3, 4
console.log(arr); // 2, 3, 4

// How to skill a stuff that we might not even need
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// Switching variables
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

// Switching variables with destructuring
[main, secondary] = [secondary, main];
console.log(main, secondary);

// Receive 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// Nested destructuring
const nested = [2, 4, [5, 6]];

// const [i, , j] = nested;
const [i, , [j, k]] = nested;
console.log(i, j, k);

// Default values
// 설정하지 않으면, undefined 출력
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
```

# 104 Destructuring Objects

```js
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours: {
    thu: {
      open: 12,
      close: 22
    },
    fri: {
      open: 11,
      close: 23
    },
    sat: {
      open: 0,
      close: 24
    }
  }
};

// const { name, openingHours, categories } = restaurant;
// console.log(name, openingHours, categories);
// console.log('------------------------------------');
// console.log(restaurant); // 구조 분해 할당은 본래 객체의 데이터는 해치지 않는다.

///////////////////////////////////////
// 🤩 구조 분해 할당으로 새로운 변수이름 주기!
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags
} = restaurant;

// console.log(restaurantName, hours, tags);

//// third-party-data 를 다룰 때, 사용하기 좋음!
// 디폴트 값을 지정해서 새로운 변수 이름 주기!

///////////////////////////////////////
// Default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);
// [] [ 'Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad' ]
// menu는 본래 객체의 데이터에 존재하지 않기 때문에, 디폴트 값을 출력한다.

///////////////////////////////////////
// - Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

// {a, b} = obj; // SyntaxError // 자바스크립트는 컬리 브라켓을 code block으로 인식한다.

({ a, b } = obj);
// 대신에 parenthesis로 묶어주면 괜찮다!
console.log(a, b); // 23 7

///////////////////////////////////////
// - Nested Objects
const { fri } = openingHours;
console.log(fri);

const {
  fri: { open, close }
} = openingHours;
console.log(open, close);

const {
  fri: { open: o, close: c }
} = openingHours;
console.log(o, c);
```

# 105 The Spread Operator (...)

```js
///////////////////////////////////////
// The Spread Operator (...)
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr); // [1, 2, 7, 8, 9];

///////////////////////////////////////
// Much better way! with Spread operator
const newArr = [1, 2, ...arr];
console.log(newArr); // [1, 2, 7, 8, 9];

console.log(...newArr); // 1, 2, 7, 8, 9 (individually!)

console.log(1, 2, 7, 8, 9);
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// 위는 이전 배열을 확장시켜서 새로운 배열을 생성하는 것이다.
console.log(newMenu); // [ 'Pizza', 'Pasta', 'Risotto', 'Gnocci' ]

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// The spread operator works on all so-called iterables.
// Iterables: arrays, strings, maps, sets. NOT objects
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);
console.log(...str);

// console.log(`${...str} Schmedtmann`);
// 위는 출력되지 않는다.
// 스프레드 연산자는 우리가 함수로 인자를 넘겨줄 때 혹은 새로운 배열을 만들 때만 사용이 가능하기 때문이다.
```

```js
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22
  },
  [weekdays[4]]: {
    open: 11,
    close: 23
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24
  }
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your declicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  }
};

// Real-world example
const ingredients = [
  // prompt("Let's make pasta! Ingredient 1?"),
  // prompt('Ingredient 2?'),
  // prompt('Ingredient 3'),
];

console.log(ingredients);

restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);

restaurant.orderPasta(...ingredients);

// since ES 2018, 스프레드 연산자가 object에 적용이 가능하다.
// Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };

console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';

console.log(restaurantCopy.name);
console.log(restaurant.name);
```

# 106 Rest Pattern and Parameters

```js
///////////////////////////////////////
// Rest Pattern and Parameters
// 1) Destructuring
// - SPREAD, because on RIGHT side of =
const arr = [1, 2, ...[3, 4]];

// - REST, because on LEFT side of =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others); // 1 2 [3, 4, 5]

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu
];
console.log(pizza, risotto, otherFood);

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// 2) Functions
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);
const x = [23, 5, 7];
add(...x);

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22
  },
  [weekdays[4]]: {
    open: 11,
    close: 23
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24
  }
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your declicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  }
};

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');
///////////////////////////////////////
```

# 107. Short Circuiting (&& and ||)

```js
///////////////////////////////////////
// Short Circuiting (&& and ||)
console.log('---- OR ----');
// Use ANY data type, return ANY data type, short-circuiting (truthy만 평가!)
console.log(3 || 'Jonas'); // 3
console.log('' || 'Jonas'); // 'Jonas'
console.log(true || 0); // true
console.log(undefined || null); // null
// undefined 는 falsy value!
// null 도 falsy value! Short Circuiting이 없다! 따라서 두번째 값 반환

console.log(undefined || 0 || '' || 'Hello' || 23 || null); // 'Hello' - first truthy value

restaurant.numGuests = 0;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1); // 10

const guests2 = restaurant.numGuests || 10;
console.log(guests2); // 10
console.log('---- AND ----');
// When the first value is falsy, then returns that falsy value.
// When it is truthy, the last value returns.
console.log(0 && 'Jonas'); // 0
console.log(7 && 'Jonas'); // 'Jonas'
console.log('Hello' && 23 && null && 'jonas'); // null

// if it is truth value, the evaluation continues.
// And operator will return the first falsy value or the last value if all of them are truthy.

// Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

0 && console.log('Order Pizza'); // Nothing happened
1 && console.log('Order Pizza'); // Order Pizza
///////////////////////////////////////
```

# 108. The Nullish Coalescing Operator (??)

```js
///////////////////////////////////////
// The Nullish Coalescing Operator
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);
// Nullish: null and undefined (NOT 0 or '')
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);
///////////////////////////////////////
```
