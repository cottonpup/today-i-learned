> Udemy에서 자바스크립트 개념을 공부합니다. 이론 정리를 위해 간략화했을 뿐, 다듬어진 포스트가 아닙니다. 

# Udemy Javascript class!

[2020.Dec.16]

# Section 08

## 91. Execution Contexts and The Call Stack

https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop

https://developer.mozilla.org/en-US/docs/Glossary/Call_stack

https://blog.sessionstack.com/

https://velog.io/@thms200/Event-Loop-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A3%A8%ED%94%84

[how-does-javascript-actually-work-part-1](https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf)
[Check]

## 92 Scope and the scope chain

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

### scope chain vs call stack

call stack은 함수가 호출된 순서이다.

scope chain은 함수의 호출 순서와는 관련이 없다.

## 93. Scoping in Practice

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

## 94. Variable Environment: Hoisting and The TDZ

Hoisting: Makes some types of variables accessible/ usable in the code before
they are actually declared.

<img width="1225" alt="Screen Shot 2020-12-17 at 12 09 37 AM" src="https://user-images.githubusercontent.com/67526014/102376213-bd9b8700-4006-11eb-9ba8-1232b735ad03.png">

### Temporal Dead Zone, Let and const

TDZ: the region of the scope in which the variable is defined, but can't be used
in any way.

Why TDZ? Makes it easier to avoid and catch errors: accessing variables before
declaration is bad practice and should be avoided.

## 95. Hoisting and TDZ in Practice

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

## 96. The this Keyword

this keyword/variables: Special variables that is created for every
context(every function). this keyword is not **static.**

<img width="1200" alt="Screen Shot 2020-12-17 at 1 09 14 AM" src="https://user-images.githubusercontent.com/67526014/102376293-d5730b00-4006-11eb-8e3f-93a7eab292df.png">

## 97. The this Keyword in Practice

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

## 98. Regular Functions vs. Arrow Functions

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

### Arguments 키워드

추가 arg를 추가하여 사용하는 것이 가능하다. 하지만, Arguments 키워드는 regular
function안에서만 존재하고, arrow function에선 존재하지 않는다.

arguments란 모든 아규먼트를 유사배열 형태로 참조하는 값이다.

하지만, ES6에서 스프레드 연산자가 추가된 뒤 쓰지 않는다.

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

## 99. Primitives vs. Objects (Primitive vs. Reference Types)

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

## 100. Primitives vs. Objects in Practice

### Object.assign

이 기술은 오리지널을 그대로 카피할 수 있게 해준다. 그러나, 오직 first level 에서만 가능하다는 문제가 존재한다. 즉, 오직 shallow copy만 가능하다.

### Manipulation the copied object with Push method

```js

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

# Section 09

## 103. Destructing Arrays

```js
///////////////////////////////////////
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
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

## 104 Destructuring Objects

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

## 105 The Spread Operator (...)

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
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
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

