# 아묻따! 일단 리액트 시작하기!

> 1. 주제 : <아묻따! 일단 리액트 시작하기!>
> 2. 상세 내용 : 각자 리액트를 무작정 시작하며 겪은 이슈를 어떻게 트러블 슈팅했는지! + 회고!
> 3. 중점으로 공부한 사항: 자바스크립트 개념과 연결해서 리액트 이해하기

> <아묻따! 일단 리액트 시작하기!> 회고 :
>
> - 자바스크립트에서 배웠던 개념들이 희미하게 보이기 시작한다. 복습의 기회가 된 것 같아서 좋았다.
> - 아무래도 때려박기 식으로, 공식 문서를 읽으면서 정면승부를 볼려니, 이해가 되지않는 말들이 많다.
> - 바로 프로젝트를 빌드업하는 것부터 시작하니 좀 더 빠르게 리액트의 역할을 이해할 수 있었다. (컴포넌트의 관리 등)

> [리액트를 통해 다시 본 자바스크립트 개념들]
>
> 1. this 바인딩
> 2. super 키워드
> 3. ES6 module
> 4. 구조 분해 할당
> 5. class
> 6. default parameter (defaultProps없이 사용가능)

[참고 문서](https://ko.reactjs.org/tutorial/tutorial.html)

# 개요

  ## React란 무엇일까요?

  `React`는 사용자 인터페이스를 구축하기 위한 선언적이고 효율적이며 유연한
  JavaScript 라이브러리.

  `XML`: HTML과 같은 마크업 언어.

  `JSX`: JavaScript를 확장한 문법. JSX를 사용하면 React에서 HTML 요소들을 더 쉽게 쓰고 추가할 수 있다.

  ## Props를 통해 데이터 전달하기

  `Props`: Props는 데이터를 다른 컴포넌트로 전달 할 때 사용된다. props 키워드와 함께
  전달되는 데이터는 일방향으로 전달된다. 또한 props는 수정이 불가능한 read-only 값
  이다.

  ## React.Component? 

  React.Component를 extends하는 이유는 props를 유저가 정의한 클래스에 보내기 위함이다. 
  
  React 컴포넌트 class를 정의하려면 React.Component를 상속받아야 한다. 

  ## 사용자와 상호작용하는 컴포넌트 만들기

  부모 Board 컴포넌트에서 자식 Square 컴포넌트로 prop을 전달하기.

  - this의 혼란스러운 동작을 피하기 위해 일반 함수가 아닌 `화살표` 함수로 변경

  > 화살표 함수는 this 키워드를 바인딩하지 않기 때문에, 혼란스러운 오류를 줄여준다.

  ```js

  class Square extends React.Component {
    render() {
      return (
        // this의 혼란스러운 동작을 피하기 위해 화살표 함수로 변경
        <button className="square" onClick={() => alert('click')}>
          {this.props.value}
        </button>
      );
    }
  }
  ```

  `리액트에서 다시 보는 자바스크립트 개념 🐿`

  > 일반 함수, 화살표 함수 내부에서의 this 바인딩 차이

  ```js
  let me = {
    name: '람쥐',
    thisInArrow: () => {
      console.log('내 이름은 ' + this.name); // this 바인딩이 일어나지 않는다.
      // 내 이름은 undefined
    },
    thisInRegular() {
      console.log('내 이름은 ' + this.name); // this 바인딩이 일어난다.
      // 내 이름은 람쥐
    }
  };
  me.thisInArrow();
  me.thisInRegular();
  ```

  `state`: state는 app에서 조작이 가능한 객체이다. 각각의 컴포넌트들은 고유한 state를 가진다.

  `리액트에서 다시 보는 자바스크립트 개념 🐿`

  > JavaScript 클래스에서 하위 클래스의 생성자를 정의할 때 항상 super를 호출해야합니다.
  >
  > 따라서 모든 React 컴포넌트 클래스는 생성자를 가질 때 super(props) 호출 구문부터 작성해야 합니다.

  ```js
  class Animal {
    constructor(name) {
      this.name = name;
    }
  }
  // 부모 클래스를 상속
  class Ramgee extends Animal {
    constructor(name) {
      // super 키워드를 통해, 부모의 생성자를 호출.
      // super 키워드는 부모 오브젝트의 함수를 호출할 때 사용됩니다.
      super(name);
    }
  }

  let ramgee = new Ramgee('다람쥐');
  console.log(ramgee.name); // 다람쥐
  ```

- 다시 본론으로 돌아가서, 리액트 코드 살펴보기!
  
  ```js
  class Square extends React.Component {
    // ***********V 추가한 곳 V**********
    // React.Component를 상속받았기 때문에 'super'키워드를 사용해주어야 한다.
    constructor(props) {
      super(props);
      this.state = {
        // stateful 컴포넌트! 
        // 시간에 따라 동적인 데이터 
        value: null
      };
    }
    // ***********ㅅ 추가한 곳 ㅅ**********

    render() {
      return (
        // ***********V 추가한 곳 V**********
        <button className="square" 
        onClick={() => this.setState({ value: 'X' })}>
          {this.state.value}  // null
        </button>
        // ***********ㅅ 추가한 곳 ㅅ**********
      );
    }
  }
  ```

  `setState`: setState()는 컴포넌트 state를 변경해주고, 리액트한테 컴포넌트와 컴포넌트 내부의 자식을 다시 렌더링하여 업데이트해줍니다.

## 게임 완성하기

```js
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 9개의 사각형에 해당하는 9개의 null 배열을 초기 state로 설정.
      squares: Array(9).fill(null),
    };
  }
```

stateful한 컴포넌트가 필요한다면 꼭 생성자를 적어줘야 한다. 그렇지 않다면, 지워줘도 무관.

[`slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice):
얕은 복사본을 기존 배열은 수정하지 않고 새로운 배열로 배출하는 메서드

```js
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]
```
[`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) : Object.assign() 메소드는 열거할 수 있는 하나 이상의 출처 객체로부터 대상 객체로 속성을 복사할 때 사용합니다. 대상 객체를 반환합니다.

## 불변성이 왜 중요할까요? (기존 데이터는 건들이지 않고, 안전하게 복사본을 만들어 데이터 조작하기)

- 복잡한 특징들을 단순하게 만듦
- 변화를 감지함
- React에서 다시 렌더링하는 시기를 결정함

## 함수 컴포넌트

React에서 함수 컴포넌트는 더 간단하게 컴포넌트를 작성하는 방법이며 **state 없이 render 함수만을** 가집니다. 

React.Component를 확장하는 클래스를 정의하는 대신 **props를 입력받아서 렌더링할 대상을 반환하는 함수를 작성할 수 있습니다.**  

라이프 사이클링 메서드가 필요한 경우, 즉, stateful 컴포넌트가 필요한 경우, class를 사용하여 React.Component를 확장해준다. 
