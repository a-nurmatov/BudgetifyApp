import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import { config } from "dotenv";
import User from "../models/user.js";

config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(opts, async (jwt_payload, done) => {
    let user = await User.findOne({ email: jwt_payload.email });
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  })
);

const auth = passport.authenticate("jwt", { session: false });

export { auth };
