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