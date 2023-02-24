var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


// requestAsync.js
const url = "https://api.appworks-school-campus3.online/api/v1/clock/delay";

function requestCallback(url) {
    var startTime = performance.now()

    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true); //true for handling request asychronously
    xhr.onload = (e) => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                //console.log("first", xhr.responseText);
            } else {
                console.error(xhr.statusText);
            }
        }
    }
    xhr.onerror = (e) => {
        console.error(xhr.statusText);
    }
    xhr.send(null)

    var endTime = performance.now()
    console.log(`function 1 took ${endTime - startTime} milliseconds`)
    // write code to request url asynchronously
}

function requestPromise(url) {
    var startTime = performance.now()
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(xhr.responseText)
                //console.log(xhr.responseText);
            } else {
                reject(Error('error code:' + xhr.statusText));
            }
        }
        xhr.send();
        var endTime = performance.now()
        console.log(`function 2 took ${endTime - startTime} milliseconds`)
    })
    
    // write code to request url asynchronously with Promise

}
async function requestAsyncAwait(url) {
    // write code to request url asynchronously
    // you should call requestPromise here and get the result usingasync/await.
    var startTime = performance.now()
    try {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = 'json';
        xhr.onload = await function() {
            if (xhr.status === 200) {
                //console.log('third', xhr.responseText);
            } else {
                reject(Error('error code:' + xhr.statusText));
            }
        }
        xhr.send();
        var endTime = performance.now()
        console.log(`function 3 took ${endTime - startTime} milliseconds`)
    } catch (error) {
        console.error(error);
    }
}
requestCallback(url); // would print out the execution time
requestPromise(url)
    .then((response) => console.log(""));
requestAsyncAwait(url);