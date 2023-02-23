var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// requestSync.js
const url = "https://api.appworks-school-campus3.online/api/v1/clock/delay";
let i = 0;
function requestSync(url) {
    var startTime = performance.now()
    // write code to request url synchronously
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null); // sending null means that no body content is needed for the GET request 
    if (xhr.status === 200) {
        console.log(xhr.responseText);
    } 
    var endTime = performance.now()
    console.log(`function ${i} took ${endTime - startTime} milliseconds`)
    i += 1;
}
requestSync(url) // would print out the execution time
requestSync(url)
requestSync(url)