var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs");
var util = require("util");

exports.GetEmployeeList = function(req, resp){
    db.ExecuteQuery("SELECT * FROM tblEmployee",function(data, err){
        if(err){
            httpMsgs.show500(req, resp, err);
        }
        else{
            httpMsgs.sendJSON(req, resp, data);
        }
    });
};

exports.GetEmployee = function (req, resp, empNo){
    db.ExecuteQuery("SELECT * FROM tblEmployee where ID = " + empNo,function(data, err){
        if(err){
            httpMsgs.show500(req, resp, err);            
        }
        else{
            httpMsgs.sendJSON(req, resp, data);
        }
    });
};

exports.ManageEmployee = function (req, resp, reqBody, reqMethod){
    try {
        if(!reqBody) throw new Error("ERROR OCCCURED: Invalid Input.");
        var data = JSON.parse(reqBody);

        if(data){            
            if(reqMethod === "POST"){
                //if(data.ID) throw new Error("ERROR OCCCURED: ID is not required.");
                if(!data.EmpName) throw new Error("ERROR OCCCURED: Employee name is required.");
                if(!data.EmpAge) throw new Error("ERROR OCCCURED: Employee age is required.");
                if(!data.EmpPosition) throw new Error("ERROR OCCCURED: Employee position is required.");

                var sql = "INSERT INTO tblEmployee (ID,EmpName, EmpAge, EmpPosition) VALUES ";
                sql += util.format("('%d','%s','%d','%s')",data.ID, data.EmpName, data.EmpAge, data.EmpPosition);
            }

            else if(reqMethod === "DELETE"){
                if(!data.ID) throw new Error("ERROR OCCCURED: ID is required.");
                var sql = "DELETE FROM tblEmployee WHERE ID=" + data.ID;
            }
            else if(reqMethod === "PUT"){
                if(!data.ID) throw new Error("ERROR OCCCURED: ID is required.");
                var sql = "UPDATE [NODEDB].[dbo].[tblEmployee] set ";
                if(data.EmpName){ 
                    sql+= "EmpName ='" + data.EmpName + "' ,";
                }
                
                if(data.EmpAge){ 
                    sql+= " EmpAge =" + data.EmpAge + " ,";
                }

                if(data.EmpPosition){ 
                    sql+= " EmpPosition ='" + data.EmpPosition + "' ,";
                }
                
                sql = sql.slice(0,-1);
                sql+= " WHERE ID=" + data.ID;
            }

            db.ExecuteQuery(sql,function(data, err){
                if(err){
                    httpMsgs.show500(req, resp, err);
                }
                else{
                    httpMsgs.send200(req,resp);
                }
            });
        }
        else{
            throw new Error("ERROR OCCCURED: Invalid Input.");
        }
    } catch (err) {
        httpMsgs.show500(req, resp, err);
    }
};