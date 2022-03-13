import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import { config } from "dotenv";
import users from "../models/database.js";

config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(opts, (jwt_payload, done) => {
    let user = users.find((user) => user.email === jwt_payload.email);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  })
);

const auth = passport.authenticate("jwt", { session: false });

export { auth };
