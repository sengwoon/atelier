var GAME_FPS;
var gameInterval;
var game_state = new LoadingState(); 
var after_loading_state;
var theCanvas, Context;
var c, g;

var imgCursor = new Image();
imgCursor.src = "img/mouse_cursor.png";

function ChangeGameState( nextGameState )
{
  // 필수 함수가 있는지 확인한다.
  if( nextGameState.Init == undefined )
    return;
  if( nextGameState.Update == undefined )
    return;
  if( nextGameState.Render == undefined )
    return;
  
  // 필수 함수가 있으면 상태 전환
  game_state = nextGameState;
  
  //초기화
  game_state.Init();
}

function Update()
{
  // 타이머 업데이트
  timerSystem.Update();
    
  // 업데이트 
  game_state.Update();

}

function Render()
{
  // 그리기
  theCanvas = document.getElementById("GameCanvas");
  Context  = theCanvas.getContext("2d");
  c = document.getElementById("CursorCanvas");
  g = c.getContext("2d");
  Context.fillStyle = "#000000";
  Context.fillRect(0, 0, 960, 640); 
  
  game_state.Render();
  
  g.clearRect(0, 0, 960, 640);
  if(inputSystem.mouseX>0 && inputSystem.mouseX<960 && inputSystem.mouseY>0 && inputSystem.mouseY<576)
    g.drawImage(imgCursor, inputSystem.mouseX, inputSystem.mouseY);
  
  if( debugSystem.debugMode )
  {
    // FPS 표시
    Context.fillStyle    = "#ffffff";   
    Context.font         = '15px Arial'; 
    Context.textBaseline = "top";
    Context.fillText( "fps : " + frameCounter.Lastfps, 10, 10 );    
  }  
}

function gameLoop()
{   
  Update();
  Render();
  
  frameCounter.countFrame();
}

