const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("./models-setup").models;
const bcrypt = require("bcrypt");
const errors = require("./errors");

const verifyUser = async (username, password, done) => {
    const incorrectFlash = {
        message: errors.UsernamePasswordIncorrect(),
    };
    const user = await User.findOne({
        where: { username },
    });
    if (!user) return done(null, false, incorrectFlash);
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) return done(null, user);
    done(null, false, incorrectFlash);
};

const localStrategy = new LocalStrategy({}, verifyUser);

const setupPassport = () => {
    passport.use(localStrategy);
    passport.serializeUser((user, done) => {
        const { id } = user;
        done(null, id);
    });
    passport.deserializeUser(async (id, done) => {
        const user = await User.findByPk(id);
        done(null, user);
    });
};

module.exports = {
    setupPassport,
    localStrategy,
};
