//create a time data function
function currentTime() {
    //declare letiables
    let d = new Date(); //get current date
    let hr = d.getHours(); //get current hours
    let min = d.getMinutes(); //get current minutes
    let sec = d.getSeconds(); //get current seconds
    let ampm; //declare empty letiable to store AM or PR
    let utchr = d.getUTCHours(); //get current greenwich mean time (GMT)
    let timeDiff; //to store time difference between GMT hour and Local hour
    let adjTimeDiff; //to store time difference converted to postive number
    let timeZone; //to store the 4 time zones (PT,MT,CT,ET)

    //add 0 to single digits for seconds
    if (sec < 10) {
        sec = "0" + sec;
    }
    //add 0 to single digits for minutes
    if (min < 10) {
        min = "0" + min;
    }

    //determine AM or PM string
    if (hr == 12) {
        ampm = "Afternoon"; //set to PM
    } else if (hr > 20) {
        hr -= 12; //deduct 12 from hours greater than 12 (military time)
        ampm = "Night"; //set to PM
    } else if (hr > 18) {
        hr -= 12; //deduct 12 from hours greater than 12 (military time)
        ampm = "Evening"; //set to PM
    } else if (hr > 12) {
        hr -= 12; //deduct 12 from hours greater than 12 (military time)
        ampm = "Afternoon"; //set to PM
    } else {
        ampm = "Morning"; //set to AM
    }

    //convert GMT to standard time
    if (utchr > 12) {
        utchr -= 12;
    }

    //calculate time difference between GMT and local
    timeDiff = hr - utchr;

    //convert time difference
    if (timeDiff < 0) {
        adjTimeDiff = -timeDiff;
    }

    //define time zone
    if (timeDiff == 5 || adjTimeDiff == 5) {
        timeZone = "PT";
    } else if (timeDiff == 6 || adjTimeDiff == 6) {
        timeZone = "MT";
    } else if (timeDiff == 7 || adjTimeDiff == 7) {
        timeZone = "CT";
    } else if (timeDiff == 8 || adjTimeDiff == 8) {
        timeZone = "ET";
    }

    let username = "";
    let time = "";

    if (
        sessionStorage.getItem("username") != null &&
        sessionStorage.getItem("username") != ""
    ) {
        username = sessionStorage.getItem("username");

        time =
            "Good" +
            " " +
            ampm +
            " " +
            username +
            ". Welcome back Registered User!";
    }

    //assemble time format to display

    //assemble current local time and time zone on HTML elements
    document.getElementById("greeting").innerText = time; //adding time

    //run time data function every 1 second
    setInterval(currentTime, 1000); //setting timer
}
//initial run of time data function
currentTime();
