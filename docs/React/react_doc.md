[2020-Dec-23] 리액트 기초 스터디

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

# 5. State와 생명주기
