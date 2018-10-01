// I
// Write a function 'delay' which accepts two arguments
// a function F
// a delay time in ms
// 'delay' should execute F after delay time and return  a promise
// which resolves with return value of F
// should print 'Greeted' after 3 seconds

// Записываем функцию «delay», которая принимает два аргумента
// Если функция F
// время задержки в мс
// 'delay' должен выполнить F после задержки и вернуть обещание
// который разрешает с возвратным значением F
//следует распечатать «Приветствуется» через 3 секунды

const delayedGreet = delay(function(success, error) {
  console.log('Hello');

  return 'Greeted';
}, 3000);

delayedGreet
  .then(function(result) {
    console.log(result);
  });


function delay() {
    return new Promise(function(resolve, reject) {
        resolve();
    });
}