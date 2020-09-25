// Import express create express route
const express = require('express');
const router = express.Router();

// // Import burgers from models
// const burger = require('../models/burgers.js');

// // Routes
// router.get('/', (req, res) => {
//     burger.all((data) => {
//     //  Make object housing burger data (from Database)
//       let hbsObj = {
//         burgers: data
//       };
//     //  Create new view in index using handlebars object
//       res.render('index', hbsObj);
//     });
//   });
  
//   // Make new burger
//   router.post('/api/burgers', (req, res) => {
//     burger.create(
//       ['name', 'isDevoured'],
//       [req.body.name, req.body.isDevoured],
//       (result) => {
//         // Return ID of new burger
//         res.json({ id: result.insertId });
//       }
//     );
//   });
  
//   // Changing the isDevoured boolean
//   router.put('/api/burgers/:id', (req, res) => {
//     let condition = `id = ${req.params.id}`;
  
//     burger.update(
//       {
//         isDevoured: req.body.isDevoured
//       },
//       condition,
//       (result) => {
//         if (result.changedRows == 0) {
//           return res.status(404).end();
//         } else res.status(200).end();
//       }
//     );
  
//     res.end();
//   });

// Export router for server
module.exports = router;