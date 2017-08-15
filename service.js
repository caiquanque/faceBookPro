var client = require('./config/connect.js'); //connect db
const async = require('async');
var math = require('mathjs');
var _ = require('lodash'); //Lodash

//Print date - value
module.exports = {
  queryFacebook (req, res, callback) {
    async.parallel([
      (cb) => {
        var queryDate = client.query("select to_char(date_trunc('week', a.date_reported), 'YYYY-MM-DD') as date, (sum(b.likes)+sum(b.shares)+sum(b.comments)) as value from channel_data a join facebook_channel_data b on a.id = b.channel_data_id where a.date_reported between '2016-11-28' and '2016-12-18' group by date", function (err, row, fields){ 
          cb(null, row);
        }); 
      },
      (cb) => {
        var quaryFans = queryDate = client.query("SELECT f.fans, XYZ.date FROM facebook_channel_data f INNER JOIN channel_data cd ON f.channel_data_id = cd.id INNER JOIN ( select MAX(id) as channel_data_max_id, date FROM( select cd.id, to_char(date_trunc('week', cd.date_reported), 'YYYY-MM-DD') date from channel_data cd ) ABC GROUP BY date ) XYZ ON XYZ.channel_data_max_id = cd.id", function (err, row, fields) {
          cb(null, row);
        }); 
      }
    ], (err, result) => {

      var vongLap = [];

      _.map(result[0].rows, (row) => {

        var fan = _.find(result[1].rows, { date: row.date } );

        var str = ({
          'date': row.date,
          'value': (row.value/fan.fans).toFixed(2)
        });

        //return str;//tra ve str
        vongLap.push(str);

      }); 

      callback(JSON.stringify(vongLap));
    });
  }

}