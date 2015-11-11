/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulp/tasks. Any file in that folder gets automatically
  required by the loop in ./gulp/index.js (required below).

  To add a new task, simply add a new task file to gulp/tasks.

  ---
  based on: https://github.com/greypants/gulp-starter (2014.05.17)
*/

var requireDir = require('require-dir');

// Require all tasks in gulp/tasks, including subfolders
requireDir('./gulp/tasks', { recurse: true });