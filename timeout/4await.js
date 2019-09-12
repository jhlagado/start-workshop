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

const run = async () => {
  const step1 = await sleep('Hello there!');
  console.log('Step 1 complete');

  const step2 = await sleep(step1);
  console.log('Step 2 complete');

  const step3 = await sleep(step2);
  console.log('Step 3 complete');

  const message = await sleep(step3);
  console.log(`Message: ${message}`);
};

run();
