/* eslint-disable no-unused-vars */

const INTERVAL = 1000;

const sleep = value =>
  new Promise(
    (resolve, reject) =>
      setTimeout(
        () => resolve(value),
        INTERVAL
      )
  );

const run = () => {
  sleep('Hello there!')

    .then((step1) => {
      console.log('Step 1 complete');
      return sleep(step1);
    })

    .then((step2) => {
      console.log('Step 2 complete');
      return sleep(step2);
    })

    .then((step3) => {
      console.log('Step 3 complete');
      return sleep(step3);
    })

    .then((message) => {
      console.log(`Message: ${message}`);
    });
};

run();
