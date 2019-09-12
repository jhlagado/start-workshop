/* eslint-disable no-constant-condition */

const INTERVAL = 1000;

const sleep = (value) => {
  const endTime = Date.now() + INTERVAL;
  while (true) {
    if (endTime < Date.now()) break;
  }
  return value;
};

const run = () => {
  const step1 = sleep('Hello there!');
  console.log('Step 1 complete');

  const step2 = sleep(step1);
  console.log('Step 2 complete');

  const step3 = sleep(step2);
  console.log('Step 3 complete');

  const message = sleep(step3);
  console.log(`Message: ${message}`);
};

run();
