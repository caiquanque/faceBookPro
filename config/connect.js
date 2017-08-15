var pg = require("pg");
var pool = new pg.Pool(); 
var conString = "postgres://postgres:postgres@localhost:5432/shema";
var client = new pg.Client(conString);
client.connect();

module.exports = client;