## 106 Rest Pattern and Parameters

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

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  weekdays: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
  openingHours: {
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
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your declicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza: function (mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  }
};

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');
///////////////////////////////////////
```

## 107. Short Circuiting (&& and ||)

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

[2020.Dec.19]

## 108. The Nullish Coalescing Operator (??)

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

[2020.Dec.20]

## 109. Coding Challenge #1

```js
/* 
We're building a football betting app (soccer for my American friends 😅)!
Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2') ✅

2. The first player in any player array is the goalkeeper and the others are field players. ✅

For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, ✅

and one array ('fieldPlayers') with all the remaining 10 field players  ✅

3. Create an array 'allPlayers' containing all players of both teams (22 players) ✅

4. During the game, Bayern Munich (team 1) used 3 substitute players. ✅

So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic' ✅

5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')

6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, 

along with the number of goals that were scored in total (number of player names passed in)

7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski'
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze'
    ]
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5
  }
};

const [players1, players2] = game.players;

//console.log(players1, players2);

const [goalkeeper, ...fieldPlayers] = players1;
// console.log(goalkeeper, fieldPlayers);

const allPlayers = [players1, players2];
// console.log(allPlayers);

const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// console.log(players1Final);

// const { team1, x: draw, team2 } = { ...game.odds };
// console.log(team1, draw, team2);

const {
  odds: { team1, x: draw, team2 }
} = game;
console.log(team1, draw, team2);

// 6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console,

// along with the number of goals that were scored in total (number of player names passed in)

// 6.
const printGoals = function (...players) {
  console.log(players);
  console.log(`${players.length} goals were scored`);
};
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
// printGoals('Davies', 'Muller');
// printGoals(game.scored);
// printGoals(...game.scored);

// 7.
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');
```

## 110. Looping Arrays: The for-of Loop

```js
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your declicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  }
};

// The for-of Loop
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// for (const item of menu) console.log(item); // individually log into console

// for (const item of menu.entries()) {
//   //   console.log(item); // individually log with array number into console
//   //   console.log(`${item[0] + 1}: ${item[1]}`);

// }

// console.log(menu.entries()); // Object [Array Iterator] {}

// console.log([...menu.entries()]);

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}
```

## 111. Enhanced Object Literals

```js
// ES6 computing property name
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

  // Before ES6
  openingHours: openingHours,

  // ES6 enhanced object literals
  openingHours,

  // ES6 new method syntax
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
```

## 112. Optional Chaining (.?)

```js
///////////////////////////////////////
// Optional Chaining

if (restaurant.openingHours && restaurant.openingHours.mon)
  // check if it exists
  console.log(restaurant.openingHours.mon.open);
// console.log(restaurant.openingHours.mon.open); // undefined

// WITH optional chaining
// Before question mark, property exists, the next property will be read. If the next property doesn't exist, then undefined will be returned.
// NOT null, undefined.
console.log(restaurant.openingHours.mon?.open); // undefined
console.log(restaurant.openingHours?.mon?.open); // prevent error

// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  // if we want to use a variable name as the property name, basically, we need to use the brackets notation.
  // const open = restaurant.openingHours[day]?.open || 'closed';
  // saturday 가 안 뜸. 0는 falsy value이기 때문!
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// Methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// Arrays
const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
// const users = [];
console.log(users[0]?.name ?? 'User array empty');

if (users.length > 0) console.log(users[0].name);
else console.log('user array empty');

///////////////////////////////////////
```

## 113. Looping Objects: Object Keys, Values, and Entries

```js
///////////////////////////////////////
// Looping Objects: Object Keys, Values, and Entries

// Property NAMES
for (const day of Object.keys(openingHours)) {
  console.log(day); // thu, fri, sat
}

const properties = Object.keys(openingHours); // ['thu', 'fri', 'sat'];
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;

for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

// Property VALUES
const values = Object.values(openingHours);
console.log(values);

/*
[
  { open: 12, close: 22 },
  { open: 11, close: 23 },
  { open: 0, close: 24 }
]
*/

// Entire object
// object 랑 array랑 방법이 다르기 때문에 주의!

const entries = Object.entries(openingHours);
// console.log(entries);
// the value needs destructing because the value itself is also an object.
// [key, value]
for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}
```

## 114. Coding Challenge #2

```js
// Coding Challenge #2

/* 
Let's continue with our football betting app!
1. Loop over the game.scored array and print each player name to the console,
 along with the goal number (Example: "Goal 1: Lewandowski")

2. Use a loop to calculate the average odd and
 log it to the console 
 (We already studied how to calculate averages, you can go check if you don't remember)

3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5

Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉
BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }
GOOD LUCK 😀
*/
```

```js
// 1.
for (const [i, player] of game.scored.entries())
  console.log(`Goal ${i + 1}: ${player}`);
// 2.
const odds = Object.values(game.odds);
let average = 0;
for (const odd of odds) average += odd;
average /= odds.length;
console.log(average);
// 3.
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr} ${odd}`);
}
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5
// BONUS
// So the solution is to loop over the array, and add the array elements as object properties, and then increase the count as we encounter a new occurence of a certain element
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
```

[객체 기본](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/Basics)

## 115. Sets

