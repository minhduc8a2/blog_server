const CustomErrors = require("../errors/customErrors");
const errorsHandlerMiddleware = (error, req, res, next) => {
  if (error instanceof CustomErrors) {
    return res.json({ message: error.message });
  } else {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = errorsHandlerMiddleware;
