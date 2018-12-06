exports.show500 = function(req, resp, err){
    resp.writeHead(500,"Internal Error Occured.",{"Content-Type" : "application/json"});
    resp.write("ERROR OCCURED111: " + err);
    resp.end();
}

exports.sendJSON = function(req, resp, data){
    resp.writeHead(200,{"Content-Type" : "application/json"});
    resp.write(JSON.stringify(data.recordset));
    resp.end();
}

exports.send200 = function(req, resp){
    resp.writeHead(200,{"Content-Type" : "application/json"});
    resp.write("Transaction Successful!");
    resp.end();
}

exports.show404 = function(req, resp, err){
    resp.writeHead(404,{"Content-Type" : "application/json"});
    resp.write("ERROR OCCURED: " + err);
    resp.end();
}