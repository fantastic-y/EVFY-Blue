/* ---- random codes ---- */
let code = ' '; //initialize to null value
let getCode = ' '; //to store entered code

//get html element to display
function generateCode() {
    //create variables to store generated codes and the type of characters we want to show as codes
    
    let btnvalue; //for button boolean value
    //create variable to hold the type of characters we want to show as codes
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';

    //generate character multiple times using a loop
    for (i = 1; i <=4; i++) {
        let char = Math.random()* str.length; //random select a character from the variable and then store in a new variable
        code += str.charAt(char) //accumulate the generated character into a string of 8 characters
    }
    return code; //return the final accumulated string when loop ends
}

document.getElementById("captcha-value").innerHTML = generateCode();

//disable button
function disableButton(btnvalue) {
    document.getElementById("formsubmit").disabled = btnvalue; //able/disable button
    if (btnvalue == true) {
        //by default, it is disabled set button and label color translucent
        document.getElementById("formsubmit").style.backgroundColor = "rgba(140, 198, 63, 0.3)";
        document.getElementById("formsubmit").style.color = "rgba(255, 255, 255, 0.5)";
    } else {
        //active it,set button and label color with no transparency
        document.getElementById("formsubmit").style.backgroundColor = "rgba(140, 198, 63, 1)";
        document.getElementById("formsubmit").style.color = "rgba(255, 255, 255, 1)";
    }
}

//listen to user input code
let codebox = document.getElementById("entered-code"); //get textbox
codebox.addEventListener("input", ()=>{
    getCode = document.getElementById("entered-code").value; //get character entered
    let charset1 = getCode.trim(); //remove any hidden characters entered
    let charset2 = code.trim(); //remove any hidden characters generated
    //test if code entered matches the number of genereated characters
    if (charset1.length == charset2.length && charset1 == charset2) {
        disableButton(false); //if match, run the function to enable button
    } else {
        disableButton(true);
    }
}
); //listen to code entered in textbox

//activate function
disableButton();