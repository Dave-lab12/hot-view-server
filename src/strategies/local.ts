import passportLocal from 'passport-local';
import passport from 'passport';
import { Express } from 'express';

import { getUserData, getUserDataFromId } from '../models/auth';

const LocalStrategy = passportLocal.Strategy;

const customFields = {
  usernameField: 'email',
  passwordField: 'password',
};

const verifyCallback = async (
  username: string,
  password: string,
  done: (
    // eslint-disable-next-line no-unused-vars
    error: unknown,
    // eslint-disable-next-line no-unused-vars
    user?: unknown,
    // eslint-disable-next-line no-unused-vars
    options?: passportLocal.IVerifyOptions | undefined
  ) => void
) => {
  try {
    const getCredentials = await getUserData({ email: username, password });

    if (!getCredentials.success) {
      return done(null, false, { message: getCredentials.message as string });
    }
    return done(null, getCredentials);
  } catch (error) {
    return done(error);
  }
};
const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user: Express.User, done) => {
  try {
    const getUser = await getUserDataFromId(user?.data?.id as string);
    if (getUser.success) {
      done(null, getUser as Express.User);
    }
  } catch (error) {
    done(error);
  }
});
