import passportLocal from 'passport-local';
import passport from 'passport';

import { getUserData, getUserDataFromId } from '../models/auth';

const LocalStrategy = passportLocal.Strategy;

const customFields = {
  usernameField: 'email',
  passwordField: 'password',
};

const verifyCallback = async (
  username: string,
  password: string,
  // eslint-disable-next-line no-unused-vars
  done: (err: unknown, id?: unknown) => void
) => {
  try {
    const getCredentials = await getUserData({ email: username, password });

    if (!getCredentials.success) {
      done(null, false);
    }
    done(null, getCredentials);
  } catch (error) {
    done(error);
  }
};
const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  done(null, user.data.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const getUser = await getUserDataFromId(userId as string);
    if (getUser.success) {
      done(null, getUser?.data);
    }
  } catch (error) {
    done(error);
  }
});
