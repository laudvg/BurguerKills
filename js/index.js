window.onload = function() {
  document.querySelector("#instructions").onclick =function(){
    document.querySelector("#instructions").style.display ="none";
    document.querySelector("#canvas").style.display="block";
    Game.init()
  }
  }