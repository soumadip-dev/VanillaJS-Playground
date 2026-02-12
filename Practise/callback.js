// 1. Pass a function to greet a user and then thank them
function greet(callback, name) {
  callback(name);
  console.log(`Thank you ${name}`);
}

function temp(name) {
  console.log(`Hello ${name}`);
}

greet(temp, 'soumadip');

// 2. Implement a calculator function that accepts two numbers and a callback to perform operations like add, subtract
function calculator(a, b, operations) {
  return operations(a, b);
}

function add(x, y) {
  return x + y;
}
function substract(x, y) {
  return x - y;
}

console.log(calculator(5, 3, add));

// 3. Create a delayedMessage function that prints a message after a delay using setTimeout
function delayedMessage(message, delay, callback) {
  setTimeout(() => {
    console.log(message);
    callback();
  }, delay);
}

delayedMessage('Task complete', 2000, () => console.log('Callback Fired!'));

// 4. Implement a function that filters numbers in an array based on a condition provided via callback

function filterNumbers(arr, conditionCallback) {
  // Use loop and callback to return filtered array
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    if (conditionCallback(arr[i])) {
      result.push(arr[i]);
    }
  }
  return result;
}

console.log(filterNumbers([1, 2, 3, 4], n => n > 2)); // should return [3, 4]

// 5. Execute a sequence of tasks one after another using callbacks

function task1(callback) {
  console.log('Task 1 done');
  callback();
}

function task2(callback) {
  console.log('Task 2 done');
  callback();
}

function task3() {
  console.log('Task 3 done');
}

// Call them in sequence using nested callbacks
task1(() => {
  task2(() => {
    task3();
  });
});
