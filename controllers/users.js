import database from "../data/usersData.js";
const users = database.users;

const setUser = (req, res, next) => {
  const userId = req.body.id;
  if (userId) req.user = users.find((user) => user.id == userId);
  next();
};

const getAllUsers = (req, res) => res.send(users);

const createUser = (req, res) => {
  let id = users.length;
  users.push({ ...req.body, id });
  res.send(
    `User with id# ${id} added to mock data check with get request to http://localhost:5000/users`
  );
};

const getUser = (req, res) => {
  let { id } = req.params;
  let foundedUser = users.find((user) => user.id == id);
  res.render("userDashboard", foundedUser);
};

const deleteUser = (req, res) => {
  let { id } = req.params;
  let foundedUser = users.find((user) => user.id == id);
  if (users.indexOf(foundedUser) >= 0)
    users.splice(users.indexOf(foundedUser), 1);
  res.send(
    `User with id# ${id} deleted to mock data check with get request to http://localhost:5000/users`
  );
};

const updateUser = (req, res) => {
  let { id } = req.params;
  let foundedUser = users.find((user) => user.id == id);
  let { firstName, lastName, email, age, birthDate } = req.body;

  if (firstName) foundedUser.firstName = firstName;
  if (lastName) foundedUser.lastName = lastName;
  if (email) foundedUser.email = email;
  if (age) foundedUser.age = age;
  if (birthDate) foundedUser.birthDate = birthDate;
  res.send(
    `User with id# ${id} updated, check with get request to http://localhost:5000/users`
  );
};

export { getAllUsers, createUser, getUser, deleteUser, updateUser, setUser };
