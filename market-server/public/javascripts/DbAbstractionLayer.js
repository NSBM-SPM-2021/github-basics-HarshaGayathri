var mongodb = require('mongodb');

var connected = false;
var db = null;

mongodb.MongoClient.connect("mongodb+srv://harsha:251773@market.bhneh.mongodb.net/market?retryWrites=true&w=majority",
{
    useUnifiedTopology:true,
    useNewUrlParser: true
}).then(connection=>{
    connected = true;
    db = connection.db('market')

    console.log("DB connection successful");
}).catch(error=>{
    console.log("Error in connecting to DB");

});


async function queryDealsCollection(){
    if (connected){
      
        
    let jsonResponse ={
      "handsetCards":  [],
      "webCards":  [ ]
    };

    const dealsCollectionArray = await db.collection('DEALS').find().toArray();

    dealsCollectionArray.forEach(element => {
        let handsetElement = {}
            handsetElement['imageName'] = element['imageName'];
            handsetElement['title'] = element['title'];
            handsetElement['rows'] = element['handsetRows'];
            handsetElement['cols'] = element['handsetCols'];
            jsonResponse.handsetCards.push(handsetElement);

        let webElement = {};
        webElement['imageName'] = element['imageName'];
        webElement['title'] = element['title'];
        webElement['rows'] = element['webRows'];
        webElement['cols'] = element['webClos'];
        jsonResponse.webCards.push(webElement);
    });

    return jsonResponse;

    }else{
        return null;
    }

}

module.exports = { queryDealsCollection };