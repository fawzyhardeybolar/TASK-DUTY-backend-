// errorHandle takes in 4 params --> err, req, res, next
const errorHandler = (err, req, res, next) => {
  return res.status(500).json({ msg: err });
};

module.exports = errorHandler;
