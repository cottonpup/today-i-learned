[2020-Dec-23] 리액트 기초 스터디

> 스터디 활동을 통해 리액트 공식 문서를 공부합니다. 공부하면서 배운 점들을 기록
> 합니다.

# 1. Hello World

```html
<div id="root"></div>
```

```js
ReactDOM.render(<h1>Hello, world!</h1>, document.getElementById('root'));
```

# 2. JSX 소개

## JSX 란?

JSX라 하며 JavaScript를 확장한 문법입니다. JSX를 사용하면 React에서 HTML 요소들
을 더 쉽게 쓰고 추가할 수 있습니다.

## JSX에 표현식 포함하기

중괄호로 감싸 사용하면, JSX의 중괄호 안에는 유효한 모든 JavaScript 표현식을 넣을
수 있습니다. 자동 세미콜론 삽입을 피하고자 괄호로 묶는 것을 권장합니다.

## JSX도 표현식 입니다.

if 구문 및 for loop 안에 사용하고, 변수에 할당하고, 인자로서 받아들이고, 함수로
부터 반환할 수 있습니다.

## JSX 속성 정의

속성에 따옴표를 이용해 문자열 리터럴을 정의할 수 있습니다. 중괄호를 사용하여 어
트리뷰트에 JavaScript 표현식을 삽입할 수도 있습니다.

> JSX는 HTML보다는 JavaScript에 가깝기 때문에, React DOM은 HTML 어트리뷰트 이름
> 대신 camelCase 프로퍼티 명명 규칙을 사용합니다.
>
> 예를 들어, JSX에서 class는 className가 되고 tabindex는 tabIndex가 됩니다.

## JSX로 자식 정의

태그가 비어있다면 XML처럼 /> 를 이용해 바로 닫아주어야 합니다.

JSX 태그는 자식을 포함할 수 있습니다.

```js
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

## JSX는 주입 공격을 방지합니다

JSX에 사용자 입력을 삽입하는 것은 안전합니다.

```js
const title = response.potentiallyMaliciousInput;
// 이것은 안전합니다.
const element = <h1>{title}</h1>;
```

기본적으로 React DOM은 JSX에 삽입된 모든 값을 렌더링하기 전에 이스케이프 하므로,
애플리케이션에서 명시적으로 작성되지 않은 내용은 주입되지 않습니다. 모든 항목은
렌더링 되기 전에 문자열로 변환됩니다. 이런 특성으로 인해 XSS
(cross-site-scripting) 공격을 방지할 수 있습니다.

## JSX는 객체를 표현합니다.

Babel은 JSX를 React.createElement() 호출로 컴파일합니다.

# 3. 엘리먼트 렌더링

브라우저 DOM 엘리먼트와 달리 React 엘리먼트는 일반 객체이며(plain object) 쉽게생
성할 수 있습니다. React DOM은 React 엘리먼트와 일치하도록 DOM을 업데이트합니다 .

## DOM에 엘리먼트 렌더링하기

HTML 파일 어딘가에 <div>가 있다고 가정해 봅시다.

이 안에 들어가는 모든 엘리먼트를 React DOM에서 관리하기 때문에 이것을 “루트
(root)” DOM 노드라고 부릅니다.

React 엘리먼트를 루트 DOM 노드에 렌더링하려면 둘 다 ReactDOM.render()로 전달하면
됩니다.

# 4. Component와 Props

개념적으로 컴포넌트는 JavaScript 함수와 유사합니다. “props”라고 하는 임의의 입력
을 받은 후, 화면에 어떻게 표시되는지를 기술하는 React 엘리먼트를 반환합니다.

## 함수 컴포넌트와 클래스 컴포넌트

함수 컴포넌트

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

클래스 컴포넌트

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

## 컴포넌트 렌더링

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// React 엘리먼트는 사용자 정의 컴포넌트로도 나타낼 수 있다.
const element = <Welcome name="Sara" />;
// 주의: 컴포넌트의 이름은 항상 대문자로 시작합니다.
// <Welcome />은 컴포넌트를 나타내며 범위 안에 Welcome이 있어야 합니다.
ReactDOM.render(element, document.getElementById('root'));
```

React가 사용자 정의 컴포넌트로 작성한 엘리먼트를 발견하면 JSX 어트리뷰트와 자식
을 해당 컴포넌트에 단일 객체로 전달합니다. 이 객체를 “props”라고 합니다.

