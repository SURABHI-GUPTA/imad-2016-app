var Pool=require('pg').Pool;

var config={
    user: 'surabhi-gupta',
    database: 'surabhi-gupta',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
    
};

var pool = new Pool(config);
app.get('/test-db',function(req,res){
  pool.query('SELECT * FROM test', function(err,result){
      if(err){
          res.status(500).send(err.toString());
      }else{
          res.send(JSON.stringify(result));
      }
  })  
});



var img = document .getElementById('img');
var marginLeft=0;
function moveRight(){
    marginLeft=marginLeft+10;
    img.style.marginLeft= marginLeft+'px';
}
img.onclick= function(){
    var interval= setInterval(moveRight,100);
    };
// last modified
var msg = ' <b>last modified : </b> ' + document. lastModified + ' </p>' ;
var el = document .getElementByld('side');
el . innerHTML = msg ;