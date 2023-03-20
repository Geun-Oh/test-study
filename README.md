# test-study

## 테스트 코드 작성에 대한 전반적인 공부를 진행해보자.

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

### Mocking

jest 테스트를 할 때 타 라이브러리를 직접 불러올 소요 없이 해당 부분의 함수를 가짜로 제작할 수 있도록 하는 jest의 기능이다.

#### jest.fn()

jest는 가짜 함수를 생성할 수 있도록 `jest.fn()` 함수를 제공한다. 이 함수는 기본 함수와 동일하게 인자를 넘겨 호출할 수 있다.


```ts
const mockfn = jest.fn();

test("test mocking function", () => {
    expect(mockfn()).toBe(undefined);
});
```

이와 같이 함수를 임시적으로 생성할 수 있다. 함수의 기본 반환값은 `undefined`이다.

#### mockReturnValue

mocking으로 생성한 함수의 반환값을 지정해줄 수 있는 메서드이다. 다음과 같이 사용한다.

```ts
const mockfn2 = jest.fn();
mockfn2.mockReturnValue("left and right");

test("test mockReturnValue", () => {
    expect(mockfn2()).toBe("left and right");
});
```

이와 같이 생성한 함수의 반환값을 지정해줄 수 있다.

#### mockImplementation

이번에는 생성한 함수를 직접 구현할 수 있는 메서드이다. 다음과 같이 사용한다.

```ts
const mockfn3 = jest.fn();
mockfn3.mockImplementation((name) => `My name is ${name}!`);

test("test mockImplementation", () => {
    expect(mockfn3("geun")).toBe("My name is geun!");
});
```

이와 같이 함수의 내부 로직을 직접 구현할 수 있다.

#### 이외의 메서드

이외에도 jest는 함수에 대한 다양한 관찰을 진행하고 있기 때문에 함수가 실행된 횟수나 특정 인자가 입력되었는지 여부 등을 확인할 수 있다.

```ts
mockfn3("annie");
mockfn3("more");
test("mockfn3 toBeCalledLikethis", () => {
    expect(mockfn3).toBeCalledTimes(2);
    expect(mockfn3).toBeCalledWith("annie");
    expect(mockfn3).toBeCalledWith("more");
})
```

이처럼 사용하여 함수가 코드 내에서 용도에 맞게 사용되고 있는지 확인할 수 있다.

#### spy.On()

jest mocking에는 `스파이(spy)`라는 개념이 존재한다. 이는 특정 객체에 속한 함수의 구현을 가짜로 구현해내지 않고 호출 여부 및 호출 방법만을 알아낼 때 사용된다.

```ts
const calculator = {
    hello: () => console.log("hello everyone!")
}

const spyfn = jest.spyOn(calculator, "hello")

test("Let's test spyOn", () => {
    expect(spyfn).toBeCalledTimes(1)
})
```

위의 코드처럼 spyOn() 메서드를 사용하여 calculator 객체 내의 함수 hello을 몰래 확인하는 스파이를 붙인다. 이를 통해 해당 함수가 얼마나 호출되었고, 어떤 인자를 넘겨받았는지 알 수 있다.

### 테스트 작성하기

지금까지 알아본 `jest.fn()`과 `jest.spyOn()`을 통해 어떻게 테스트를 작성할 수 있을지 살펴보자.

```ts
import axios from 'axios';

const URL = "https://jsonplaceholder.typicode.com";

export const findOne = (id: string | number) => {
    return axios
    .get(`${URL}/users/${id}`)
    .then((res) => res.data)
}
```

우선 이처럼 간단한 API 함수를 만든다.

그 다음 해당 API 함수를 테스트하는 테스트 코드를 다음과 같이 짤 수 있다.

```ts
import axios from "axios";
import { findOne } from "../src/apiCall";

test("findOne fetches data from the API endpoint", async () => {
    const spyGet = jest.spyOn(axios, "get");
    await findOne(1);
    expect(spyGet).toBeCalledTimes(1);
    expect(spyGet).toBeCalledWith(`https://jsonplaceholder.typicode.com/users/1`)
})
```

위 처럼 간단하게 `axios` 객체 내에 `get` 메서드에 대한 정보를 훔칠 수 있다.

그러나 이는 불러오는 API에 의존하는 형태이기 때문에, 다음과 같은 테스트 코드 작성 원칙에 위배된다.

> 테스트가 deterministic 해야 한다(언제 실행되든 항상 같은 결과를 내야 한다)

그러므로 사용하는 `axios.get`함수를 가짜로 구현하여 항상 안정적인 결과를 반환할 수 있도록 해주어야 한다.

```ts
import axios from "axios";
import { findOne } from "../src/apiCall";

test("findOne fetches data from the API endpoint", async () => {
  axios.get = jest.fn().mockResolvedValue({
    data: {
      id: 1,
      name: "geun Oh",
    },
  });

  const spyGet = jest.spyOn(axios, "get");
  const getData = await findOne(1);
  expect(spyGet).toBeCalledTimes(1);
  expect(spyGet).toBeCalledWith(`https://jsonplaceholder.typicode.com/users/1`);
  expect(getData).toHaveProperty("id", 1);
  expect(getData).toHaveProperty("name", "guen Oh");
});
```

위의 코드처럼 테스트하는 입장에서 의존성이 있고 통제가 불가한 부분을 mocking을 통해 외부 환경에 의존하지 않고 얼마든지 독립적으로 테스트를 작성할 수 있다.