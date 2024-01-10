const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  // Called to determine whether a request's origin is allowed
  /*
    1. origin : the origin(domain) of incoming request
    2. callback : to indicate whether the origin is allowed or not
  */
  origin: (origin, callback) => {
    /*
        1. checks if the origin is in the allowedOrigins
        2. if origin is not defined (apps that do not have an origin - postman, desktop ...)
     */
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // enables credentials to be sent and received during cross-oirigin requests
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
