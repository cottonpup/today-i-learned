# textContent vs innerText vs innerHTML

# .innerHTML

### - 반환 값 

HTML 마크업 언어도 포함하여 반환된다. 개발자가 작성한 그대로 formatting을 고려하여 줄바꿈, 스페이스를 포함한 문자열이 출력이 된다. 

### - 사용 용도 

HTML 마크업 언어, 그리고 요소들이 정확히 무엇을 포함하고 있는 지 확인하고 싶을 때 사용된다.

### - 추가 노트

만약 텍스트 안에 `&`, `<`, `>` 를 포함하고 있다면, innerHTML은 `&amp;`, `$lt;`, `&gt`를 반환한다.

### - `&amp;`, `$lt;`, `&gt` 문자를 포함하는 텍스트 노드를 자식으로 갖고있다면?

`.innerHTML` 이 아닌 텍스트 노드 내용의 원본을 복사할 수 있는 `.textContent`를 사용하는 것이 더 바람직하다. 요소의 내용을 변경하는 대신 HTML을 문서에 삽입할려면 `.insertAdjacentHTML()` 를 사용하길 추천한다.

# .innerText

### - 반환 값 

태그 안의 문자열을 반환한다. 이는 렌더링 된 텍스트 콘텐츠 노드라고 보는 것이 좋다. *`.innerText` 는 스타일링과 CSS를 고려한다.* 쉽게 생각해보면 유저가 텍스트를 긁어서 복사 붙여넣기 한 값이라고 보면 쉽다. 따라서 줄바꿈, 스페이스과 같은 formatting은 고려하지 않는다.

### - 사용 용도 

포맷화가 전혀 되지 않은 요소가 필요할 때 사용하면 된다.

### - 추가 노트

innerText는 순수 텍스트의 콘텐츠 값을 가져온다. innerHTML은 HTML 포맷에서 같은 콘텐츠 값을 가져온다. 

# .textContent

### - 반환 값 

`<script>`와 `<style>` 요소를 포함한 모든 요소의 콘텐츠를 가져온다. formatting을 고려하여 줄바꿈, 스페이스를 포함한 문자열이 출력이 된다. 

### - 사용 용도 

`style` 를 포함한 요소들에 무엇이 있는지 보고싶을 때 사용하면 된다. 

### - 추가 노트

innerText와 textContent는 매우 비슷하다. 그러나, 매우 중요한 차이는 존재한다. 간단하게, innerText는 렌더링된 text를 인식하고, textContent는 그렇지 않다. 

----
``` HTML
* getValue.innerHTML *
This element is <strong>strong</strong> and has    some super fun <code>code</code>!

* getValue.innerText *
This element is strong and has some super fun code!

* getValue.textContent *
This element is strong and     has some super fun code!
```
----

# 결론 

`textContent`를 사용할 수 있는 경우에는 이를 지향해야겠다. `textContent`는 모든 요소의 콘텐츠를 가져온다는 장점뿐만 아니라, XSS 공격의 위험 또한 없다. 

### XSS?

XSS란 클라이언트 사이드에 악성 스크립트를 추가하는 악의적인 보안 공격이다. 웹 상에서 가장 기초적인 취약점 공격방법의 일종이다. 

# Reference 

[MDN textContent](https://developer.mozilla.org/ko/docs/Web/API/Node/textContent#innerText%EC%99%80%EC%9D%98_%EC%B0%A8%EC%9D%B4%EC%A0%90)

[Medium whats the best?](https://medium.com/better-programming/whats-best-innertext-vs-innerhtml-vs-textcontent-903ebc43a3fc)

[Cross-site scripting](https://developer.mozilla.org/ko/docs/Glossary/Cross-site_scripting)

[XSS 공격](https://brownbears.tistory.com/250)