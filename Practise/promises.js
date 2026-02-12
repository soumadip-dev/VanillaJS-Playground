/*
1. Create Your First Promise
Create a Promise that resolves with the string "Hello, Promises!" after 1 second.
Log the result using .then().
*/

const helloPromise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve('Hello, Promises!');
  }, 1000);
});

helloPromise
  .then(function (message) {
    console.log(message);
  })
  .catch(function (error) {
    console.error(error);
  });

/*
2. Reject a Promise
Create a Promise that immediately rejects with the message "Something went wrong!".
Handle the error using .catch().
*/

const rejectionPromise = new Promise(function (resolve, reject) {
  reject('Something went wrong!');
});

rejectionPromise.catch(function (errorMessage) {
  console.error(errorMessage);
});

/*
3. Simulate Coin Toss
Return a Promise that randomly resolves to "Heads" or "Tails" after 1 second.
*/

const coinTossResultPromise = new Promise(function (resolve, reject) {
  var randomNumber = Math.floor(Math.random() * 2);

  setTimeout(function () {
    if (randomNumber === 1) {
      resolve('Heads');
    } else {
      resolve('Tails');
    }
  }, 1000);
});

coinTossResultPromise.then(function (result) {
  console.log(result);
});

/*
4. Promise with Condition
Create a function checkAge(age) that returns a Promise.
Resolve if age >= 18, reject otherwise.
*/

function checkAge(age) {
  return new Promise(function (resolve, reject) {
    if (age >= 18) {
      resolve('Access allowed');
    } else {
      reject('Access denied');
    }
  });
}

checkAge(17)
  .then(function (successMessage) {
    console.log(successMessage);
  })
  .catch(function (errorMessage) {
    console.error(errorMessage);
  });

/*
5. Chain Promises Sequentially
Create three Promises that log:
"Step 1 done"
"Step 2 done"
"Step 3 done"
Chain them using .then().
*/

function step1Promise() {
  return new Promise(function (resolve, reject) {
    console.log('Step 1 done');
    resolve();
  });
}

function step2Promise() {
  return new Promise(function (resolve, reject) {
    console.log('Step 2 done');
    resolve();
  });
}

function step3Promise() {
  return new Promise(function (resolve, reject) {
    console.log('Step 3 done');
    resolve();
  });
}

step1Promise()
  .then(function () {
    return step2Promise();
  })
  .then(function () {
    return step3Promise();
  })
  .catch(function (error) {
    console.error(error);
  });

/*
6. Value Transformation in Chain
Create a Promise that resolves with 5.
Chain .then() handlers to double it, then square it.
Final output should be 100.
*/

const numberTransformationPromise = new Promise(function (resolve, reject) {
  resolve(5);
});

numberTransformationPromise
  .then(function (value) {
    return value * 2; // double → 10
  })
  .then(function (value) {
    return value * value; // square → 100
  })
  .then(function (finalResult) {
    console.log(finalResult);
  })
  .catch(function (error) {
    console.error(error);
  });

/*
7. Chain with Random Rejection
First .then() resolves to "Start".
Second .then() randomly throws an error or returns "Continue".
Handle rejection gracefully.
*/

const randomChainPromise = new Promise(function (resolve, reject) {
  resolve('Start');
});

randomChainPromise
  .then(function (message) {
    console.log(message);
    return message;
  })
  .then(function () {
    var randomNumber = Math.floor(Math.random() * 2);

    if (randomNumber === 1) {
      return 'Continue';
    } else {
      throw new Error('Random failure occurred');
    }
  })
  .then(function (nextMessage) {
    console.log(nextMessage);
  })
  .catch(function (error) {
    console.error('Handled Error:', error.message);
  });

/*
8. Multiple then() calls on same Promise
Create a single resolved Promise.
Attach two different .then() handlers to it.
Explain that both run independently.
*/
const multipleThenPromise = new Promise(function (resolve, reject) {
  resolve('Promise resolved successfully');
});

multipleThenPromise.then(function (result) {
  console.log('First .then() handler received:', result);
});

multipleThenPromise.then(function (result) {
  console.log('Second .then() handler received:', result);
});

multipleThenPromise.catch(function (error) {
  console.error('Error occurred:', error);
});

/*
9. Return New Promises in .then()
Chain multiple .then() where each returns a new Promise with a delay and logs a step like:
“First”
“Second”
“Third”
*/

function firstStepPromise() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log('First');
      resolve();
    }, 1000);
  });
}

function secondStepPromise() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log('Second');
      resolve();
    }, 1000);
  });
}

function thirdStepPromise() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log('Third');
      resolve();
    }, 1000);
  });
}

firstStepPromise()
  .then(function () {
    return secondStepPromise();
  })
  .then(function () {
    return thirdStepPromise();
  })
  .catch(function (error) {
    console.error('Error occurred:', error);
  });

/*
10. Implement fakeDBQuery()
Create a function that simulates a DB query with a random delay and returns data (like a user object).
Chain multiple fake queries.
*/

function fakeDBQuery(queryName) {
  return new Promise(function (resolve, reject) {
    var randomDelay = Math.floor(Math.random() * 2000) + 500;

    setTimeout(function () {
      console.log('Query executed:', queryName);

      var fakeUserData = {
        id: Math.floor(Math.random() * 1000),
        name: 'Soumadip',
        email: 'soumadip@example.com',
      };

      resolve(fakeUserData);
    }, randomDelay);
  });
}

/* Chain multiple fake queries */

fakeDBQuery('Get User')
  .then(function (userData) {
    console.log('User Data:', userData);
    return fakeDBQuery('Get User Orders');
  })
  .then(function (orderData) {
    console.log('Order Data:', orderData);
    return fakeDBQuery('Get Payment Details');
  })
  .then(function (paymentData) {
    console.log('Payment Data:', paymentData);
  })
  .catch(function (error) {
    console.error('DB Error:', error);
  });
