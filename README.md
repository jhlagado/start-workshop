# Node JS Workshop

September 16, 2019

---

# Agenda

```
| Morning                 | Afternoon
| ------------------------|-------------------
| Modern JavaScript       | Serving HTTP
| Node Architecture       | Express
| Npm                     | Middleware
| The Node command        | Logging
| Modules                 | Routes
| Debugging               | Mongo
| Asynchronicity          | Templates
| Examples                | Authentication
```

---
# Modern JavaScript
The JavaScript language is nearly 25 years old however since 2016 the language has been significantly upgraded with new features. This enhanced version of the language is referred to variously as ECMAScript 2016, 2017, 2018, 2019 or ES6, ES7, ES8, ES9, ES10 and ESNext.

Rather than dwell too much on version numbers just be aware than most Node development takes place using modern Javascript features. Meanwhile front-end code which needs compatibility with Internet Explorer 11 deploys code which is called ES5. Modern browsers such as Chrome, Firefox, Safari,Opera and Edge can use modern JavaScript. These browsers, which upgrade themselves regularly are known as "evergreen" browsers.

---
## Features of Modern JavaScript

This is not an exhaustive list of the new features of JavaScript but includes most of the important ones.

| Features
|----
| let & const
| arrow functions
| spreading
| destructuring
| default arguments
| template strings
| classes
| import & export
| dynamic imports
| iterators & for..of
| generators
| promises
| async/await
| Maps & Sets
| proxies

---
## let & const

!! show example var, let, const

These new keywords allow decalring variables that are scoped to a block of code instead of a function. Declarations are usually declared as `const` but when a name need to be reused you can declare them as `let`.

```js
const x = 1;
x = 2; // error
```
```js
let x = 1;
x = 2; // OK
```

NOTE: just because a variable has been declared as `const` this only refers to the name binding, it doesn't prevent a variable from being mutated.

---
## Enhanced object literals
### Object key expressions
```js
const x = 'aaa';

const obj = {
  [x]: 123
}

// { aaa: 123 }
```
### Method function shorthand

!! show how methods are called

Old way
```js
{
  sayHello: function() {
    console.log('hello!');
  }
}
```
New way
```js
{
  sayHello() {
    console.log('hello!');
  }
}

```

---
## Arrow functions
JavaScript now has a more convenient syntax for declaring anonymous lambda functions. Unlike the traditional `function` syntax, arrow functions have no implied variables called `this` or `arguments`.

```js
// traditional function
function add(a, b) {
  return a + b;
}
```

```js
const fun = (a, b) => a + b;
```

If the function body can be expressed as a single expression then there is no need for a return statement.

If several lines of code are needed to express the body of the function then braces are used to indicate a code block and a return statement is required;

```js
const fun = (a, b) => {
  const result = a + b;
  return result;
};
```

If an arrow function needs to return an object then it needs to be wrapped in parentheses so it won't be mistake for a code block;

```js
const fun = () => ({a: 1});
```

If an arrow function only has one argument then you can drop the parentheses from the argument declaration.

```js
const fun = (a) => a + 1;
```

```js
const fun = a => a + 1;
```

## Spreading
It is now much easier to copy and compose arrays and objects

```js
const a = [1,2,3];

const b = [...a, 4]; // [1,2,3,4]

const c = [...a, 4, ...a]; // [1,2,3,4,1,2,3]
```

```js
const x = {a: 1, b: 2};

const y1 = {...x, c: 3}; // {a: 1, b: 2, c: 3}

const y2 = {...x, a: 4}; // {a: 4, b: 2}

const y3 = {...x, ...{a: 4, c: 3}}; // {a: 4, b: 2, c: 3}
```

When used in this way, ... is referred to as the "spread" operator.

---
## Destructuring

Many of the operations that you can do on the right-hand side of the `=` you can also do on the left-hand side.

```js
const x = 1;

const x = [1,2,3];

const [x, ...y] = [1,2,3,4];
// x = 1, y = [2,3,4]

const [x, y, ...z] = [1,2,3,4];
// x = 1, y = 2, z = [3,4]

const [x] = [1,2,3,4]; // x = 1

const [,,x] = [1,2,3,4]; // x = 3
```

