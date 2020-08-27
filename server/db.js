const { Client } = require("pg");

const connectionString =
  "	postgres://yzefjgwn:ikbZ147BENOiCxLDiO598p1MjE2VL3cx@balarama.db.elephantsql.com:5432/yzefjgwn";

const client = new Client({
  connectionString: connectionString
});

client.connect();

module.exports = {
  client
};
