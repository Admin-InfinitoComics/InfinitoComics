export const checkRole = (requiredRole) => {
  return (req, res, next) => {
    const user = req.user; 

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: No user info found.' });
    }

    if (user.role !== requiredRole) {
      return res.status(403).json({ message: `Forbidden: Requires ${requiredRole} role.` });
    }

    next();
  };
};