```js
// Sets
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);

console.log(ordersSet); // 중복은 제외
console.log(new Set('Jonas')); // 5개의 각각의 글자 출력
console.log(new Set()); // set could be empty
console.log(ordersSet.size); // not length
console.log(ordersSet.has('Pizza')); // check if it is in there
console.log(ordersSet.has('Bread'));
console.log(ordersSet[0]); // undefined
// In sets, there are no indexes.
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
ordersSet.delete('Risotto');
// ordersSet.clear(); // clear everything in the set
console.log(ordersSet);
// sets are iterables. we can loop sets!
for (const order of ordersSet) console.log(order);

// Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = new Set(staff); // set으로 출력
const staffUnique = [...new Set(staff)]; // 새로운 배열로 출력
console.log(staffUnique);
// 우리가 얼마나 많이 고유 아이템을 가지고 있는지 알고싶다면!
console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
);
// see how many different letters there
console.log(new Set('jonasschmedtmann').size);
*/
```

## 116. Maps: Fundamentals

```js
///////////////////////////////////////
// Maps: Fundamentals
const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal'));

// set method returns new set, allows us to chain the set method like this.

// chain next set!
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 8;
console.log(rest.get(time > rest.get('open') && time < rest.get('close'))); // Not readable :(

console.log(rest.has('categories'));
rest.delete(2); // Key를 기반으로 지운다. // Not encouraged

// rest.clear();
const arr = [1, 2];
rest.set(arr, 'Test');
// rest.set([1, 2], 'test'); // ❶
// console.log(rest.get([1, 2]); // ❶에 있는 [1, 2]의 메모리 주소가 다르기 때문에 다른 값이다.

// html element도 선택가능!
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
console.log(rest.size);
console.log(rest.get(arr));
```

## 117 Maps: Iteration

```js
///////////////////////////////////////
// Maps: Iteration
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!']
]);
console.log(question);
// Convert object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);
// Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
// const answer = Number(prompt('Your answer'));
const answer = 3;
console.log(answer);
console.log(question.get(question.get('correct') === answer));
// Convert map to array
console.log([...question]);
// console.log(question.entries());
console.log([...question.keys()]);
console.log([...question.values()]);
```

## 118. Summary: Which Data Structure to Use?

<img width="1280" alt="Screen Shot 2020-12-26 at 2 53 59 PM" src="https://user-images.githubusercontent.com/67526014/103150736-1cf15800-47ba-11eb-8b67-4abec437f3d0.png">

## 119. Coding Challenge #3

```js
///////////////////////////////////////
// Coding Challenge #3

/*
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).
1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL
GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card']
]);
```

## 120. Working With Strings - Part 1

```js
///////////////////////////////////////
// Working With Strings - Part 1
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]); // A
console.log(plane[1]); // 3
console.log(plane[2]); // 2

console.log('B737'[0]); // B

console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r')); // 6
console.log(airline.lastIndexOf('r')); // 10
console.log(airline.indexOf('portugal')); // case sensitive

console.log(airline.slice(4)); // 부분을 반환. 마지막 숫자는 포함이 되지 않는다. 숫자의 바로 직전 스트링만!
console.log(airline.slice(4, 7));
// 첫번째 단어를 반환하기.
console.log(airline.slice(0, airline.indexOf(' ')));
// 마지막 단어를 반환하기
console.log(airline.slice(airline.lastIndexOf(' ') + 1));
// 거꾸로 세서 단어 반환하기
console.log(airline.slice(-2));
console.log(airline.slice(1, -1)); // AP Air Portuga

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got the middle seat 😬');
  else console.log('You got lucky 😎');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

/*
 this process is called boxing

because it basically takes our string

and puts it into a box

which is the object.
*/

console.log(new String('jonas'));
console.log(typeof new String('jonas').slice(1)); // string
// the object is converted back to a regular string primitive.
console.log(typeof new String('jonas')); // object
*/

```

## 120 Working With Strings

```js
///////////////////////////////////////

// Working With Strings - Part 2
const airline = 'TAP Air Portugal';
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name
const passenger = 'jOnAS'; // Jonas
const passengerLower = passenger.toLowerCase();

const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';
// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
// 한번에 해버리기!
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';
console.log(announcement.replace('door', 'gate'));
// 자바스크립트에서 replaceAll 은 존재하지 않는다!
// console.log(announcement.replaceAll('door', 'gate'));
console.log(announcement.replace(/door/g, 'gate'));

// Booleans
const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));
console.log(plane.startsWith('Airb'));
if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Part of the NEW ARirbus family');
}

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};

checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');
```

