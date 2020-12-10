# 프로토타입

## 상속과 프로토타입

동일한 생성자 함수에 의해 생성된 모든 인스턴스가 동일한 메서드를 중복 소유하는 것은 메모리를 불팔요하게 낭비한다.

상속을 통해 불필요한 중복을 제거하여 더 효율적으로 사용할 수 있다. 자바스크립트는 프로토타입을 기반으로 상속을 구현한다.

생성자 함수가 생성할 모든 인스턴스가 공통적으로 사용할 프로퍼티나 메서드를 프로토타입에 미리 구현해놓으면 생성자 함수가 생성 할 모든 인스턴스는

별도의 구현없이 상위(부모) 객체인 프로토타입의 자신을 공유하여 사용할 수 있다.

## 프로토타입 객체

프로토타입이란 객체지향 프로그래밍의 근간을 이루는 객체 간 상속을 구현하기 위해 사용된다.

모든 객체는 `[[Prototype]]`이라는 내부 슬롯을 가지며, 이 내부 슬롯의 값은 프로토타입의 참조다. `[[Prototype]]`에 저장되는 프로토타입은 객체 생성 방식에 의해 결정된다.

즉, 객체가 생성될 때 객체 생성 방식에 따라 프로토타입이 결정되고 `[[Prototype]]`에 저장된다.

모든 객체는 하나의 프로토타입을 갖는다.

## `__proto__` 접근자 프로퍼티

모든 객체는 `__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 `[[Prototype]]` 내부 슬롯에 간접적으로 접근할 수 있다.

내부 슬롯은 프로퍼티가 아니다. 따라서 자바스크립트는 원칙적으로 내부 슬롯과 내부 메서드에 호출할 수 있는 방법을 제공하지 않는다.

단, 일부 내부 슬롯과 내부 메서드에 한해서 `__proto__`을 통해 간접적으로 접근할 수 있는 수단을 제공하기는 한다.

접근자 프로퍼티는 자체적으로 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수, 즉 `[[Get]], [[Set]]` 프로퍼티 어트리뷰트로 구성된 프로퍼티다.

`__proto__`는 getter/setter 함수라고 부르는 접근자 함수를 통해 내부 슬롯의 값, 즉 프로토타입을 취득하거나 할당한다.

### `__proto__` 접근자 프로퍼티는 상속을 통해 사용된다.

```js
const person = { name: 'Lee' };

// person 객체는 __proto__ 프로퍼티를 소유하지 않는다.
console.log(person.hasOwnProperty('__proto__')); // false

// __proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}

// 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다.
console.log({}.__proto__ === Object.prototype); // true
```

### `__proto__` 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 권장하지 않는다.

`__proto__` 접근자 프로퍼티는 ES5까지 ECMAScript 사양에 포함되지 않은 비표준이었다.

브라우저 호환성을 고려하여 ES6에서 `__proto__` 를 표준으로 채택했다.

하지만 코드 내에서 `__proto__` 접근자 프로퍼티를 사용하는 것은 권장하지 않는다.

모든 객체가 `__proto__` 접근자 프로퍼티를 사용할 수 있는 것은 아니기 때문이다.

접근자 프로퍼티 대신 프로토타입의 참조를 취득하고 싶은 경우에는 `Object.getPrototypeOf` 메서드를 사용하고, 프로토타입을 교체하고 싶은 경우에는 `Object.setPrototyprOf` 메서드를 사용할 것을 권장한다.

## 함수 객체의 prototype 프로퍼티

함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.

**생성자 함수로서 호출할 수 없는 함수, 즉 non-constructor인 화살표 함수와 ES6 메서드 축약 표현으로 정의한 메서드는 prototype 프로퍼티를 소유하지 않으며 프로토타입도 생성하지 않는다.**

```js
// 화살표 함수는 non-constructor다.
const Person = (name) => {
    this.name = name;
};

// non-constructor는 prototype 프로퍼티를 소유하지 않는다.
console.log(Person.hasOwnProperty('prototype')); // false

// non-constructor는 프로토타입을 생성하지 않는다.
console.log(Person.prototype); // undefined

// ES6의 메서드 축약 표현으로 정의한 메서드는 non-constructor다.
const obj = {
    foo() {}
};

// non-constructor는 prototype 프로퍼티를 소유하지 않는다.
console.log(obj.foo.hasOwnProperty('prototype')); // false

