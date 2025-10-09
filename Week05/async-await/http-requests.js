//const URL1 = "https://api.chucknorris.io/jokes/mdtKGns-QgSMtKPCSRnrNA";
const URL1 = "https://eloquentjavascript.net/11_async.html"
//const URL2 = "https://api.chucknorris.io/jokes/mdtKGns-QgSMtKPCSRnrNA";
const URL2 = "https://eloquentjavascript.net/11_async.html"

async function getTextFromFetch(url){
    try {
        const resp = await fetch(url);
        const text = await resp.text();
        return text;
    }
    catch (e){
        return Promise.reject("Error!!");
    }
}

async function combineLengthRequests(){
    try {
        const text1 = await getTextFromFetch(URL1);
        const text2 = await getTextFromFetch(URL2);
        return "1:" + (text1.length + text2.length);
        //console.log("Sum of lengths:", text1.length + text2.length);
    }
    catch (e){
        return Promise.reject(e);
    }
}

// With Promise.all: more efficient because getTextFromFetch() are concurrent.
async function combineLengthRequests2(){
    try {
        let textArray = await Promise.all([getTextFromFetch(URL1), getTextFromFetch(URL2)]);
        return "2:" + textArray.reduce((a, b) => a + b.length, 0);
        //console.log("Sum of lengths (2):", textArray.reduce((a, b) => a + b.length, 0));
    }
    catch (e){
        return Promise.reject(e);
    }
}

// combineLengthRequests2()
//     .then(console.log)
//     .catch(e => console.error(e));

// Test the faster execution with Promise.race:
Promise.race([combineLengthRequests(), combineLengthRequests2()])
      .then(console.log)
      .catch(e => console.error(e));