# 클래스

# getter와 setter

encapsulation: 유저가 데이터를 외부에서 수정하지 못하게 중요한 데이터를 보존, 보호하는 방법.

리터럴을 사용해 만든 객체처럼 클래스도 getter나 setter, 계산된 프로퍼티(computed property)를 포함할 수 있습니다.

getter와 setter을 정의하는 순간, 메모리에 할당되어 있는 값을 불러올 때는 getter를 부르고 메모리에 할당할 때는 setter를 불러온다.

```js
get age(){
    return this._age;
    // getter와 setter내에서 사용하는 변수의 이름을 다르게 만들어줘야 한다.
}
```

# pubic vs private `실험적 기능`

```js
class Experiment {
    publicField = 2; // 2
    #privateField = 0; // undefined
}
```

# static `실험적 기능`

class 자체의 변수, 함수

```js
class Article {
    static publisher = 'Dream coding';
    constructor(articleNumber) {
        this.articleNumber = articleNumber;
    }

    static printPublisher() {
        console.log(Article.publisher);
    }
}

const article1 = new Article(1);
console.log(article1.publisher); // undefined
console.log(Article.publisher); // Dream Coding
```

# extends 키워드

```js
class Shape {
    constructor(width, height, color) {
        this, (width = width);
        this.height = height;
        this.color = color;
    }

    draw(){
        console.log(`drawing ${this.color} color!`);
    }

    getArea(){
        return this.width * this.height;
    }

    class Rectangle extends Shape{}
    class Triangle extends Shape{
        draw(){
            super.draw(); // 부모의 메서드도 함께 호출
            console.log('🔺');
        }

        getArea(){
            return (this.width * this.height)/2;
        }

        toString(){
            return `Triangle: color: ${this.color}`
        }
    }
}

const rectangle = new Rectangle(20, 20, 'blue');
rectangle.draw();
console.log(rectangle.getArea());
const triangle = new Triangle(20, 20, 'red');
```

# instanceof

위 예제 instanceof로 class 체크하기

```js
console.log(rectangle instanceof Rectangle); // true
console.log(triangle instanceof Rectangle); // false
console.log(triangle instanceof Triangle; // true
console.log(triangle instanceof Shape); // true
console.log(triangle instanceof Object); // true
```
