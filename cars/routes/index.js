var express = require('express');
var router = express.Router();
var mongoose=require('mongoose')
mongoose.connect('mongodb://NoorHassan:hotmail@ds011442.mlab.com:11442/codelab').then(function () {
    console.log("DataBase Connected")
}).catch(function (error) {
    console.log(error.message)
})
var app= express();
app.use(express.static(__dirname + '/public'));
//Data base model
var Dodge = mongoose.model('Dodge',{
  name:String,
    color:String,
    price:Number,
    img:String,
    speed:Number,
    description:String,
    seatingNo:Number,
    carsAvailable:Number,
    model:Number
    }
)

/* GET home page. */
router.get('/car', function(req, res) {
  res.render('index');
});
/* GET buy page. */
router.get('/cars', function(req, res) {
  /*  var Charger=new Dodge(
      {
          name:'Charger',
          img:'http://st.motortrend.com/uploads/sites/10/2016/09/2017-Dodge-Charger-RT-Scat-Pack-front-three-quarter-01.jpg',
          price:28.495,
          speed:707,
          seatingNo:5,
          carsAvailable:0,
          model:2017
      }
  )
Charger.save()
   var Challenger=new Dodge(
        {
            name:'Challenger',
            img:'http://gtspirit.com/wp-content/uploads/2016/11/Dodge-Shakedown-Challenger-2.jpg',
            price:26.995,
            speed:707,
            seatingNo:5,
          carsAvailable:0,
          model:2016
        }
    )
    Challenger.save()
   var dodgeDemon=new Dodge(
        {
            name:'Dodge Demon',
            img:'http://st.hotrod.com/uploads/sites/21/2017/04/042-2018-dodge-demon-1.jpg',
            price:25.521,
            speed:707,
            seatingNo:5,
          carsAvailable:0,
          model:2016,
        }
    )
    dodgeDemon.save()*/
    res.render('buy');
});
router.get('/prices', function(req, res) {
    res.render('prices');
});
router.get('/api/car',function (req,res) {
    Dodge.find(function (error,cars) {
        res.json(cars)
    })
})
router.post('/api/car',function (req,res) {
    var newCars=new Dodge(req.param('car'))
    newCars.save().then(function () {
        res.json({
            isSuccess:true,
            message:"Car Saved"
        })
    }).catch(function (error) {
        res.json({
            isSuccess:false,
            message:error.message
        })
    })
})
router.delete('/api/car',function (req,res) {
    var id=req.param('id')
    Dodge.findByIdAndRemove(id).then(function () {
        res.json({
            isSuccess:true,
            message:"Car Deleted!"
        })
    }).catch(function (error) {
        res.json({
            isSuccess:false,
            message:error.message
        })
    })
})
module.exports = router;
