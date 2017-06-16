// List of tasks by name.
var list = {};

function run (name) {
  var task = list[name][0];
  if (task) {
    task();
  }
}

function createTask (name, fn) {
  return function () {
    var next = function () {
      list[name].shift();
      run(name);
    };
    return Promise.
      resolve().
      then(function () {
        return fn();
      }).
      then(next, next);
  };
}

module.exports = function (name, fn) {

  if (typeof name !== 'string' || !name.length) {
    throw new Error('A valid name string is required');
  }
  if (typeof fn !== 'function') {
    throw new Error('A valid function is required as second parameter.');
  }

  if (!list[name]) {
    list[name] = [];
  }

  list[name].push(createTask(name, fn));

  // If the only added item is the current one, run it.
  if (list[name].length === 1) {
    run(name);
  }
};
