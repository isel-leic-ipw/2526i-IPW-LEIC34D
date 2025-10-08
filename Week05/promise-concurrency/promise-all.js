const urlArray = [
    "https://eloquentjavascript.net/05_higher_order.html",
    "https://eloquentjavascript.net/11_async.html",
    "https://eloquentjavascript.net/10_modules.html"
    //, "http://not.exist" // To reproduce an error
];

// Objective: present the sum of the sizes of each web-page in urlArray (multiple fetches)

promiseArray = urlArray.map(url => fetch(url));

// First Way:
// Promise.all(promiseArray)                       // Promise<Array<Response>>
//     .then(arrResp => {
//         const arrPromiseText = [];
//         for (let resp of arrResp)
//             arrPromiseText.push(resp.text());
//         return Promise.all(arrPromiseText);
//     })                                          // Promise<Array<String>>
//     .then(arrText => {console.log(arrText.map(text => text.length)); return arrText}) // print the size of each text response.
//     .then(arrText => arrText.reduce((t1, t2) => t1 + t2.length, 0)) // Promise<Number>
//     .then(totalLen => console.log(totalLen))    // Promise<undefined>
//     .catch(err => console.error("ERROR!", err.message));

// Second Way:
Promise.all(promiseArray)                                           // Promise<Array<Response>>
    .then(arrResp => Promise.all(arrResp.map(resp => resp.text()))) // Promise<Array<String>>
    .then(arrText => arrText.reduce((t1, t2) => t1 + t2.length, 0)) // Promise<Number>
    .then(totalLen => console.log(totalLen))                        // Promise<undefined>
    .catch(e => console.error("ERROR!!!", e));


// An implementation of Promise.all:
function promiseAll(arrayPromises){
    const arrayValues = [];
    let count = 0;
    let rejected = false;
    return new Promise((resolve, reject) => {
        for (let p of arrayPromises){
            p.then(value => {
                arrayValues.push(value);
                count++;
                if (count == arrayPromises.length)
                    resolve(arrayValues);
            }).catch(err => {
                if (! rejected){
                    reject(err);
                    rejected = true;
                }
            });

        }
    });
}
