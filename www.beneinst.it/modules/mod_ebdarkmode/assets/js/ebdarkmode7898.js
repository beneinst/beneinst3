function tConvert (time) {
  //   var H = +time.substr(0, 2);
  //   var h = (H % 12) || 12;
  //   var ampm = H < 12 ? "AM" : "PM";
  //   time = h + time.substr(2, 3) + ' '+ampm;
  // return time; // return adjusted time or original string

  const timeString12hr = new Date('1970-01-01T' + time + 'Z')
  .toLocaleTimeString({},
    {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
  );
  return timeString12hr;
}
function get24Hr(time){
    var hours = Number(time.match(/^(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if(AMPM == "PM" && hours<12) hours = hours+12;
    if(AMPM == "AM" && hours==12) hours = hours-12;
    
    var minutes = Number(time.match(/:(\d+)/)[1]);
    hours = hours*100+minutes;
    // console.log(time +" - "+hours);
    return hours;
}

function getval() {
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()

    if (minutes < 10) minutes = "0" + minutes;

    var suffix = "AM";
    if (hours >= 12) {
        suffix = "PM";
        hours = hours - 12;
    }
    if (hours == 0) {
        hours = 12;
    }
    var current_time = hours + ":" + minutes + " " + suffix;

    return current_time;

}
