import bcrypt from 'bcrypt';

const saltRounds = 10;

export const generateSalt = () => bcrypt.genSalt(saltRounds);
