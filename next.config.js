const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    //gdy jesteśmy w developerskim serwerze
    return {
      reactStrictMode: true,
      env: {
        mongodb_username: "testowyuser",
        mongodb_password: "c9I0SWOqoAm3GZx2",
        mongodb_clustername: "cluster0",
        mongodb_database: "auth-demo",
      },
    };
  }

  // gdy jestesmy w produckji
  return {
    reactStrictMode: true,
    env: {
      mongodb_username: "myuserproduction",
      mongodb_password: "myuserproductionpasssowrd",
      mongodb_clustername: "culstermonodb",
      mongodb_database: "db",
    },
  };
};