## 121 Working With Strings - Part 3

```js
///////////////////////////////////////
// Working With Strings - Part 3
// Split and join
console.log('a+very+nice+string'.split('+'));
// [ 'a', 'very', 'nice', 'string' ]
// 성과 이름 분리해서 추출하기
console.log('Jonas Schmedtmann'.split(' '));
// [ 'Jonas', 'Schmedtmann' ]

const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);
// Mr. Jonas SCHMEDTMANN

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];
  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};
capitalizeName('jessica ann smith davis');
// Jessica Ann Smith Davis
capitalizeName('jonas schmedtmann');
// Jonas Schmedtmann

// Padding
// padStart()와 padEnd()의 인자 수는 string의 길이보다 커야한다. 
// 만약 인자 수가 string의 길이보다 작을 경우, 아무 일도 일어나지 않는다!
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+'));
// ++++++Go to gate 23!++++++++++
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));
// +++++++++++++++Jonas++++++++++

const maskCreditCard = function (number) {
  // how to convert a number to a string
 // const str = String(number);
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};
console.log(maskCreditCard(64637836));
console.log(maskCreditCard(43378463864647384));
console.log(maskCreditCard('334859493847755774747'));

// Repeat
const message2 = 'Bad waether... All Departues Delayed... ';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'🛩'.repeat(n)}`);
};
planesInLine(5);
planesInLine(3);
planesInLine(12);

```

## 122 Coding Challenge #4

```js
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.
The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.
THIS TEST DATA (pasted to textarea)

underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!
Afterwards, test with your own test data!
GOOD LUCK 😀
*/


/*
document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');
  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
});
*/

```
# Section 10

## 126. Default Parameters

```js
'use strict';

/*
///////////////////////////////////////
// Default Parameters
const bookings = [];
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5 Ugly boilerplate code
  // numPassengers = numPassengers || 1;
  // price = price || 199;
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);
createBooking('LH123', undefined, 1000);

///////////////////////////////////////
```

## 127. How Passing Arguments Works: Values vs. Reference

```js
///////////////////////////////////////
// How Passing Arguments Works: Values vs. Reference
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};
const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;
  if (passenger.passport === 24739479284) {
    alert('Checked in');
  } else {
    alert('Wrong passport!');
  }
};
// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);
// Is the same as doing...
// const flightNum = flight;
// const passenger = jonas;
const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000000);
};
newPassport(jonas);
checkIn(flight, jonas);
```

자바스크립트 참조방식, 복사방식 

**자바스크립트에서 참조를 전달할 수 없다. 참조하고 있는 메모리 주소 값을 전달하는 것!**

## 128. First-Class and Higher-Order Functions

[자바스크립트는 일급 객체이다.](https://soeunlee.medium.com/javascript%EC%97%90%EC%84%9C-%EC%99%9C-%ED%95%A8%EC%88%98%EA%B0%80-1%EA%B8%89-%EA%B0%9D%EC%B2%B4%EC%9D%BC%EA%B9%8C%EC%9A%94-cc6bd2a9ecac)
https://bestalign.github.io/2015/10/18/first-class-object/

```js
///////////////////////////////////////
// Functions Accepting Callback Functions
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};
// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`Transformed by: ${fn.name}`);
};
transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);
// JS uses callbacks all the time
const high5 = function () {
  console.log('👋');
};
document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5);
```

<img width="707" alt="Screen Shot 2021-01-03 at 4 36 12 PM" src="https://user-images.githubusercontent.com/67526014/103473961-e9c64e80-4de1-11eb-9120-5c57cecb981e.png">

## 129. Functions Accepting Callback Functions

콜백 함수의 사용이유: 코드의 재사용과 추상화를 도움

```js 
///////////////////////////////////////
// Functions Accepting Callback Functions 
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};
// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  // 함수 이름 출력하는 메섣, 
  console.log(`Transformed by: ${fn.name}`);
};
transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);
// JS uses callbacks all the time
const high5 = function () {
  console.log('👋');
};
document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5);
```

## 130. Functions Returning Functions

```js
///////////////////////////////////////
// Functions Returning Functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');
greet('Hello')('Jonas');

// Challenge
// 화살표 함수로 콜백함수 호출하기 
const greetArr = greeting => name => {console.log(`${greeting} ${name}`)};
greetArr('Hi')('Jonas');

```

## 131. The call and apply Methods

```js
///////////////////////////////////////
// The call and apply Methods
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');

// this가 바인딩 된 객체와 Key명은 똑같이 해줘야 한다!
const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;
// 일반 함수 식에서 this키워드는 (strict mode에서) undefined이다. (window에선 전역)
// Does NOT work
// book(23, 'Sarah Williams');

// Call method
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);
book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};
book.call(swiss, 583, 'Mary Cooper');

// Apply method
// Call이 더 모던한 방법 
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);
book.call(swiss, ...flightData);
```

## 132. The bind Method

```js
///////////////////////////////////////
// The bind Method
// book.call(eurowings, 23, 'Sarah Williams');
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEW(23, 'Steven Williams');
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
// lufthansa.buyPlane();
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;
console.log(addVAT(100));
console.log(addVAT(23));
const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));
*/
```

## 134. Immediately Invoked Function Expressions (IIFE)

```js
///////////////////////////////////////
// Immediately Invoked Function Expressions (IIFE)
const runOnce = function () {
  console.log('This will never run again');
};
runOnce();
// IIFE
(function () {
  console.log('This will never run again');
  const isPrivate = 23;
})();
// console.log(isPrivate);
(() => console.log('This will ALSO never run again'))();
{
  const isPrivate = 23;
  var notPrivate = 46;
}
// console.log(isPrivate);
console.log(notPrivate);
```

## 135. Closures

A closure makes a function remember all the variables that existed at the function's birthplace.

> private 변수를 선언할 때 이름 컨벤션: 변수명 앞에 언더 스코어(_) 붙혀주기 

```js
///////////////////////////////////////
// Closures
const secureBooking = function () {
  let passengerCount = 0;
  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};
