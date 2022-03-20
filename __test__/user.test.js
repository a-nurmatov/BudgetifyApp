import app from "../app.js";
import supertest from "supertest";
import mongoose from "mongoose";
import { config } from "dotenv";

config();

describe("users", () => {
  beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("it returns 200 status code", async () => {
    const res = await supertest(app).get("/users");
    expect(res.statusCode).toEqual(200);
  });
  describe("register", () => {
    test("/signup", async () => {
      const res = await supertest(app).post("/users/signup").send({
        firstName: "Abdurahim",
        lastName: "Nurmatov",
        birthDate: new Date(),
        email: "thi@gmail.com",
        password: "1234",
        country: "Uzbekistan",
      });
      expect(res.body.message).toEqual("New user added").done();
    });
  });
});
