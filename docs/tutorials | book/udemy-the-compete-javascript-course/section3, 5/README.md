# N.89

Paradigm: An approach and mindset of structuring code, which will direct your coding style and technique.

## First-class function

In a language with first-class functions, functions are simply treated as variables. We can pass them into other functions, and return them from functions.

EX) `overlay.addEventListener('click', closeModal);`

## Dynamic

Dynamically-typed lang. No data type definitions.

Types becomes known at runtime. Data type of variable is automatically changed.

Ex) `let x = 23; x = 'hello;'`

타입스크립트의 존재 이유 ^\_\_^;;

## Single-threaded

### Concurrency Model

How the Javascript engine handles multiple tasks happening at the same time.

### Why do we need that?

Javascript runs in one single thread.

### So what about a long-running task?

Sounds like it would block the single thread. However, we want non-blocking bahavior.

### How do we achieve that?

By using an **event loop**, takes long running takes, executes them in the background and puts them back in the main thread once they are finished.

## Non-blocking event loop

---

---

# 90

Call Stack: Where our code is executed. (Execution context)

Heap: Where objects are stored. (Object in memory)

Compilation: Entire code is converted into machine code at once and written to a binary file that can be executed by a computer.

Interpretation: Interpreter runs through the source code and executes it line by line.

Modern javascript use a mix between compilation and interpretation which is called **just-in-time(JIT)** compilation. Entire code is converted into machine code at once, then executed immediately.
It's a lot faster than just executing code.

`Parsing > Compilation > Execution`

In the background, this code is being optimized and recompiled during the already running program execution. (Happens in special threads what we can't access from code) During the parsing process, the
code is parsed into a data structure called the abstract syntax tree or AST.

Javascript is an interpreted language. NOPE

**WEB APIs are functionalities provided to the engine, accessible on window object. They are not part of the javascript lang itself.**

Callback queue : Callback function from DOM event listener ('click'). 이 모든 것은 event loop에 의해 일어난다. 즉, 이벤트 루프는 콜백 큐로부터 콜백 함수를 콜 스택에 넣는다. 그 후 실행이 되는 것이다.

# 91
