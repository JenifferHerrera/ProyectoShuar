const timeago=require('timeago.js');
const timeagoInstant=timeago;
const helpers={}
helpers.timeago=(savedTimestamp)=>{
    return timeagoInstant.format(savedTimestamp)
}
module.exports=helpers;