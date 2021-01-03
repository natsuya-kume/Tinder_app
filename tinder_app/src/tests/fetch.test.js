const axios = require("axios");

function fetchData(n) {
  return axios.get(
    "https://my-json-server.typicode.com/natsuya-kume/user_data/users/" + n
  );
}

test("the res.data.id id is 3", () => {
  expect.assertions(1);
  return fetchData(3).then((res) => {
    expect(res.data.id).toBe("3");
  });
});
