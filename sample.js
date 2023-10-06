// using .then
// function generateRandomNumber(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// function checkValidNumber(inputNumber) {
//     if (inputNumber <= 5) {
//         return true;
//     } else {
//         return false;
//     }
// }

// let generatedNumber = generateRandomNumber(1, 10);
// console.log("generated number: ", generatedNumber);

// const myPromise = new Promise((resolve, reject) => {
//     if (checkValidNumber(generatedNumber)) {
//         resolve(generatedNumber + 10);
//     } else {
//         reject(generatedNumber - 10);
//     }
// });

// myPromise.then((val) => console.log(val)).catch((e) => console.log(e));


// using async await
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkValidNumber(inputNumber) {
    if (inputNumber <= 5) {
        return true;
    } else {
        return false;
    }
}

async function main() {
    let generatedNumber = generateRandomNumber(1, 10);
    console.log("generated number: ", generatedNumber);

    try {
        const result = await new Promise((resolve, reject) => {
            if (checkValidNumber(generatedNumber)) {
                resolve(generatedNumber + 10);
            } else {
                reject(generatedNumber - 10);
            }
        });
        return result
    } catch (e) {
        console.log(e);
    }
}

const data = main();
data.then((val) => console.log(val))