```js
let x = 1;
let y = 1;
[y, x] = [x, y]; //swap x with y
```

```js
const fun = (a, ...b) => {
  // do something
}

fun(1,2,3,4); // arg a = 1, arg b = [2,3,4]
```

```js
const {a} = {a: 1}; // a = 1

const {a: b} = {a: 1}; // b = 1 🤯

const {a, ...rest} = {a: 1, b: 2, c: 3};
// a = 1, rest = {b: 2, c:3}
```

The last example is a good way to exclude a key from an object.
On the left hand side and for function arguments, ... is referred to as the "rest" operator. It can only be used in the last position.

```js
const [x, y, ...z] = [1,2,3,4]; //this works x = 1, y = 2, z = [3,4]

const [...x, y, z] = [1,2,3,4]; //this doesn't
```

---
## Default arguments

Function arguments can now be optional and can take a default value. If you don't pass an argument, or you pass `undefined` as an argument, it will use the default value.

```js
const f = (a=2, b=3) => a + b

f(1); // 4

f(undefined, 10); // 12

f(); // 5

```

---

## Template strings

JavaScript now offers multi-line strings which merge values from the scope without needing concatnation operations.

Old style

```js
const name = 'John';
const x = 'Hello,\n' + name + '.\n G'day!';
```

New style

```js
const name = 'John';
const x = `Hello,
${name}.
G'day!`;
```

Both output

```
Hello,
John.
G'day!
```
---

## Classes

Old style

```js
const NewClass = function (x) {
  this.x = x;
}

NewClass.prototype = Object.create(
  OldClass.prototype
);

NewClass.prototype.getX = function() {
  return this.x;
}
```

New style

```js

class NewClass extends OldClass {

  constructor(x) {
    super();
    this.x = x;
  }

  getX() {
    return this.x;
  }
}
```

Usage:

```js
const obj = new NewClass(100);

