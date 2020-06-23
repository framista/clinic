module.exports = function (req, res, next) {
  if (!req.user.isDoctor) return res.status(403).send('Access denied.');
  next();
};
