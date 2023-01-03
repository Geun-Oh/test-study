import { fetchUser, promiseUser } from "../src/async";

describe("fetch a user", () => {
  it("fetch correct user", (done) => {
    fetchUser("1234", (user) => {
      expect(user).toEqual({
        id: "1234",
        name: "User1234",
        email: "1234@gmail.com",
      });
      done();
    });
  });

  it("fetch promise", () => {
    return promiseUser("1234").then((user) => {
      expect(user).toEqual({
        id: "1234",
        name: "User1234",
        email: "1234@test.com",
      });
    });
  });

  it("fetch a user", async () => {
    const user = await promiseUser("1234");
    expect(user).toEqual({
      id: "1234",
      name: "User1234",
      email: "1234@test.com",
    });
  });
  //   it("fetch wrong user", (done) => {
  //     fetchUser("2", (user) => {
  //       expect(user).toEqual({
  //         id: "3",
  //         name: "User3",
  //         email: "3@gmail.com",
  //       });
  //       done();
  //     });
  //   });
});
