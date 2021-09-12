const { response } = require('express');
var express = require('express');
var dbAbstractionLayer = require('../public/javascripts/DbAbstractionLayer');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  // //setTimeout(() => {
    
  //   let jsonResponse ={
  //     "handsetCards":  [
  //       { imageName:'offer1',title: '10% off on Footwears', cols: 2, rows: 1 },
  //       { imageName:'offer2',title: 'flash sales in ladies wear', cols: 2, rows: 1 },
  //       { imageName:'offer3',title: "Special discount on men's clothes", cols: 2, rows: 1 },
  //       { imageName:'offer4',title: '5% discount for Cosmetics ', cols: 2, rows: 1 }
  //     ],
  //     "webCards":  [
  //       {imageName:'offer1', title: '10% off on Footwears', cols: 2, rows: 1 },
  //       {imageName:'offer2', title: 'flash sales in ladies wear', cols: 1, rows: 1 },
  //       {imageName:'offer3', title: "Special discount on men's clothes", cols: 1, rows: 2 },
  //       {imageName:'offer4', title: '5% discount for Cosmetics', cols: 1, rows: 1 }
  //     ]
  //   };
  //   res.json(jsonResponse);
    
  // }, 3000);

  dbAbstractionLayer.queryDealsCollection().then(response=>{
    res.json(response);
  }).catch(error=>{
    res.status(500).json({});

  })

  });




module.exports = router;