const booker = secureBooking();
booker();
booker();
booker();
console.dir(booker);
```

<img width="1280" alt="Screen Shot 2021-01-05 at 7 06 46 AM" src="https://user-images.githubusercontent.com/67526014/103584870-7decfe80-4f25-11eb-8a11-79afb4ba47fc.png">

<img width="346" alt="Screen Shot 2021-01-05 at 7 08 26 AM" src="https://user-images.githubusercontent.com/67526014/103584877-804f5880-4f25-11eb-9c31-b8e0f3bd7b90.png">

[[]] => 코드내에서 접근할 수 없다는 의미!

## 137. Coding Challenge #2

```js
(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';
    document.querySelector('body').addEventListener('click', function () {
      header.style.color = 'blue';
    });
  })();
```

# Section 11

## 140. Simple Array Methods

### slice()💇‍♀️
```js
// SLICE 

// slice() takes only 2 parameters 
// 첫번째 인덱스는 자르는 출발시점, 두번째 인덱스는 자르는 것을 마치는 시점 (두번째 인덱스의 문자는 포함되지 않고 앞에서 잘린다.)
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr);
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2)); // take last two elements
console.log(arr.slice(1, -2));
console.log(arr.slice(1, 3));

// [ 'a', 'b', 'c', 'd', 'e' ]
// [ 'c', 'd', 'e' ]
// [ 'c', 'd' ]
// [ 'd', 'e' ]
// [ 'b', 'c' ]
// [ 'b', 'c' ]

// 1️⃣. slice() 메서드 활용 🖨
console.log(arr.slice());
// [ 'a', 'b', 'c', 'd', 'e' ] // shallow copy 
// 2️⃣. 스프레드 용법 활용 🖨
console.log([...arr]);
// [ 'a', 'b', 'c', 'd', 'e' ] 
```
### splice()💇‍♀️
```js
// SPLICE
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.splice(2)); //[ 'c', 'd', 'e' ]
console.log(arr); //[ 'a', 'b' ]
console.log(arr.splice()); //[ ]
console.log(arr.splice(1, 2)); //[ 'b' ]
console.log(arr); //[ 'a' ]
// Original array is gone 😥😰

