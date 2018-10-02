/*const delayedGreet = delay(function() {
    console.log('Hello');

    return 'Greeted';
}, 3000);

function delay(F, time) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve(F());
        }, time);
    })
}

delayedGreet
    .then(function(result) {
        console.log(result);
    });

//-------------------------------------------------

const ingredients = all(
    Promise.resolve('cheese'),
    Promise.resolve('beef'),
    Promise.resolve('pepper')
);
function all(arg1, arg2, arg3) {
    let proms = [arg1, arg2, arg3];
    let results = [];

    return new Promise(function (resolve, reject) {
        proms.forEach(function (prom) {
            prom.then(function (result) {
                results.push(result);
            }).catch(function (result) {
                return 'error';
            });
        });
        setTimeout(function() {
            if(results.length === proms.length) {
                resolve(results);
            }
        });
    })
}

ingredients
    .then(function(pizzaParts) {
        console.log(pizzaParts);
    });*/

//-------------------------------------------------

const promises = [
    delay(greet('Alex'), 1000),
    delay(greet('Bob'), 300),
    delay(greet('Viktor'), 2500)
];

function race(proms) {
    return new Promise(function(resolve, reject){
        proms.forEach(function (prom) {
            prom.then(function (result) {
                resolve(result);
            }).catch(function (result) {
                return 'error';
            });
        });
    });
}

function delay(func, t) {
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            //resolve(func);
            resolve(func());
        }, t);
    });
}

function greet(name) {
    //return 'Hello, ' + name;
    return function() {
        return 'Hello, ' + name;
    }
}

race(promises)
    .then(function (result) {
        console.log(result);
    });
