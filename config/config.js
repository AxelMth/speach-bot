require("dotenv").config();
const DATABASE_URL = process.env.DATABASE_URL;

const INFO_DATABASE = (function(_url) {
  const url = _url.substring(11);
  const array = url.split("@");

  const usernamePassword = array[0].split(":");
  const username = usernamePassword[0];
  const password = usernamePassword[1];

  const hostnamePort_Database = array[1].split("/");
  const database = hostnamePort_Database[1];
  const hostnamePort = hostnamePort_Database[0].split(":");
  const hostname = hostnamePort[0];
  const port = hostnamePort[1];

  return {
    username: username,
    password: password,
    hostname: hostname,
    port: port,
    database: database
  };
})(DATABASE_URL);

module.exports = {
  development: {
    username: INFO_DATABASE.username,
    password: INFO_DATABASE.password,
    database: INFO_DATABASE.database,
    host: INFO_DATABASE.hostname,
    dialect: 'postgres',
    dialectOptions:{
      ssl:true
    }
  },
  sandbox: {
    username: INFO_DATABASE.username,
    password: INFO_DATABASE.password,
    database: INFO_DATABASE.database,
    host: INFO_DATABASE.hostname,
    dialect: 'postgres',
    dialectOptions:{
      ssl:true
    }
  },
  testing: {
    username: INFO_DATABASE.username,
    password: INFO_DATABASE.password,
    database: INFO_DATABASE.database,
    host: INFO_DATABASE.hostname,
    dialect: 'postgres'
  },
  production: {
    username: INFO_DATABASE.username,
    password: INFO_DATABASE.password,
    database: INFO_DATABASE.database,
    host: INFO_DATABASE.hostname,
    dialect: 'postgres',
    dialectOptions:{
      ssl:true
    }
  }
};