1. `<Welcome name="Sara" />`엘리먼트로 `ReactDOM.render()`를 호출합니다.
2. React는 `{name: 'Sara'}`를 props로 하여 Welcome 컴포넌트를 호출합니다.
3. Welcome 컴포넌트는 결과적으로 `<h1>Hello, Sara</h1>` 엘리먼트를 반환합니다.
4. React DOM은 `<h1>Hello, Sara</h1>` 엘리먼트와 일치하도록 DOM을 효율적으로 업
   데이트합니다.

## 컴포넌트 합성

컴포넌트는 자신의 출력에 다른 컴포넌트를 참조할 수 있습니다.

React 앱에서는 버튼 , 폼, 다이얼로그, 화면 등의 모든 것들이 흔히 컴포넌트로 표현
됩니다.

예를 들어 Welcome을 여러 번 렌더링하는 App 컴포넌트를 만들 수 있습니다.

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
// Hello, Sara
// Hello, Cahal
// Hello, Edite
```

## 컴포넌트 추출

여러 번 사용되거나, UI 일부가 자체적으로 복잡한 경우에는, 별도의 컴포넌트로 만드
는 게 좋습니다.

```js
function formatDate(date) {
  return date.toLocaleDateString();
}

function Avatar(props) {
  return (
    <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />
  );
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">{props.user.name}</div>
    </div>
  );
}

function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}

const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'https://placekitten.com/g/64/64'
  }
};
ReactDOM.render(
  <Comment date={comment.date} text={comment.text} author={comment.author} />,
  document.getElementById('root')
);
```

## props는 읽기 전용입니다.

모든 React 컴포넌트는 자신의 props를 다룰 때 반드시 **순수 함수**처럼 동작해야합
니다.

```js
// 순수 함수!
function sum(a, b) {
  return a + b;
}

// 순수 함수가 아님!
function withdraw(account, amount) {
  account.total -= amount;
}
```

# 5. State와 생명주기

## 함수에서 클래스로 변환하기

```js
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

## 클래스에 로컬 State 추가하기

컴포넌트의 State란? State란 app에서 변경할 수 있는 객체를 뜻합니다. 각각의 컴포
넌트는 이러한 State를 가질 수 있습니다. State 객체가 변경될 때마다, 컴포넌트는다
시 렌더링됩니다.

클래스 컴포넌트는 항상 props로 기본 constructor를 호출해야 합니다.

## 생명주기 메서드를 클래스에 추가하기

### 생명주기 메서드

`마운팅`: 리액트가 처음으로 컴포넌트를 렌더링하려고 했을 때, 코드에 따라 초기
DOM을 만드는 것을 뜻합니다.

`언마운팅`: 생명주기에 있어서 컴포넌트가 DOM에서 제거될 때를 뜻합니다. 리액트는
컴포넌트를 언마운팅 할 때, 오직 한개의 빌트인 메서드인
`componentWillUnmount()`를 호출합니다.

## State를 올바르게 사용하기

1. 직접 State를 수정하지 않는다. 대신 `setState()`를 사용한다.
   - this.state를 지정할 수 있는 유일한 공간은 바로 constructor이다.
2. State 업데이트는 비동기적일 수도 있습니다.

   - this.props와 this.state가 비동기적으로 업데이트될 수 있기 때문에 다음 state
     를 계산할 때 해당 값에 의존해서는 안 됩니다.

     이를 위해서, 객체보다는 함수를 인자로 사용하는 다른 형태의 setState()를 사
     용합니다.

3. State 업데이트는 병합됩니다

## 데이터는 아래로 흐릅니다

> 2020.Dec.23일 `스터디 완료`
>
> [진행 내용: 기초 학습 및 Props, State 활용하여 컴포넌트 구현]
>
> <다음주 과제> [벨로퍼트 git book](https://react.vlpt.us/)을 참고하여 15Ch까지
> 프로젝트 구현해보기



# 벨로퍼트 git book - 제 1장

## 01. 리액트는 어쩌다 만들어졌을까?

리액트는 아예 다 날려버리고 처음부터 모든걸 새로 만들어서 보여준다면 어떨까? 라
는 아이디어에서 개발이 시작되었습니다.

> React allows developers to create large web applications that can change data,
> without reloading the page

리액트에서는 _Virtual DOM_ 이라는 것을 사용해서 이를 가능케 했습니다.

_Virtual DOM_ 은 그냥 메모리에 가상으로 존재하는 DOM 으로서 그냥 JavaScript 객체
이기 때문에 작동 성능이 실제로 브라우저에서 DOM 을 보여주는 것 보다 속도가 훨씬
빠릅니다.

## 03.
