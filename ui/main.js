console.log('Loaded!');

//move the image
var img=document.getElementById("img");
function moveRight(){
    marginLeft=marginLeft+1;
}
img.onclick = function(){
  var interval= setInterval(moveRight,10);
};
