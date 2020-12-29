# freeCodeCamp - React

# JSX안에서 자바스크립트 코드를 적을 때는 컬리 브라켓으로 감싸준다.

# stateless function 이름은 항상 대문자로 시작 

# 리액트에서의 생성자 작성 이유

In React, constructors are mainly used for two purposes: It used for initializing the local state of the component by assigning an object to this. state. It used for binding event handler methods that occur in your component.

# 렌더링 전달 값
랜더링을 위해 리액트 컴포넌트를 전달할 때는, <> 컨테이너를 사용해 닫아주어야 하고, JSX 엘리먼트를 전달할 때는, 이름만 전달이 가능하다. 

# defaultProps

defaultProps를 통해서 props의 디폴트 값을 지정할 수 있다. 

# propTypes: 리액트 컴포넌트의 props에 대해서 런타임 환경에서 타입을 지정할 수있다.

`import PropTypes from "prop-types"`
실행 전, prop-types 패키지에서 PropTypes를 임포트해야한다. 

`ex) MyComponent.propTypes = { handleClick: PropTypes.func.isRequired }`

속성은 소문자로 시작하는 `propTypes`이고, 객체는 대문자로 시작하는 `PropTypes`임을 잊지 말아야 한다. 

# Stateful and Stateless Components in React

stateless functional component: a class that extends React.Component, but does not use internal state

stateful component:  a class component that does maintain its own internal state.

<img width="647" alt="Screen Shot 2020-12-29 at 5 28 59 PM" src="https://user-images.githubusercontent.com/67526014/103270505-6d0b2d00-49fb-11eb-8678-940276f2267a.png">

# state 

state: 생성자 안에서 state를 선언할 수 있다. state를 선언하기 위해서는 class 컴포넌트가 반드시 React.Component를 extend 해야한다. 
``` js
// How to declare a state
this.state = {
  // describe your state here
}
```

# virtual DOM

virtual DOM: tracking of changes behind the scenes.

# this 키워드 없이, state render하기 

render 메서드에서 state 데이터에 접근하기: `this.state`로 접근가능

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'freeCodeCamp'
    }
  }
  render() {
    const name = this.state.name;
    return (
      <div>
        { /* Change code below this line */ }
         <h1>{name}</h1>
        { /* Change code above this line */ }
      </div>
    );
  }
};
```

# setState()

setState: state를 업데이트하는 메서드

컴포넌트 안에서 `this.setState()` 식으로 `key, value를 가진 객체`를 전달하여 사용할 수 있다. 

key는 state 프로퍼티를, value는 업데이트 할 state 데이터를 적는다. 

리액트에서는 절대 state를 직접적으로 변경할 수 없고 `this.setState()`메서드를 활용해야 한다. 

따라서 이는 비동기적일 수 있다. 이 문제를 우회할 수 있는 문법이 존재하나, 필요할 일은 매우 적다. 

