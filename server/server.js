const express = require('express');
const app =express()
const cors = require("cors")
const bodyParser = require("body-parser")
const moment = require('moment');
var schedule = require('node-schedule')
app.use(bodyParser.json())
app.use(cors())
const cron = require("node-cron")
app.get("/home",(req,res)=>{
    console.log("hello")
    res.send("hellow")
})
app.post('/',(req,res)=>{
    // console.log(JSON.parse(req))
    console.log(req.body)
    if (req.body.type==='daily'){
        const time = req.body.time;
        
        const hour = time.split(':')
        console.log(hour)
        const cron_string = hour[1]+' '+hour[0]+' '+'* * *';
        console.log(cron_string)
        cron.schedule(cron_string,function(){
            console.log("running daily jobs");
        })

    }
    if(req.body.type==='day'){
        //compare day and time
        console.log(req.body)
        const d = req.body.date.split('-')
        const year = d[0]
        const  month = d[1]
        const datee = d[2]
        const time = req.body.time.split(':')
        const hour = time[0]
        const minutes = time[1]
        console.log(hour)
        console.log(minutes)
        var date = new Date(year,month-1,datee,hour,minutes,0).toUTCString();
        console.log(date)
        schedule.scheduleJob(date,function(){
            console.log("toady is the day")
        })
    }
    if(req.body.type === 'week'){
        const days = req.body.days;
        const time = req.body.time;
        const interval = req.body.interval;
        console.log(days)
        console.log(time)
        const hour = time.split(':')
        let s=' ';
        for(var i=0;i<days.length-1;i++){
            s+=days[i]+','
        }
        s+=days[days.length-1]
        const cron_string = hour[1]+' '+hour[0]+' '+ '* *'+s;
        console.log(cron_string)
        cron.schedule(cron_string,function(){
            console.log("running weekly job")
        })
    }
    if(req.body.type==='month'){
        const months = req.body.months;
        const time = req.body.time;
        const hour = time.split(':')
        console.log("in month")
        let s = ' '
        for(var i = 0;i<months.length-1;i++){
            s+=months[i]+','
        }
        s+=months[months.length-1]
        const cron_string = hour[1]+' '+hour[0]+' '+'*'+s+' *'
        cron.schedule(cron_string,function(){
            console.log("running monthly")
        })
    }
    res.send('Hello World');
})
app.post('/year',(req,res)=>{
if(req.body.type = 'yearly'){
    console.log(req.body)
    const month_today = req.body.month
    const time = req.body.time
    const hour = time.split(':')
    console.log("in year")
    const cron_string = hour[1]+' '+hour[0]+' '+'* '+month_today+' *'
    cron.schedule(cron_string,function(){
        console.log("running Yearly")
    })
}
})
let time = "* * * * *";
app.listen(3000, function(){
    console.log('listening on 3000');
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    console.log(today);
    console.log(cron.validate('11 16 * * *'))
})
