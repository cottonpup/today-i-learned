## script 태그를 body 최하단에 넣는 이점

자바스크립트는 DOM과 CSSOM을 동적으로 만지는 언어입니다.

스크립트 태그는 문서에 삽입된 정확한 지점에서 실행된다고 합니다. HTML 문서는 CSS처럼 Cascading 위에서 아래로 실행됩니다.

따라서 script태그가 헤더 안에 있다면 DOM이 생성되기 전에 실행되게 되고 script안에 DOM을 조작하는 코드가 있을 시 에러를 발생시킵니다.

또한 만약 많은 양의 script 태그를 헤더안에 넣을 경우, DOM 생성을 차단하고 초기 랜더링의 속도를 늦추게 됩니다. 그렇다면 유저는 HTML이 로드되기 전인 빈화면을 보게될지도 모릅니다.

HTML 파서는 스크립트 태그를 만나자마자 DOM 생성을 중지하고 자바스크립트 엔진에 제어 권한을 넘깁니다. 자바스크립트 엔진의 실행이 완료가 된 후, 브라우저가 중지했던 시점부터 DOM 생성을 재개합니다.

위에서 말했듯이 script는 DOM을 조작할 뿐만아니라 CSSOM도 조작합니다. 브라우저가 DOM을 생성했어도 Render 트리(DOM tree + CSS의 CSSOM 트리 결합)가 생성되지 않으면 브라우저는 CSSOM을 생성할 때까지 스크립
트 실행 및 DOM 생성을 지연시킵니다.

## Tl;dr 결론

> 기본적으로 모든 자바스크립트는 파서를 차단한다.

무조건적으로 항상 script 태그를 body 하단에 넣는 것이 좋은 것은 아니지만 지향해야하는 습관인 것 같습니다. 개인적인 생각이지만 CSSOM의 스타일을 변경하는 부트스트랩 혹은 API와 같은 정보를 끌어오는
script의 경우 head 태그 안에 위치하는 것이 좋은 것 같습니다.

script는 원하는 브라우저 형태에 따라 유연하게 script 태그를 위치 시키는 것은 개발자의 몫입니다. async와 같은 속성을 통해 브라우저에게 신호를 알려줄 수도 있습니다.

## 그 외 script 태그에 관하여

## script 태그의 속성으로 동적 변경이 가능하다.

http://tcpschool.com/html-tags/script

## async 키워드?

async 키워드를 스크립트 태그에 추가하면, 스크립트가 사용 가능해질 때까지 기다리는 동안 DOM 생성을 차단하지 말라고 브라우저에 지시하는 것입니다. 이 경우 성능이 크게 향상됩니다.

## 외부 자바스크립트 파일 vs 인라인 자바스크립트 파일

보통 가독성을 위해 외부 자바스크립트 파일을 사용하지만, 외부 자바스크립트 파일의 경우 브라우저가 일시 중지하고 디스크, 캐시 또는 원격 서버에서 스크립트를 가져올 때까지 기다려야 합니다. 이로 인해 주요
렌더링 경로에 수십~수천 밀리초의 지연이 추가로 발생할 수 있다는 것을 명심해야합니다.

## reference

[script 태그의 위치](https://velog.io/@takeknowledge/script-%ED%83%9C%EA%B7%B8%EB%8A%94-%EC%96%B4%EB%94%94%EC%97%90-%EC%9C%84%EC%B9%98%ED%95%B4%EC%95%BC-%ED%95%A0%EA%B9%8C%EC%9A%94)

[파서 차단 대 비동기 자바스크립트](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript)