let array = ['today', 'was', 'not', 'so', 'great'];

array.splice(2, 2);
// remove 2 elements beginning with the 3rd element
// array now equals ['today', 'was', 'great']

const numbers = [10, 11, 12, 12, 15];
const startIndex = 3;
const amountToDelete = 1;

numbers.splice(startIndex, amountToDelete, 13, 14);
// the second entry of 12 is removed, and we add 13 and 14 at the same index
console.log(numbers);
// returns [ 10, 11, 12, 13, 14, 15 ]
```

### reverse()💇‍♀️
```js
// REVERSE
let arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];

console.log(arr2.reverse());
console.log(arr2); // 원본 배열도 수정함! 😱😨
```

### concat()💇‍♀️
```js
// CONCAT
let arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
arr2.reverse();
const letters = arr.concat(arr2);
console.log(letters);
console.log(...arr, ...arr2);
```

### join()💇‍♀️
```js
let arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
arr2.reverse();
const letters = arr.concat(arr2);
console.log(letters);
console.log(...arr, ...arr2);

// ---------------------------------
// ---------------------------------
// JOIN

console.log(letters.join(' - '));
// a - b - c - d - e - f - g - h - i - j
```

## 141. Looping Arrays: forEach
`Math.abs`: 수의 절대값을 반환

```js
// forEach 😙😘
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for(const [i, mov] of movements.entries()){
  if(mov > 0){
    console.log(`Movement ${i + 1}: You deposited ${mov}`)
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
}

// FOR EACH 
// forEach는 고차함수로 콜백함수를 요구한다.
console.log('------- FOREACH -------');
movements.forEach(function(mov, i, arr){
  if(mov > 0){
    console.log(`Movement ${i + 1}: You deposited ${mov}`)
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
})

// continue, break statement는 forEach문에서 쓸 수 없다. 😢😔 그냥 모든 배열을 다 loop over한다.
// continue, break statement를 쓸거면 for of 를 써라!
```

## 142. forEach With Maps and Sets

```js
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// MAP
currencies.forEach(function(value, key, map){
  console.log(`${key}: ${value}`);
  // USD: United States dollar
  // EUR: Euro
  // GBP: Pound sterling
})

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']); 
// [] 배열로 안 묶어주면 Set(3) { 'U', 'S', 'D' } 처럼 나옴..ㅎ
// Set(이터러블)! 이터러블 값을 넣어야 해요 👩‍🏫 중요~
console.log(currenciesUnique);
currenciesUnique.forEach(function(value, _, set){
  console.log(`${value}: ${value}`); // key === value
  // USD: USD
  // GBP: GBP
  // EUR: EUR
  // 필요없는 변수명은 '_' 언더스코어로 지정해주는 것이 자바스크립트 컨벤션이다. 
})
```

## 146. Data Transformations: map, filter, reduce

<img width="1280" alt="Screen Shot 2021-01-07 at 12 28 45 PM" src="https://user-images.githubusercontent.com/67526014/103847911-8b9cb280-50e4-11eb-9df9-509d06d116e1.png">

## 147. The map Method

🗺 `Map`을 `forEach`처럼 loop over하며 사용하기! 

`차이점은 뭔데?🧐`: map은 새로운 배열로 따로 반환된다.

```js
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Map으로 새로운 배열로 출력하기 🗺
movements.map(function(mov, i){
  if(mov > 0){
    console.log(`Movement ${i + 1}: You deposited ${mov}`)
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
})

movements.map((mov, i) => console.log(`Movement ${i + 1}: You ${mov > 0? 'deposited' : 'withdrew'} ${Math.abs(mov)}`))
```

## 148. Computing Usernames

`Mission 🚀`: 각 이름의 첫번째 글자만 받아오기

map 메서드를 사용하여 loop over하기!

```js
const user = 'Steven Thomas Williams';

const userName = user
.toLowerCase()
.split(' ')
.map(name => name[0])
.join('');
console.log(userName); // stw
```

## 149. The filter method

`Mission 🚀`: 양수만 받아오기

filter 메서드, for of를 사용하여 loop over하기!

```js
// 1. filter 사용하기 🚀 - 새로운 배열로 따로 출력
const deposit = movements.filter(function(mov){
  return mov > 0;
})
console.log(deposit);

// 2. for of 사용하기 🚀
const depositFor = []; - 새로운 배열로 출력하기 위해선 따로 아이템들을 빈 배열에 push 해야 가능!
for(const mov of movements) if(mov > 0) depositFor.push(mov);
console.log(depositFor);
```

## 150. The reduce method

`Mission 🚀`: 합계 출력하기!, 최댓값 출력하기! 

```js
// REDUCE METHOD
// accumulator -> SNOWBALL ☃️
// const balance = movements.reduce(function(acc, cur, i, arr){ // acc = accumulator
//   return acc + cur;
// }, 0);
// console.log(balance);

> 나 자꾸 reduce 메서드 사용할 때 `acc += cur` 이렇게 쓴다..
>
> 그렇게 안해도 되는게 reduce는 값을 누적하기 때문에 굳이 저렇게 안 적어도 된다. 명심..

// 깔꼼 버젼 💅
const balance = movements.reduce((acc, cur) => {acc + cur}, 0);
console.log(balance);

// FOR OF 활용하기 - 초기값(쌓이는 값)은 유동적으로 계속 변하니까 let으로 설정해두어야 함! 
let balance2 = 0;
for(const mov of movements) balance2 += mov;
console.log(balance2);

// Maximum value
console.log(movements);
const max = movements.reduce((acc, mov) => {
  if(acc > mov) {
    console.log(`${acc} > ${mov}`);
    return acc
  } else {
    console.log(`${acc} < ${mov}`);
    return mov
  };
}, movements[0]); // initialValue에 0하지 않기! 만약 값들이 다 마이너스면 어떡해..ㅎㅎ

console.log(`최후의 승자..👑: ${max}`);
```

> reduce 메서드로 평균 값을 구할 때, 초기 값이 매우 중요하다..!
> 
> 평균 값이 다르게 출력될 수도 있기 때문이다. 평균은 무조건 초기값을 0으로 설정해줘야 한다.

```js
const a = [1, 2, 3, 4, 5];

const test1 = a.reduce(function(acc, cur){
  console.log(`${acc} + ${cur}`)
  return acc + cur;
}, a[0]);
console.log('\n');
const test2 = a.reduce(function(acc, cur){
  console.log(`${acc} + ${cur}`)
  return acc + cur;
}, 0);
console.log('\n')
console.log(test1);
console.log('\n')
console.log(test1);
```

```js
// 보통 인간이라면, 할 방법..ㅎㅎㅎㅎ
//   const averageHumanAge = adults.reduce((acc, age) => 
//   acc + age / adults.length, 0);

const average = adults.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );

// 2를 마지막 합에 나누나, 각자 나누나 값은 똑같다...! 😨😱🤯😳🙊 나 넘 몽총..
// 2 3. (2+3)/2 = 2.5 === 2/2+3/2 = 2.5 
```

## 152. The Magic of Chaining Methods

```js
const eurToUsd = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, cur) => acc + cur, 0);

