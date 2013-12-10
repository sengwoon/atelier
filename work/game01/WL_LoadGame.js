function LoadGameState(e){
	this.gameLoadingTimer = new Timer();
	this.sprGameLoading = resourcePreLoader.GetImage("img/game_loading.png");
	this.sprFrame = 0;
}

//게임 시작할때 1회 실행
LoadGameState.prototype.Init = function(){
	Context.clearRect(0, 0, 960, 576);
	soundSystem.SetVolume(0);
};

LoadGameState.prototype.Render= function(){
	Context.clearRect(0, 0, 960, 576);
	Context.globalAlpha = 1;
	Context.fillStyle = "#000000";
	Context.fillRect(0, 0, 960, 640);

	Context.drawImage(this.sprGameLoading, 160*Math.floor(this.sprFrame), 0, 160, 25, 31, 470, 160, 25);
};

LoadGameState.prototype.Update = function(){
	if(this.gameLoadingTimer.nowFrame > 2000){
		ChangeGameState( new PlayGameState("loadgame") );
	}
	this.sprFrame += 1/4;
	if(Math.floor(this.sprFrame) >= 4 )
		this.sprFrame=0;
};