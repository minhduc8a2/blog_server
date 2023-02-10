const notFoundMiddleware = (req, res) => {
  res.status(404).send("Route not found");
};

module.exports = notFoundMiddleware;
