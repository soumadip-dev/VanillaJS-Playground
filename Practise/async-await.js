// 1. Create a function wait(ms) that returns a promise which resolves after ms milliseconds.
// Use async/await to log messages before and after the delay

function wait(milliseconds) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(milliseconds);
    }, milliseconds);
  });
}

async function runWaitExample() {
  console.log('Before wait');
  await wait(2000);
  console.log('After wait');
}

runWaitExample();

// 2. Using async/await, log "One", then after 1 second log "Two",
// then "Three" after another 2 seconds. No setTimeout outside of promises

async function logSequenceWithDelay() {
  console.log('One');

  await wait(1000);
  console.log('Two');

  await wait(2000);
  console.log('Three');
}

logSequenceWithDelay();

// 3. Fetch user data from public API and display name, email, and address

async function fetchUserDetails() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const userData = await response.json();

    const {
      name,
      email,
      address: { street, suite, city, zipcode },
    } = userData;

    console.log('User Details:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Address: ${street}, ${suite}, ${city}, ${zipcode}`);
  } catch (error) {
    console.error('Something went wrong:', error.message);
  }
}

fetchUserDetails();

// 4. Refactor then/catch to async/await

/*
fetch('/api/data')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
*/

async function fetchApiData() {
  try {
    const response = await fetch('/api/data');

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

fetchApiData();
