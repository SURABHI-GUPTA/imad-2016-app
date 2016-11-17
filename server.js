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