console.log(obj.getX());
```

---
## Import and export
Modern JavScript has modules and the ability to import and export from these modules.
```js
// filename: md.js
export const x = 123
```

```js
import {x} from 'md.js'
```

NOTE: Node has its own way of handling modules (known as the CommonJS format) and has not fully integrated the modern JavaScript way. As we will see Node uses a different syntax for importing and exporting values.

Soon Node will fully support modern JavaScript modules by right now that functionality is hidden behind a feature switch.

---

## Dynamic imports

Modern JavaScript can dynamically import values at runtime. This enables lazy-loading modules as needed. When you load a module, JavaScript handles this with a "promise". More about this shortly.

```js
import('module.js').then(mod => {
  console.log(`this is the value of x: ${mod.x});
})
```

As mentioned above, Node handles modules differently and we will use the Node way of loading and importing modules in this workshop.

---
## Iterators & for ... of
Modern JavaScript defines the concept of an Iterable which is an functional interface supported by many JavScript types.

Examples of Iterables are Arrays and Strings but you can create your own as well. Objects which are Iterable mean that they can be interated over. It means that you can use the spread and rest operator ... on them and you can also use the `for..of` contruct for looping.

For example, the traditional way to loop over an array

```js
  const array = [1,2,3,4,5];

  for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
  }
```
Here is the modern way to loop over an array. This works because arrays implement the Iterable interface.

```js
  const array = [1,2,3,4,5];

  for (let item of array) {
    console.log(item);
  }
```

`for..of` loops are good for preventing common "off-by-one" bugs.

---
## Promises

Promises are a way for dealing with asynchonicity in JavaScript in a single-threaded environment. This is a complex subject and one we will discuss in detail a bit later because it is very important in Node.

```js

readFilePromise('file.txt')
.catch(err => console.log(`an error occured ${err}`))
.then(content => console.log(`Content: ${content}`));
```

---
## Generators

Generators are a powerful mechanism for simplifying the process of writing iterators and making objects Iterable.

---
## Async/await
Async/await is an advanced feature for writing asynchronous code which is implemented using promises and generators. We will be discussing async/await in much more detail because this is also important in Node.

```js
async function f() {
  try {
    const content = await readFile('file.txt');
    console.log(`Content: ${content}`)
  catch (err) {
    console.log(`an error occured ${err}`);
  }
}

f();
```

---
## Maps & Sets
Modern JavaScript has more efficient data structures for common algorithms. Whereas as normal JavaScript objects are often used as dictionary types for quick look up, this is not as efficient as using a Map or a Set for the same task. Better still, while JavaScript objects can only have strings as keys, Maps can use any object as a key.
```js
// Set
const s1 = new Set([1,2,2,3]);
// s1 = Set {1,2,3}

// Set
const s = new Set();
s.add("hello").add("goodbye").add("hello");
s.size === 2;
s.has("hello") === true;

// Map
const m = new Map();
m.set("hello", 42);
m.set(s, 34);
m.get(s) == 34;

```

---
# The Node Architecture

```










```
---
!! talk about yarn briefly

# Npm

Npm is the package manager for the Node ecosystem. It connects your app to
the Npm registry, by far the world's largest registry of software packages.

## NPM init
To initialise a new project, create an empty directory and run
```
npm init
```
This will prompt you to answer a few questions

```
package name    unique name for your package
version         defaults to 1.0.0
description     a description of your package
entry point     the main file to load from your package
test command    the command for testing your package
git repository  optional git repository
keywords        optional key words
author          author's name
license         licence, MIT, ISC, GPL tec
```
which will generate a package.json file like this:
```json
{
  "name": "demo-package",
  "version": "1.0.0",
  "description": "A demo package",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Steve Smith",
  "license": "GPL"
}
```
---
## package.json

Field            | Value
-----------------|-------------
name             | package name
version          | semantic version 0.0.0
description      | description
main             | entry filename "app.js",
scripts          | object containing named commands
author           | author's name
license          | licence, MIT, ISC, GPL tec
dependencies     | app dependencies
devDependencies  | tool dependencies

After initialising the project we can start adding dependencies.

`dependencies` refer to modules that you need to import into your application

`devDependencies` refers to tool modules that are used for development, testing and deployment of your code.

To install a module into your app type
```
npm install <packname-name>
```
or
```
npm i <packname-name>
```
this will download the package and store it in your application's `node_modules` directory and automatically add it to the `dependencies` section of your `package.json` file.

You should now find a node_modules directory in your projects folder. You'll also notice that your `package.json` file has been updated and a  `package-lock.json` file has been created which contains the version numbers of all of your installed packages.

## Installing dependencies

For example let's try installing the utility package known as `react` into your project,

In your terminal window type
```
npm i react
```
This command installs the dependency (and all of its dependencies) into the `node_modules` directory and adds an entry to the `dependencies` section in `package.json`

```
"dependencies": {
  "react": "^16.9.0"
}
```
Dependencies are in the semantic version format

```
"<package-name>": "<semantic-version>",
```
where the three digits represent
```
0.0.0
^ ^ ^
| | |
| | +-- PATCH version when you make backwards-compatible bug fixes.
| +---- MINOR version when you add backwards-compatible functionality.
+------ MAJOR version when you make breaking API changes.
```

The caret `^` in the version `^2.4.2` represents the range of versions we will accept when installing. `^2.4.2` means we will accept any version of the package that is equal to or greater than version 2.

If we want more precision and predictablilty
we can remove the `^` so we only accept that exact version. However, this means that you will need to manually upgrade your packages to handle bug-fixes and non-breaking changes.

```
"dependencies":
  "react": "16.9.0"
}
```

## Git version control

By this stage you should already be thinking about version control.

Note that:

* You **SHOULD** commit `package.json` and `package-lock.json` to your repo

* You **SHOULD NOT** commit node_modules.

Instead, add `node_modules` to `.gitignore` so it doesn't get commited to your repo. Every intstallation or deployment should retrieve its own dependencies.

example `.gitignore` file

```
node_modules
```

---
## Installing someone else's project

When you clone a project's repository, it won't have its own node_modules directory and the project won't run. To complete the installation run `npm install` or `npm i`. Then it will be ready to use.

---
# The node command

To execute a file containing JavaScript we simply type:
```
node <filepath>
```

Note:
* the .js extension is optional
* if filepath is a directory then it will load index.js (if present).
* if filepath is a directory AND it has a `package.json` then it will load the file "main" entry (if present).

## Running JavaScript from the command line

node can parse and run JavaScript code directly from the command line with
```
node -p "console.log(1 + 2)"
```
## Node REPL

Typing `node` by itself will run the Node REPL

You can type any valid JavaScript command or expression.

```js
> 1 + 2
3

> console.log('Test');
Test
```

You can leave the REPL by typing `Ctrl-C` twice.

The REPL also has some commands which you can access with `.help`

```
> .help
.break    Sometimes you get stuck, this gets you out
.clear    Alias for .break
.editor   Enter editor mode
.exit     Exit the repl
.help     Print this help message
.load     Load JS from a file into the REPL session
.save     Save all evaluated commands in this REPL session to a file
```

You can also access a list of all the global variables by typing TAB twice.

---

## Developer dependencies

You can install development tools into your project but because you usually don't want these to get bundled up and deployed to production you should install these as "dev dependency".

Just like normal dependencies you install them with `npm` but adding the `-D` command line switch.

For example, let's add eslint which is the most popular JavaScript linter. We'll discuss linting in more detail later.

```
npm install eslint -D
```

Running this command installs the eslint tool in your node_modules directory and updates the `devDependencies` section in your `package.json`.

For example:

```
"devDependencies": {
  "eslint": "^5.16.0",
}
```

## Running code

Let's run eslint. There are several ways of going about this but unless you add something to your path, tools that have been installed in your node_modules are a little inconvenient to run.

For example to run eslint on the files in the root directory of your project you might type

```
./node_modules/.bin/eslint .
```

You will usually find a shortcut to your tool in the `.bin` directory but this is still too wordy for most uses.

NOTE: because we haven't set eslint up yet you'll see this error message
```
Oops! Something went wrong! :(

ESLint: 6.3.0.

ESLint couldn't find a configuration file. To set up a configuration file for this project, please run:

    eslint --init

ESLint looked for configuration files in /workspace/start-workshop and its ancestors. If it found none, it then looked in your home directory.

If you think you already have a configuration file or if you need more help, please stop by the ESLint chat room: https://gitter.im/eslint/eslint

```

Let's set up eslint with the --init command line switch

```
./node_modules/.bin/eslint --init
```

Answer the questions to set up your configuration. Here are some typical responses.

```
? How would you like to use ESLint?
    To check syntax, find problems, and enforce code style

? What type of modules does your project use?
    JavaScript modules (import/export)

? Which framework does your project use?
    None of these

? Where does your code run?
    Node

? How would you like to define a style for your project?
    Use a popular style guide

? Which style guide do you want to follow?
    Airbnb (https://github.com/airbnb/javascript)

? What format do you want your config file to be in?
    JavaScript

Checking peerDependencies of eslint-config-airbnb-base@latest
The config that you've selected requires the following dependencies:

eslint-config-airbnb-base@latest eslint@^4.19.1 || ^5.3.0
eslint-plugin-import@^2.14.0

? Would you like to install them now with `npm`?
    Yes
```
This process will install additional dev dependencies in `package.json`
```js
  "devDependencies": {
    "eslint": "^5.16.0",
    "eslint-config-airbnb-base": "^13.1.0",
    "eslint-plugin-import": "^2.17.3",
  }
```
and create an `.eslint.js` file
```js
module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
  },
};
```
Take note of this .js file's format. This is a Node CommonJS format and you'll be seeing this style again later.

By specifying a preference for using an industry style guide  you get various linting rules for free. Over time you may choose to add new ones or turn some of them off. That's what the `rules` entry in `.eslint.js` is for. For example:
```js
rules: {
  "no-confusing-arrow": 0,
  "implicit-arrow-linebreak": 0,
  "no-shadow": 0,
  "consistent-return": 0,
  "comma-dangle": 0,
  "padded-blocks": 0,
  "object-curly-newline": 0,
  "no-param-reassign": 0,
  "no-return-assign": 0,
}
```

Now that eslint has been configured you can run now eslint over your codebase

```
./node_modules/.bin/eslint .
```

## npx
You can make it easier to run by using the `npx` command.

`npx` is a command runner which automatically adds `./node_modules/.bin` to the start of your command.

Far better than typing the path to the `.bin` directory is to run them with `npx`.
```
npx eslint .
```

## npm scripts

For tasks you tun all the time, it would be a good idea to add it to the `scripts` section of your `package.json`. This makes it available to run from `npm`.

Any entry you place in the `scripts` section of `package.json` can be executed by
```
npm run <script_name>
```

For example if we added an entry called `linter` for running the linter on our project:

```js
"scripts": {
  "linter": "eslint ."
}
```
we can now run the `linter` script as:

```
npm run linter
```

Each script entry you add to `package.json` is in the format of a command in the shell of the operating system you are currently running on.

This can lead to some platform incompatibilities particularly for Windows users. It is highly recommended, therefore, that Windows users install some kind of Linux or Unix based shell to make working with `npm` a little easier.

A good example is Git BASH which is a part of the Git for Windows software suite.

```
https://gitforwindows.org/
```

You can pass additional arguments to an `npm` script by using the -- arg.


---

# Modules

Node files are referred to as modules.

## CommonJS

Node has been around for over a decade and uses the CommonJS module format. This is an older module format which predates the module format that was standardised in JavaScript in 2016.

CommonJS does not use the import and export keywords but take a slightly different approach to importing and exporting
dependencies.

The Node ecosystem is still adjusting to the newer ES2016 module format but in the meantime, we continue to recommend working with the CommonJS format for node projects.

## Module variables

Script files in Node are encapsulated as CommonJS
modules. This means that variables that are declared
within a file are **scoped** to that file and won't leak into the global scope.

For the code in one file to be able to read a value from
another file they must explicitly **import** a value that has been explicitly **exported** the other file.

To understand the way that scope works with Node modules, you need to know that when the content of a module file is loaded it autmatically gets wrapped by node by a function closure.

For example, imagine I have a file called `hello.js` which contains
```js
console.log('Hello!');
```
When Node loads the file and wraps it like this
```
function (exports, require, module, __filename, __dirname) {

  /// YOUR CODE HERE ///

  console.log('Hello!');

  /// YOUR CODE HERE ///
}
```
This means you have a scope (which in addition to the global scope object) has five values injected which are related to the current file and are **not** a part of the global scope.

```
exports       shortcut to the `exports` property of the module object
require       a function for importing from other modules
module        the module object
__filename    a full path to the file
__dirname     a full path to the file's parent directory
```

The `module` object has a number of useful properties in addition to the `exports` property. Here are the main ones.

```
id            an id for module, typically a full path to the file
exports       an object to be exported by module
filename      a full path to the file
paths         an array of paths to search when importing a module
```

### require()
Files have scopes which are isolated from one other. Apart from attaching variables to the global scope (not recommended), the way to import values into a file is with the CommonJS `require()` function. `require()` is a function that was added to the module's scope by the function wrapper mentioned earlier.

`require()` takes a file path which is either relative or absolute.

NOTE: Native JavaScript module support is coming to Node but for now we recommend using CommonJS and `require()` function rather than the JavaScript `import` and `export` keywords.

#### require() relative paths

Example

```js
const app = require('./app');
```

Relative file paths search relative to the current file. The .js file extension is optional.

NOTE: If the path refer to a directory then Node will look for a file called `index.js` and load that. If the directory contains a `package.json` which has a file specified in its `main` entry, Node will load that file.

#### require() absolute paths

Example

```js
const lodash = require('lodash');
```

Once again the .js extension is optional.

Absolute paths search for a module by name in `node_modules` directory. Any directory that has a package.json can also have a `node_modules` directory. Node will search the `node_modules` directory of each parent directory until it reaches the user's home directory.

You can see the paths that Node searches by looking at the `module.paths` object that is injected into every module.

You can examine how it works by using the Node REPL.
```
node
```
type:
```
> module.paths
[ '/workspace/start-workshop/repl/node_modules',
  '/workspace/start-workshop/node_modules',
  '/workspace/node_modules',
  '/node_modules',
  '/home/gitpod/.node_modules',
  '/home/gitpod/.node_libraries',
  '/home/gitpod/.nvm/versions/node/v10.15.3/lib/node' ]
```

An import can be anything exported from a module. It could be a value such as a number, string, array or a function. Quite often though it is an object that contains a collection of values.

### Exports
Just as imports use an injected function `require()`, exporting is done using the module `exports` object.

The `exports` object is actually just a shortcut to `module.exports` so either can be used.

`exports` is good for exporting individual values. eg.

```js
exports.x = 1;
exports.y = 2;
exports.z = 3;
```

while `module.exports` enables you to replace the entire exports object.
```
module.exports = {
  x: 1,
  y: 2,
  z: 3,
};
```

### Destructuring imports

We can import the previous example as a single object and then use the properties on the object. eg.

```js
const object = require('./module');

console.log(object.x + object.y);
```

but it's usually much clearer to destructure the parts of the object that we are interested in

```js
const { x, y } = require('./module');

console.log(x + y);
```

This leads to cleaner code.

### Import Cache

When you `require()` a module for the first time the top level code in that file runs once and assignment are made to the `module.exports` object which is passed back. This result is cached by the system so that when `require()` is called again on the same module it will return the cached version.

These cached objects are *mutable* so use them with care.

It is possible to modify the imported objects and this can affect later uses of the cached import.

Consider this example where a file `module.js` contains:

```js
module.exports = {
  x: 123,
};
```

We can import the exported object, assign it to a variable and modify it. Then when we import it again we get the modified version.

```js
const value1 = require('./module');

value1.y = 456;

const value2 = require('./module');

console.log(value2.y);
// prints out 456
```

This is *one way* to comunicate state between modules but as with global state, this is not recommended because without great care being exercised this can be a subtle source of bugs.

---

## Global scope
Global scope is available everywhere in your programs through a single varibale called `global`.

You can see `global` by
```
console.log(global);
```
But you can also start the Node REPL
and press `TAB` twice.

Global variables can also be accessed directly without using
`global`. For example the system process object can be accessed
as either `global.process` or more simply as just `process`.

The `global` prefix is implied.

Useful global variables include the entirety of JavaScript
as well as
```
console
process
os
Buffer
```
The console object
```
console.log()
console.info()
console.warn()
console.error()
console.assert(cond, msg)
```
The process object
```
process.env
process.argv
process.exit()
process.nextTick(cb)
```
The os object
```
os.tmpdir()
os.endianness()
os.hostname()
os.type()
os.platform()
os.arch()
os.release()
os.uptime()
os.loadavg()
os.totalmem()
os.freemem()
os.cpus()
os.networkInterfaces()
```

---
# Debugging with vscode

The VS Code editor has a built in Node debugger which is easy to set up. Go to the debugging tab and select Add Configuration. Select Node.js and launch.

This creates a file in the .vscode directory of your project called `launch.json`

This file contains the configuration information to debug your application. For example:

```
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}/app.js"
        }
    ]
}
```
---
# Standard API

Node has a large standard library of modules that you can use in your programs. We will be only touching on a few of them here but you can read the documentation to them here:

https://nodejs.org/api/

A thing you will notice is that many of the I/O based functions come in "Sync" and "Async" forms. Sync operations are easier to understand and think about than Async ones but in a single-threaded architecture such as Node you should nearly always use Async operations. Sync means blocking and waiting for an operation to finish. While this is OK if you're writing a script to do a simple job but for a server running on a single-threaded architecture, running Sync operations would be a disaster.

The uniqueness of Node's single-threaded architecture means that we need to do things differently if we want to be able to scale.

---

# Asynchronous operations

Asynchronous or async operations are actions that happen at some time in the future. Because node is a single-threaded architecture in which everything that happens on the main thread is synchrononous, node must relinquish control of the main thread regularly in order for asynchronous operations to get a chance of being performed.

Yielding control means letting code finish and complete tasks by being "called-back" by the system with the results of some earlier asynchronous operation.

The most common patterns for asynchronous operations in JavaScript are

* callbacks
* promises
* async/await

A callback is a familiar pattern in browser based code. For example event listeners.

Node uses the same event-driven architecture on the server to handle asynchronous operations such as file, network, database access so it's worth getting to know this pattern well.

## Callback

A node callback is a function with the signature
```
function (err, result) {

}
```
In node there is a convention where the first argument of the callback function is ALWAYS the error condition which is either null or an Error object.
The second argument is the result of the asynchronous operation.

## fs

Let's look at a concrete example with Node's standard file reading functions.

Synchronous

```
// blocks and returns a value
readFileSync(filepath, encoding)

// blocks until complete
writeFileSync(filepath, value)
```
Asynchronous
```
// doesn't block, calls back with error or value
readFile(filepath, encoding, callback)

//doesn't block, call back with error or nothing
writeFile(filepath, value, callback)
```

### "Callback Hell"

Callbacks are straightforward when asynchronous operations are isolated but can grow complicated when they needed to be chained in a sequence.

```
const createUser = function(username, password, picture, callback) {
   dataBase.createUser(username, password, (error, userID) => {
       if (error) {
           callback(error)
       } else {
           cloudinary.uploadPicture(picture, (error, path) => {
               if (error) {
                   callback(error)
               } else {
                   dataBase.updatePicture(userID, path, (error) => {
                       if (error) {
                           callback(error);
                       } else {
                           callback(null);
                       }
                   })
               }
           })
       }
   })
};

createUser('John Hardy','xyz123','avatar.jpg', (err) => {
    if (err) {
      console.log(err);
    }
    console.log('User created');
  }
);
```

## Promises

A promise is an object that contains a value, either now
or sometime in the future. Asynchronous operations take place in
function with two args which are also functions `resolve()` and `reject()`.
```
new Promise((resolve, reject) => {
  // do something

  //if success
  resolve(result)));

  //if failure
  reject(err);
});
```

## Promisify

`promisify` is a utility function that comes standard with node. It is a `high order function`
```
A High Order Function is a function which accepts a function as
its input and returns a function as its result.
```
`promisify` accepts a node function which has a callback as its last parameter and returns function which returns a promise instead
of the callback.

For example:
```
readFile('file.txt', (err, value) => {
  if (err) {
    return console.log(err);
  }
  console.log(value);
})
```
can be converted to a promise based function
```
const { promisify } = require('util');
const readFilePromise = promisify(readFile);
readFilePromise('file.txt')
  .catch(err => console.log(err))
  .then(value => console.log(value))
```

### How promisify works

the way `util.promisify` is implemented can be seen here:
```
const promisify = (func) =>
  (...args) =>
    new Promise((resolve, reject) =>
      func(...args, (err, result) =>
        (err ? reject(err) : resolve(result))
      )
    );
```
This syntax is called an `auto-curried` function which you can see from the multiple uses of the `=>` operator. You pass the node function that has the callback in its final argument e.g. `readFile` to `promisify` and it

* returns another function which when called returns a new `Promise` object.
* The `Promise` object kicks off its own function which calls the original node function
with args and passes its own callback function.
* When that function completes, the promise is either resolved or rejected based on the result of the callback.

The following example shows how to `promisify` the
functions used in the earlier example.
```
const { promisify } = require('util');

const dbCreateUser = promisify(database.createUser);
const cloudUploadPicture = promisify(cloudinary.uploadPicture);
const dbUpdatePicture = promisify(dataBase.updatePicture);
```

## Using promises

Once "promisified" these functions can be used with code that expects promises.
```
const createUser = (username, password, picture) =>
  dbCreateUser(username, password)
  .then(userID => [userID, cloudUploadPicture(picture)]
  .then(([userID, path]) => dbUpdatePicture(userID, path);

createUser('John Hardy','xyz123','avatar.jpg')
  .catch(err => console.log(err);
  .then(() => console.log('User created'));
```
Which is a lot shorter and simpler.

Except for one thing...

This example shows one of the downsides to promise syntax:
it's complex to pass around intermediate results such as `userID`. Can you understand what's going on here?

In those cases it may still be simpler to nest one `then` handler inside another `then` handler.

```
const createUser = (username, password, picture) =>
  dbCreateUser(username, password)
  .then(userID =>
    cloudUploadPicture(picture)
    .then(path => dbUpdatePicture(userID, path)
  );
```

## Async/await

This scope access issue is less of a problem with async/await syntax which we'll touch on briefly here. Async/await gives you the ability to do all of this asynchronous work in the same level of scope. Superficially it even looks like old-style imperative programming but despite this there are some gotchas with async/await and it's still necessary to understand promises in order to use it properly.

```js
const createUser = async (username, password, picture) => {
  const userID = await dbCreateUser(username, password);
  const path = await cloudUploadPicture(picture);
  await dbUpdatePicture(userID, path);
}
```

## Promise API

```
Promise.resolve(value)   returns a promise that resolves to value
Promise.reject(err)      returns a promise that rejects with err
Promise.all([p1,p1...])  returns when EVERY promise resolves
Promise.race([p1,p1...]) returns when ANY promise resolves
```
Example of a promise that returns a random number after a time delay
```
const getRandomNumber = () => new Promise((resolve) => {
  setTimeout(
    () => resolve(Math.random() * 10),
    1000
  );
});
```
A coin tossing function that uses the first function
```
const coinToss = new Promise((resolve, reject) =>
  getRandomNumber()
    .then(value => value < 0.5)
    .then(isHeads => isHeads ? resolve() : reject());
);
```
---

## Promise error handling

A key advantage of promise syntax is in error handling. Errors simply fall through and can be optionally caught by the receiver of the promise.

Chains of promises allow error conditions to be caught and even resumed. For example
```
Promise.resolve('Hello')
  .then((value) => {
    console.log(value);
    throw ('Hello error');
  })
  .catch(() => Promise.resolve('Hello recovery!'))
  .then(value => console.log(value));
```

# Serving HTTP

## http

`http` is another module that is built into Node. It provides everything needed to set up an http server. Except in very simple cases however most developers prefer to use a framework to build web servers on node. The most popular of these in called Express which we will come to shortly.

For now let's just look at setting up a very simple web server using `http`.
```
const http = require('http');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

  const { url, method } = req;

  if (method === 'POST' && url === '/users') {

    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.write(`
      {
        "users": [1,2,3]
      }
    `);
    res.end();

  } else {

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <form method='POST' action='/users'>
        Hello World!
        <p><button>OK</button></p>
      </form>
    `);
    res.end();

  }
});

