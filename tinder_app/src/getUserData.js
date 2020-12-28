let faker = require("faker");

let db = {
  users: [],
};

for (let i = 1; i < 6; ++i) {
  db.users.push({
    id: i,
    name: faker.name.firstName(),
    age: faker.random.number(35),
    profile_image: "https://joeschmoe.io/api/v1/random",
    self_introduction: faker.lorem.sentence(),
  });
}

console.log(JSON.stringify(db));