console.log(totalDepositsUSD);
```

## 153. Coding Challenge #2

```js
// 코드 블럭이 있는 거랑 없는거랑... 
// 화살표 함수에서 블럭이 없으면, return 안 적어도 된다구엿!!
const calcAverageHumanAge = (ages) => 
  ages.map(age => age <= 2? 2 * age : 16 + age * 4)
  .filter(age => age >= 18)
  .reduce((pre, cur, i, arr) => pre + cur / arr.length, 0) // 초기값은 무조건 뒤!

const test1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
console.log(test1);
```

## 154. The find method

find 메서드는 filter 메서드와 비슷하게 동작한다.

하지만 filter는 배열을 반환하고, find 메서드는 조건에 부합하는 첫번째 아이템만을 반환한다.

```js
// The find Method
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);
console.log(accounts);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);
```

## 155. Implementing Login

먼가 신기한 할당 방법! ㅎ

```js
// 왼쪽에서, 오른쪽으로 할당하기 때문에, 이렇게 적는 것이 가능하다. 
inputLoginUsername.value = inputLoginPin.value = '';
```

## 157. The findIndex Method

`findIndex()` 메서드는 `find()` 메서드와 비슷하나, 엘리먼트 자체가 아닌 엘리먼트의 인덱스를 반환한다.

## 158. some and every

```js
console.log(movements);

