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