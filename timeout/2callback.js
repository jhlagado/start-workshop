/* eslint-disable no-unused-vars */

const INTERVAL = 1000;

const sleep = (value, callback) => {
  setTimeout(() => callback(null, value), INTERVAL);
};

const run = () => {
  sleep('Hello there!', (err, step1) => {
    console.log('Step 1 complete');

    const step2 = sleep(step1, (err, step2) => {
      console.log('Step 2 complete');

      const step3 = sleep(step2, (err, step3) => {
        console.log('Step 3 complete');

        sleep(step3, (err, message) => {
          console.log(`Message: ${message}`);
        });
      });
    });
  });
};

run();
