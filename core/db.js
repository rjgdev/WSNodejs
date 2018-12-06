var sqlDB = require("mssql");
var config = require("../config");

exports.ExecuteQuery = function(sql, callback){
    var conn = new sqlDB.ConnectionPool(config.dbConfig);
    
    conn.connect().then(function(){
        var req = new sqlDB.Request(conn);
        
        req.query(sql).then(function(retVal){
            callback(retVal);
        })
        .catch(function(err){
            console.log("Error Message: " + err);
            callback(null, err);
        });
    })
    .catch(function(err){
        console.log("Error Message: " + err);
        callback(null, err);
    });
};