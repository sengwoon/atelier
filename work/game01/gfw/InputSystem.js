window.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("mousedown", onMouseDown, false); // button : 0왼쪽 1휠 3오른쪽
window.addEventListener("mouseup", onMouseUp, false);
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);

function InputSystem()
{
  this.mouseX = 0;
  this.mouseY = 0;
  // 키 입력 정보 배열
  this.isKeyPressed = [];
  this.isMousePressed = false;
  return this;
}

// 키 입력 여부
InputSystem.prototype.isKeyDown = function( keyCode )
{
  if( this.isKeyPressed[keyCode] == true )
    return true;
  else
    return false;
};

InputSystem.prototype.getMousePositionX = function()
{
  return this.mouseX;
};

InputSystem.prototype.getMousePositionY = function()
{
  return this.mouseY;
};

function onMouseMove (e) 
{
  var theCanvas = document.getElementById("GameCanvas");
  
  inputSystem.mouseX = e.clientX - theCanvas.offsetLeft;
  inputSystem.mouseY = e.clientY - theCanvas.offsetTop;
}
////////////////////////////////////////////////////////////////////////
function onMouseDown (e) 
{
  inputSystem.isMousePressed = true;
}
function onMouseUp (e) 
{
  inputSystem.isMousePressed = false;
}
////////////////////////////////////////////////////////////////////////
function onKeyDown( e )
{
  inputSystem.isKeyPressed[e.keyCode] = true; 
}

function onKeyUp( e )
{
  inputSystem.isKeyPressed[e.keyCode] = false;  
}

var inputSystem = new InputSystem();
