
//   // Import ORM
//   const orm = require('../config/orm.js');

//   const burgers = {
//     all: (cb) => {
//       orm.all('burgers', (res) => cb(res));
//     },
//     create: (cols, vals, cb) => {
//       orm.create('burgers', cols, vals, (res) => cb(res));
//     },
//     update: (objColsVals, condition, cb) => {
//       orm.update('burgers', objColsVals, condition, (res) => cb(res));
//     }
//   };
  
//   // Export DB functions
//   module.exports = burgers;