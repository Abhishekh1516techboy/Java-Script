import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "./models/User.js";

// passport Local Strategy
passport.use(
    new LocalStrategy(async (username, password, done) => {
      // Authentication logic
      try {
        const user = await User.findOne({ userName: username });
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
  
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
          return done(null, false, { message: "Incorrect password" });
        }
  
        return done(null, user); // if Password matched return user
      } catch (err) {
        return done(err);
      }
    })
  );

  export default passport;