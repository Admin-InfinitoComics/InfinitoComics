import jwt from 'jsonwebtoken';
import Account from '../models/User.js';
import config from '../config/server-config.js';


export const authenticate = async (req, res, next) => {
  // const token1 = localStorage.getItem('authtoken') || null;
  // console.log("Tokennnnnnn1: ", token1);
  // const token2 = req.headers.authorization?.split(" ")[1] || null;;
  // console.log("Tokennnnnnn2: ", token2);
  // if (!token2) return res.status(401).json({ message: "No token provided" });

  // try {
  //   const decoded = jwt.verify(token,config.JWT_SECRET_KEY);
  //   const user = await Account.findById(decoded.id);
  //   if (!user) return res.status(401).json({ message: "User not found" });
  //   req.user = user;
  //   console.log(req.user);
  //   next();
  // } catch (err) {
  //   return res.status(401).json({ message: "Invalid token" });
  // }

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
    console.log("Decodeeee: below line: ",decoded)
    const user = await Account.findById(decoded.id);

    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    console.log({ userId: user._id, username: user.username });
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
