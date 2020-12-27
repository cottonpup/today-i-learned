> 1.  주제 : <아묻따! 일단 리액트 시작하기!>
> 2.  상세 내용 : 각자 리액트를 무작정 시작하며 겪은 이슈를 어떻게 트러블 슈팅했는지! + 회고!

[참고 문서](https://ko.reactjs.org/tutorial/tutorial.html)

# 개요

## React란 무엇일까요?

React는 사용자 인터페이스를 구축하기 위한 선언적이고 효율적이며 유연한 JavaScript 라이브러리.

XML: HTML과 같은 마크업 언어.

createElement(): JSX로 작성하는 경우, React.createElement()를 직접 호출하는 일은 거의 없다.

JSX: JSX 는 리액트 내 HTML 요소들을 조작할 수 있게 해준다. JSX는 강력하며 내부의 중괄호 안에 어떤 JavaScript 표현식도 사용할 수 있다. 

## Props를 통해 데이터 전달하기

Props: Props는 데이터를 다른 컴포넌트로 전달 할 때 사용된다. props 키워드와 함께 전달되는 데이터는 일방향으로 전달된다. 또한 props는 수정이 불가능한 read-only 값이다. 

## 사용자와 상호작용하는 컴포넌트 만들기

부모 Board 컴포넌트에서 자식 Square 컴포넌트로 prop을 전달하기. 

- this의 혼란스러운 동작을 피하기 위해 일반 함수가 아닌 화살표 함수로 변경
  
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

- **`리액트에서 다시 보는 자바스크립트 개념 🐿`**

> 일반 함수, 화살표 함수 내부에서의 this 바인딩 차이

``` js
let me = { 
 name: "람쥐", 
 thisInArrow:() => { 
 console.log("내 이름은 " + this.name); // this 바인딩이 일어나지 않는다.
 }, 
 thisInRegular(){ 
 console.log("내 이름은 " + this.name); // this 바인딩이 일어난다. 
 } 
};
me.thisInArrow(); 
me.thisInRegular();
```

state: state는 app에서 조작이 가능한 객체이다. 각각의 컴포넌트들은 고유한 state를 가진다.  

- **`리액트에서 다시 보는 자바스크립트 개념 🐿`**

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
console.log(ramgee.name);

```

```js
class Square extends React.Component {

// *********** 추가한 곳 **********
// React.Component를 상속받았기 때문에 'super'키워드를 사용해주어야 한다. 
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
// *********** 추가한 곳 **********

  render() {
    return (
      // *********** 추가한 곳 **********
      <button className="square" onClick={() => this.setState({value: 'X'})}>
        {this.state.value}
      </button>
      // *********** 추가한 곳 **********
    );
  }
}
```

컴포넌트에서 setState를 호출하면 React는 자동으로 컴포넌트 내부의 자식 컴포넌트 역시 업데이트합니다.

setState: setState()는 컴포넌트 state를 변경해주고, 리액트한테 컴포넌트와 컴포넌트 내부의 자식을 다시 렌더링하여 업데이트해줍니다. 

# 게임 완성하기

# 시간 여행 추가하기