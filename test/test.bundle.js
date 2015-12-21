require('es5-shim');
var context = require.context('.', true, /\.spec\.js$/);
context.keys().forEach(context);
