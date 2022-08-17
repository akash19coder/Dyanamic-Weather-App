const http = require('http');
const fs = require("fs");
var requests = require('requests');

const homeFile =  fs.readFileSync('home.html',"utf-8");

const replaceVal = (tempVal,orgVal) => {
    let tempareture = tempVal.replace("{%temp%}",((orgVal.main.temp)-273).toFixed(2));
    tempareture = tempareture.replace("{%tempMin%}",((orgVal.main.temp_min)-273).toFixed(2));
    tempareture = tempareture.replace("{%tempMax%}",((orgVal.main.temp_max)-273).toFixed(2));
    tempareture = tempareture.replace("{%location%}",orgVal.name);
    tempareture = tempareture.replace("{%country%}",orgVal.sys.country);
    tempareture = tempareture.replace("{%tempstatus%}",orgVal.weather[0].main);

    return tempareture;
};
const server = http.createServer(( req, res)=>{
    
    if(req.url=="/"){

    
    requests('https://api.openweathermap.org/data/2.5/weather?lat=26.4046&lon=87.40977&appid=bd2d54b3cbd441b5e23c69ef8cb38b7d')
    .on('data',  (chunk)=> {
      const objData = JSON.parse(chunk);
      const arrData = [objData];
      const realTimeData = arrData.map((val)=> replaceVal(homeFile,val)).join(" ");
      res.write(realTimeData);
      res.end();
      

      
    })
    .on('end',  (err) => {
      if (err) return console.log('connection closed due to errors', err);
     
      
    });
  }
  
}).listen(8080,()=>{
  console.log("Hello Port No.8080");
})
