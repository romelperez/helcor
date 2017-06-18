var tasks = {};

module.exports = function (name, fn) {

  if (typeof name !== 'string' || !name.length) {
    throw new Error('A valid name string is required');
  }
  if (typeof fn !== 'function') {
    throw new Error('A valid function is required as second parameter.');
  }

  var task = (tasks[name] ? tasks[name] : Promise.resolve()).then(fn, fn);

  tasks[name] = task;

  return tasks[name];
};