// EQUALITY
console.log(movements.includes(-130)); // true

// SOME: CONDITION
console.log(movements.some((mov) => mov === -130)); // true

const anyDeposits = movements.some((mov) => mov > 0); // 조건에 부합하는 any value!!
console.log(anyDeposits);

// EVERY
console.log(movements.every((mov) => mov > 0));
console.log(account4.movements.every((mov) => mov > 0));

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
```

## 159. flat and flatMap

```js
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());
// [1, 2, 3, 4, 5, 6, 7, 8]

const arrDeep = [[1, [2, 3]], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2));
// [1, 2, 3, 4, 5, 6, 7, 8]

// const accountMovement = accounts.map(acc => acc.movements);
// console.log(accountMovement);
// const allMovements = accountMovement.flat();
// console.log(allMovements);
// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

// flat: chaining
const overallBalance = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);
// 17840


// flatMap
const overallBalance = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);
// 17840
```

## 160. Sorting Arrays

```js
// movements.sort((a, b) => a - b);
// console.log('ascending', movements);

// descending
// movements.sort((a, b) => {
//   if(a > b) return -1;
//   if(a < b) return 1;
// });

// movements.sort((a, b) => b - a);
// console.log('descending', movements);
```

## 161. More Ways of Creating and Filling Arrays

- 1. Array.fill() 🎃
  
```js
// 1. Array.fill() 🎃
console.log([1, 2, 3]);
console.log(new Array(1, 2, 3)); // [1, 2, 3]

const x = new Array(7);
console.log(x); // [empty x 7] array 
// console.log(x.map(()=> 5)); // [empty x 7] array : doesn't work

// x.fill(3); // mutate the underlying array 
// x.fill(1, 3) // [empty × 3, 1, 1, 1, 1]
x.fill(1, 3, 5) // [empty × 3, 1, 1, empty × 2]
console.log(x); 

x.fill(23, 4, 6) // [empty × 3, 1, 23, 23, empty] 
console.log(x); 
```

- 2. Array.from() 🎃
  
```js
// 2. Array.from() 🎃
const y = Array.from({length: 7}, ()=> 1);
console.log(y); // [1, 1, 1, 1, 1, 1, 1]

const z = Array.from({length: 7}, (_, i)=> i+1); // cur => _ 컨벤션에 따라 인자명 바꿔주기
console.log(z); // [1, 2, 3, 4, 5, 6, 7]
```

- querySelectorAll 🎃
  
```js
/*
querySelectorAll 은 NodeList를 반환하는데, 진짜 Array가 아니다. 
따라서 많은 Array method를 가지고 있지 않는다. 
그럼 어떻게 해야해요??😙 NodeList를 Array로 반환하자! 
For that, `Array.from()`은 PERFECT! 👏
*/

labelBalance.addEventListener('click', function(){
  // movementsUI => Array 
  // 두번째 인자에 맵핑한 숫자 넣기 
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'), 
    el => Number(el.textContent.replace('€' ,''))
  )
  console.log(movementsUI);

  // 다른 방법!
  const movementsUI2 = [
    ...document.querySelectorAll('.movements__value'),
  ].map(el => Number(el.textContent.replace('€', '')));
  console.log(movementsUI2);
});
```

## 162. Summary: Which Array Method to Use?

<img width="1280" alt="Screen Shot 2021-01-12 at 7 05 04 PM" src="https://user-images.githubusercontent.com/67526014/104299930-280ded00-5509-11eb-9100-e183b7887df2.png">

## 163. Coding Challenge

```js
console.log('======== 정렬 ========')
// recFood를 정렬하고, 오름차순 정렬 순으로 객체 출력하기
const sortedDogs = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(sortedDogs)
```