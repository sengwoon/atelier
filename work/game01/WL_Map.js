function MapState(e){
	this.imgSetting = resourcePreLoader.GetImage("img/settingbutton.png");
	this.imgMap = resourcePreLoader.GetImage("img/map.png");
	this.flagMadhatter = false;
	this.imgMadhatter = resourcePreLoader.GetImage("img/map_madhatterbutton.png");
	this.imgMadhatterDown = resourcePreLoader.GetImage("img/map_madhatterbutton_down.png");
	this.previousState = e;
	this.transition = false;
	this.alpha = 1;
}

MapState.prototype.Init = function(){
	Context.clearRect(0, 0, 960, 576);
	if(this.previousState=="title")
		soundSystem.PlayBackgroundMusic("sound/bgm_ready.mp3");
};

MapState.prototype.Render= function(){
	Context.clearRect(0, 0, 960, 576);
	Context.globalAlpha = this.alpha;
	Context.drawImage(this.imgMap, 0, 0);
	Context.drawImage(this.imgSetting, 1, 1);
	if(this.flagMadhatter)
		Context.drawImage(this.imgMadhatterDown, 15, 172);
	else
		Context.drawImage(this.imgMadhatter, 15, 172);
};

MapState.prototype.UpdateUI = function(){
	if(inputSystem.mouseX>15 && inputSystem.mouseY>172 && inputSystem.mouseX<15+268 && inputSystem.mouseY<172+347){
		if(inputSystem.isMousePressed){
			if(this.flagMadhatter==false){
				this.flagMadhatter=true;
			}
		} else {
			if(this.flagMadhatter){
				soundSystem.PlaySound("sound/menuclick.mp3");
			 	this.transition = true;
			 	this.flagMadhatter=false;
			}
		}
	} else {
		this.flagMadhatter=false;
	}
};

MapState.prototype.Update = function(){
	this.UpdateUI();
	if(this.transition){
		this.alpha -= 0.08;
		if(this.alpha < 0){
			this.alpha = 0;
			ChangeGameState( new SelectState("map") ); // 버튼에 마우스가 위치한 상태에서 클릭시 실행!
		}
	}
};