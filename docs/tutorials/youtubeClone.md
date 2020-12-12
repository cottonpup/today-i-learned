# Youtube Clone With Nomad Coder

노마드 코더 튜토리얼을 보면서 유튜브를 클론합니다.

# 1 NODEJS THEORY

## 1.0 What is NodeJS

Node.js는 웹 브라우저 외부에서 JavaScript 코드를 실행하는 오픈 소스, 크로스 플랫폼, 백엔드, JavaScript 런타임이다.

## 1.1 Use Cases for NodeJS

Node.js는 거의 모든 걸 커스텀할 수 있고 상대적으로 장고, 라라벨은 기본적인 것이 갖춰져있다.

node.js를 사용하기 가장 좋은 경우는 많은 데이터를 다뤄야 할 때이다. (Ex. 리얼타임 처리, 채팅)

그러나, 바이트 단위로 데이터를 섬세하게 다뤄야 할 경우에는 적합하지 않다.

> Build from scratch! 🏗 - node.js-

## 1.2 Who Uses NodeJS

PayPal, Netflix, Uber, Likedin, Trello, New York Times..

## 2.0 What is a Server

하드웨어적 서버란 물리적으로 항상 켜져있는 컴퓨터를 의미하고, 소프트웨어적 서버는 URL에서 답, 접속을 인가, 비인가해주는 역할을 한다.

## 2.1 What is Express

Express.js는 Node.js에서 작동하는 프레임워크이다.

## 2.2 Installing Express with NPM

디렉토리 이동 `mkdir webtube`

webtube 디렉토리 안으로 이동 `cd webtube`

비주얼 스튜디오 열기 `. code`

index.js 파일 생성 후, 콘솔에 `node index.js ` 입력 후 node.js 실행

NPM.js 는 중앙 집권화된 개념인데 node.js와 관련된 모든 package를 넣어놓은 곳이다.

npm은 node.js를 다운받으면 따라온다.

`npm init`

-   Express 설치 방법

`npm install express`

npm을 실행할 때는 항상 package.json이 있는 폴더에서 실행해야만 한다.

설치를 마치고 나면 node_module폴더와 package-lock.json 파일이 추가된다.

package.json 파일에는 dependencies 관한 정보가 추가된다.

```js
  "dependencies": {
    "express": "^4.17.1"
  }
```

node_module폴더와 package-lock.json 파일은 삭제해도 무관하다. 왜냐면 콘솔에 `npm install`만 입력해주면 다시 초기화 되기 때문이다.

## 2.3 Your First Express Server

node_module 파일이 굉장히 헤비하기 때문에, .gitignore 파일을 이용해 제외시켜줄 필요가 있다.

.gitignore의 표준같은 것이 정해져있기 때문에, 표준을 참고할 수 있다.

또한 package-lock.json은 보안과 관련되 있기 때문에, 추가해주는 것이 좋다.

-   [Routing?](https://expressjs.com/en/guide/routing.html)

require은 무엇을 하는가? node module을 가져오는 것.

router와 `app.listen(4000);`을 적고 `node index.js`를 터미널에 입력해주면 localhost:4000 에 서버가 연결된다.

```js
const express = require('express');
const app = express();

app.listen(4000);
```

그러나, ^c를 눌러 서버를 죽인다면 접속이 불가능하다.

이렇게 번거롭게 `node index.js`를 터미널에 적는 것이 귀찮다면, package.json에 scripts 코드를 추가하면 된다.

```js

  "scripts": {
    "start": "node index.js"
  }
```

그러면, npm start만 적어도 명령 실행이 가능하다.

-   콜백함수를 이용하기

```js
const express = require('express');
const app = express();

function handleListening() {
    console.log('Listening on: http://localhost:4000');
}

app.listen(4000, handleListening);
```

-   더 fancy한 방법!

```js
const express = require('express');
const app = express();

const PORT = 4000;

function handleListening() {
    console.log(`Listening on: http://localhost:${PORT}`);
}

app.listen(PORT, handleListening);
```

## 2.4 Handling Routes with Express

What is GET / POST method?

GET = 단순히 페이지를 가져오는 것. (ex. 유튜브 웹 사이트 접속)

POST = 정보를 전달. (ex. 댓글 달기)

req, res

req object는 POST로 전달한 정보를 받는다. res는 정보에 응답한다.

```js
const express = require('express');
const app = express();

const PORT = 4000;

function handleListening() {
    console.log(`Listening on: http://localhost:${PORT}`);
}

function handleHome(req, res) {
    console.log(req);
    res.send('HELLOOO Home');
}

app.get('/', handleHome);

app.listen(PORT, handleListening);
```

다른 `/profile` route를 만들어서 정보 보내기

```js
const express = require('express');
const app = express();

const PORT = 4000;

function handleListening() {
    console.log(`Listening on: http://localhost:${PORT}`);
}

function handleHome(req, res) {
    console.log(req);
    res.send('HELLOOO Home');
}

function handleProfile(req, res) {
    res.send('you are on my profile');
}

app.get('/', handleHome);

app.get('/profile', handleProfile);

app.listen(PORT, handleListening);
```

## 2.5 ES6 on NodeJS using Babel
