# test-study

## 테스트 코드 작성에 대한 전반적인 공부를 진행해보자.

## 23.01.02

- Jest를 활용한 테스트의 기본에 대하여 파악했다. test => expect를 활용한 방법과 describe => it을 활용한 테스트 세분화를 알았다.

- 또한 ts-jest, @types/jest 라이브러리를 활용하여 typscript 환경에서 jest 라이브러리를 사용하는 방법도 익혔다.

- 중요한 것은 package.json에 다음과 같이 파일 확장자 변경에 대한 명시를 해주어야한다는 것이다.

```json
  "jest": {
    "transform": {
      "^.+\\.ts$": "ts-jest"
    },
    "testRegex": "\\.test\\.ts$",
    "moduleFileExtensions": [
      "ts",
      "tsx",
      "js",
      "json"
    ],
    "globals": {
      "ts-jest": {
        "diagnostics": true
      }
    }
  }
```

jest와 ts를 함께 사용할 때 위 코드를 붙여넣는 것을 잊지말자.

- 다음에는 다양한 Matcher와 Mocking, SpyOn 기능에 대하여 알아볼 예정이다.

#### 참고 사이트

[!How To Test #1. Unit Test (feat. jest)
](https://devowen.com/427)

## 23.01.03

### Matcher

테스트 결과값을 비교해주는 Matcher의 기본에 대하여 공부했다.

- `toBe()`: 원시 타입들을 반환할 때 사용
- `toEqual()`: 원시 타입 이외의 것을 반환할 때 사용
- `toBeTruthy()`, `toBeFalsy()`: `true`나 `false`를 반환하거나 이에 견주는 값을 반환할 때 사용
- `toHaveLength()`, `toContain()`: 배열의 길이를 체크하거나 배열 혹은 객체 내부에 특정 원소가 존재하는지 여부를 체크할 때 사용
- `toMatch()`: 주어진 문자열이 정규표현식을 통과하는지 확인할 때 사용
- `toThrow()`: 예외처리를 테스트할 때 사용

### 비동기 처리

비동기 함수를 테스트하는 방법은 크게 세 가지로 나뉜다.

#### 콜백 함수 테스트

기본적인 콜백 함수를 테스트하는 방법이다.

```ts
const fetchUser = (id: string, callback: (user: IUser) => unknown) => {
  setTimeout(() => {
    console.log("calling...");
    const User: IUser = {
      id,
      name: "User" + id,
      email: id + "@gmail.com",
    };
    callback(User);
  }, 100);
};
```

위 함수를 테스트하는 코드는 다음과 같다.

```ts
test("fetch correct user", (done) => {
  fetchUser("1234", (user) => {
    expect(user).toEqual({
      id: "1234",
      name: "User1234",
      email: "1234@gmail.com",
    });
    done();
  });
});
```

> 콜백 함수를 테스트할 때 `done()` 함수를 인자로 받아와서 콜백 함수가 끝날 때 실행해주어야 jest에서 해당 코드가 비동기 함수를 테스트한다는 것을 인지하도록 해주어야한다.

#### Promise 테스트

아래는 간단한 Promise를 반환하는 코드이다.

```ts
const promiseUser = (id: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("calling...");
      const user: IUser = {
        id,
        name: "User" + id,
        email: id + "@test.com",
      };
      resolve(user);
    }, 100);
  });
};
```

promise를 `return` 해야하고, promise 내에 `resolve`와 `reject`를 둘 다 명시해주는 것이 에러를 줄이는 데에 도움이 됨을 기억하자.

위 함수를 테스트하는 코드는 아래와 같다.

```ts
test("fetch promise", () => {
  return promiseUser("1234").then((user) => {
    expect(user).toEqual({
      id: "1234",
      name: "User1234",
      email: "1234@test.com",
    });
  });
});
```

Promise를 반환하는 함수는 테스트 코드에 `return`을 꼭 추가해주어야한다. 그래야 테스트 함수가 Promise를 반환하고, Jest Runner는 반환된 Promise가 resolve될 때까지 기다리는 로직을 수행한다.

#### Async/Await 테스트

async/await을 이용한 테스트 코드는 셋 중에 가장 익숙하고 동기 코드처럼 보여지는 코드이다.

```ts
test("fetch a user", async () => {
  const user = await promiseUser("1234");
  expect(user).toEqual({
    id: "1234",
    name: "User1234",
    email: "1234@test.com",
  });
});
```
