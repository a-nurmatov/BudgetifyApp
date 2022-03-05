const ROLE = {
  ADMIN: "admin",
  BASIC: "basic",
};

const database = {
  ROLE: ROLE,
  users: [
    {
      id: 0,
      role: ROLE.ADMIN,
      firstName: "Abdurahim",
      lastName: "Nurmatov",
      country: "Uzbekistan",
      birthDate: new Date().getTime(),
      age: 24,
      email: "nurmatovrahimjon@gmail.com",
    },
    {
      id: 1,
      role: ROLE.BASIC,
      firstName: "Ilhom",
      lastName: "Tohirov",
      country: "Uzbekistan",
      birthDate: new Date().getTime(),
      age: 24,
      email: "ilhom@gmail.com",
    },
  ],
};

export default database;