server.listen(port, () =>
  console.log(`Listening on port ${port}`));
```
We can start this server by
```
node examples/http
```
By setting the PORT variable in the environment, this server can be started on another port. This is an operating system specific thing but in a bash shell you can set environment variables on the command line eg.
```
PORT=2233 node examples/http
```

# Express

While simple the `http` module lacks an easy way to configure routes and other features so you are on your own. Express is a more powerful  framework.

Here is a basic Express server.
```
const express = require('express');

const port = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
  res.send(`
    Hello World!
  `);
});

app.server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```
Which we can start with
```
node examples/express/index-1.js
```
or by specifying the PORT in the environment
```
PORT=2233 node examples/express/index.js
```
## nodemon

Because are often modifying server code we need to restart the server frequently. We can do this more coveniently by using the `nodemon` utility.

`nodemon` watches all the files in your node project and restarts the server each time.

You can install `nodemon` as a dev dependency.
```
npm i nodemon -D
```
and run it either from as a script in `package.json`
```
  "scripts": {
    "start": "PORT=2233 nodemon examples/express/index.js"
  }
```
or by using `npx`
```
PORT=2233 npx nodemon examples/express/index.js
```
### nodemon configuration

`nodemon` has many options on its command line. It's usually more convenient to set up a configuration section for `nodemon` in your `package.json`
```
"nodemonConfig": {
  "ignore": "node_modules/**/node_modules",
  "delay": 2500,
  "env": {
    "NODE_ENV": "development",
    "PORT": 4000,
    "DEBUG": "app,app*"
  }
}
```

---
# Middleware

Getting back to Express, a lot of functionality can be added to the server through so-called "middlware".

A middleware is simply a function with the signature
```
(req, res, next) => {
  //do something
  next();
}
```
Most middlewares append or modify the `req` or `res` objects. The last thing a middleware must do is call the `next()` function to pass execution on. If this is forgotten, the server will just hang.

To use a middleware, the usual thing is to call the `use()` method on the server.