// non-constructor는 프로토타입을 생성하지 않는다.
console.log(obj.foo.prototype); // undefined
```

생성자 함수로 호출하기 위해 일반함수도 prototype 프로퍼티를 소유하지만, 객체를 생성하지 않는 일반함수의 prototype 프로퍼티는 아무런 의미가 없다.

|        구분        |    소유     |        값         |  사용 주체  |                                  사용 목적                                   |
| :----------------: | :---------: | :---------------: | :---------: | :--------------------------------------------------------------------------: |
|    `__proto__`     |  모든 객체  |  프로퍼티의 참조  |  모든 객체  |           객체가 자신의 프로토타입에 접근 또는 교체하기 위해 사용            |
| prototype 프로퍼티 | constructor | 프로토타입의 참조 | 생성자 함수 | 생성자 함수가 자신이 생성할 객체(인스턴스)의 프로토타입을 할당하기 위해 사용 |

### 프로토타입의 constructor 프로퍼티와 생성자 함수

모든 프로토타입은 constructor 프로퍼티를 갖는다. 이 constructor 프로퍼티는 prototype 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킨다.

## 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

객체 리터럴이 평가될 때는 다음과 같이 추상연산 OrdinaryObjectCreate를 호출하여 빈 객체를 생성하고 프로퍼티를 추가하도록 정의되어 있다.

리터럴 표기법에 의해 생성된 객체도 상속을 위해 프로토타입이 필요하다. 따라서 리터럴 표기법에 의해 생성된 객체도 가상적인 생성자 함수를 갖는다.

프로토타입은 생성자 함수와 더불어 생성되며 prototype, constructor 프로퍼티에 의해 연결되어있기 때문이다.

다시말해, 프로토타입과 생성자 함수는 단독으로 존재할 수 없고, 항상 쌍으로 존재한다.

## 객체 생성 방식과 프로토타입의 결정

모든 객체는 각 방식마다 세부적인 객체 생성 방식의 차이는 있으나, 추상 연산 OrdinaryObjectCreate 에 의해 생성된다는 공통점이 있다.

### 객체 리터럴에 의해 생성된 객체의 프로토타입

객체 리터럴에 의해 생성된 객체는 프로토타입으로 갖게 된다. 객체는 constructor 프로퍼티와 hasOwnProperty 메서드 등을 소유하지 않지만, 자신의 프로토타입인

Object.prototype의 constuctor 프로퍼티와 hasOwnPropety 메서드 등을 소유하지 않지만 자신의 프로토타입인 Object.prototype의 constructor 프로퍼티와

hasOwnProperty 메서드를 자신의 자산인 것 처럼 자유롭게 사용할 수 있다.

### Object 생성자 함수에 의해 생성된 객체의 프로토타입

Object 생성자 함수를 인수 없이 호출하면 빈 객체가 생성된다.

객체 리터럴 방식은 객체 리터럴 내부에 프로퍼티를 추가하지만 Object 생성자 함수 방식은 일단 빈 객체를 생성한 이후 프로퍼티를 추가해야 한다.

### 생성자 함수에 의해 생성된 객체의 프로토타입

사용자 정의 생성자 함수는 더불어 생성된 프로토타입의 프로퍼티는 constructor뿐이다.

따라서 프로토타입에 프로퍼티를 추가하여 하위객체가 상속받을 수 있도록 구현해주어야 한다.

## 프로토타입 체인

Object.prototype 을 프로토타입 체인의 종점이라고 한다.

Object.prototype 에서도 프로퍼티를 검색할 수 없는 경우, undefined 를 반환한다.

> 프로토타입 체인은 상속과 프로퍼티 검색을 위한 메커니즘

> 스코프 체인은 식별자 검색을 위한 메커니즘

스코프 체인과 프로토타입 체인은 서로 협력하여 식별자와 프로퍼티를 검색하는 데 사용한다.

## 프로토타입의 교체

### 생성자 함수에 의한 프로토타입의 교체

```js
const Person = (function () {
    function Person(name) {
        this.name = name;
    }

    // ① 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
    Person.prototype = {
        sayHello() {
            console.log(`Hi! My name is ${this.name}`);
        }
    };

    return Person;
})();

const me = new Person('Lee');

/////////////////////////////////////////////////////////////////////
// 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다.
console.log(me.constructor === Person); // false
// 프로토타입 체인을 따라 Object.prototype의 constructor 프로퍼티가 검색된다.
console.log(me.constructor === Object); // true
```

> **프로토타입 교체 방식에 의해 발생하는 차이** 생성자 함수에 의한 프로토타입 교체: 프로퍼티가 교체된 프로토타입을 가리킨다. 인스턴스에 의한 프로토타입 교체: 프로퍼티가 교체된 프로토타입을 가리키지 않
> 는다.

## instanceof 연산자

> 객체 instanceof 생성자 함수

우변의 생성자 함수의 prototype에 바인딩된 객체가 좌변의 객체의 프로토타입 체인 상에 존재하면 true로 평가되고, 그렇지 않은 경우에는 false로 평가된다.

constructor 프로퍼티와 생성자 함수 간의 연결이 파괴되어도 instanceof는 아무런 영향을 받지 않는다.

## 직접 상속

### Object.create 에 의한 직접 상속

Object.create 메서드는 명시적으로 프로토타입을 지정하여 새로운 객체를 생성한다.

Object.create 메서드도 다른 객체 생성 방식과 마찬가지로 추상 연산 OrdinaryObjectCreate를 호출한다.
