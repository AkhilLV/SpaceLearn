// eslint-disable-next-line import/no-extraneous-dependencies
const { randEmail, randFullName } = require("@ngneat/falso");

// const user = { email: randEmail(), name: randFullName() };

// const emails = randEmail({ length: 10 });

// console.log(user);
// console.log(emails);

const seedTable = (tableName) => {

}

seedTable("users", {
  usernames: randFullName({ length: 10 }),
  passwords:
});
