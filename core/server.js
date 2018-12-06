var http = require("http");
var config = require("../config");
var emp = require("../controllers/employee");
var httpMsgs = require("../core/httpMsgs");

http.createServer(function(req, resp){
    switch(req.method){
        case "GET":
            if(req.url === "/"){
                resp.write("HOMEPAGE");
                resp.end();
            }
            else if(req.url === "/employee"){
                emp.GetEmployeeList(req, resp);
            }else{
                var empPatt = "[0-9]+";
                var patt = new RegExp("/employee/" + empPatt);
                if(patt.test(req.url)){
                    patt = new RegExp(empPatt);
                    var empNo = patt.exec(req.url);
                    emp.GetEmployee(req,resp,empNo);
                }
            }
            break;
        case "POST":
            if(req.url === "/employee"){
                var reqBody = "";
                req.on("data", function(data){
                    reqBody+= data;
                    if(reqBody.length > 1e7) //10mb
                    {
                httpMsgs.show404(req,resp,"Entity too large")
                    }
                });
                req.on("end",function(){
                    emp.ManageEmployee(req,resp,reqBody,req.method);
                });
            }
            else
            {
                httpMsgs.show404(req,resp,"Page Not Found.")
            }
            break;
        case "PUT":
            if(req.url === "/employee"){
                var reqBody = "";
                req.on("data", function(data){
                    reqBody+= data;
                    if(reqBody.length > 1e7) //10mb
                    {
                httpMsgs.show404(req,resp,"Entity too large")
                    }
                });
                req.on("end",function(){
                    emp.ManageEmployee(req,resp,reqBody,req.method);
                });
            }
            else
            {
                httpMsgs.show404(req,resp,"Page Not Found.")
            }
            break;
        case "DELETE":
            if(req.url === "/employee"){
                var reqBody = "";
                req.on("data", function(data){
                    reqBody+= data;
                    if(reqBody.length > 1e7) //10mb
                    {
                httpMsgs.show404(req,resp,"Entity too large")
                    }
                });
                req.on("end",function(){
                    emp.ManageEmployee(req,resp,reqBody,req.method);
                });
            }
            else
            {
                httpMsgs.show404(req,resp,"Page Not Found.")
            }
            break;
        default:
            break;
    }
})
.listen(config.webPort, function(){
    console.log("Started listening at port: " + config.webPort)
})