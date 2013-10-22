var Sequelize = require('sequelize');
var config    = require('config').database;  // we use node-config to handle environments

// initialize database connection
var sequelize = new Sequelize(
  config.name,
  config.username,
  config.password,
  config.options
);

// load models
var models = [
  'User'
];
models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// export connection
module.exports.sequelize = sequelize;
