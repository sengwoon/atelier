function TitleState(){
	this.imgLoading = resourcePreLoader.GetImage("img/loading.png");
	this.imgMap = resourcePreLoader.GetImage("img/map.png");
	this.flagLogin1 = false;
	this.imgLogin1 = resourcePreLoader.GetImage("img/loading_loginbutton_01.png");
	this.imgLogin1Down = resourcePreLoader.GetImage("img/loading_loginbutton_01_down.png");
	this.flagLogin2 = false;
	this.imgLogin2 = resourcePreLoader.GetImage("img/loading_loginbutton_02.png");
	this.imgLogin2Down = resourcePreLoader.GetImage("img/loading_loginbutton_02_down.png");
	this.transition = false;
	this.alpha = 1;
	this.isError = false;
	this.imgError = resourcePreLoader.GetImage("img/error.png");
	this.flagClick = false;
}

TitleState.prototype.Init = function(){
	
};

TitleState.prototype.Render= function(){
	Context.globalAlpha = 1;
	Context.drawImage(this.imgMap, 0, 0);
	Context.globalAlpha = this.alpha;
	Context.drawImage(this.imgLoading, 0, 0);
	if(this.flagLogin1)
		Context.drawImage(this.imgLogin1Down, 10, 395);
	else
		Context.drawImage(this.imgLogin1, 10, 395);
	if(this.flagLogin2)
		Context.drawImage(this.imgLogin2Down, 10, 465);
	else
		Context.drawImage(this.imgLogin2, 10, 465);

	if(this.isError){
		Context.globalAlpha = 0.6;
		Context.fillStyle="#000000";
		Context.fillRect(0, 0, 960, 576);
		Context.globalAlpha = 1;
		Context.drawImage(this.imgError, 280, 251);
	}
};

TitleState.prototype.UpdateUI = function(){
	if(this.isError==false){
		if(inputSystem.mouseX>10 && inputSystem.mouseY>395 && inputSystem.mouseX<10+262 && inputSystem.mouseY<395+64){
			if(inputSystem.isMousePressed){
				if(this.flagLogin1==false){
					this.flagLogin1=true;
				}
			} else {
				if(this.flagLogin1){
					soundSystem.PlaySound("sound/menuclick.mp3");
					this.transition = true;
					this.flagLogin1=false;
				}
			}
		} else {
			this.flagLogin1=false;
		}	

		if(inputSystem.mouseX>10 && inputSystem.mouseY>465 && inputSystem.mouseX<10+262 && inputSystem.mouseY<465+64){
			if(inputSystem.isMousePressed){
				if(this.flagLogin2==false){
					this.flagLogin2=true;
				}
			} else {
				if(this.flagLogin2){
					soundSystem.PlaySound("sound/menuclick.mp3");
					this.isError = true;
					this.flagLogin2=false;
				}
			}
		} else {
			this.flagLogin2=false;
		}
	} else if(this.isError){
		if(inputSystem.isMousePressed){
			if(this.flagClick==false){
				this.flagClick=true;
			}
		} else {
			if(this.flagClick){
				this.isError = false;
				this.flagClick=false;
			}
		}
	}
};

TitleState.prototype.Update = function(){
	this.UpdateUI();
	if(this.transition){
		this.alpha -= 0.04;
		if(this.alpha <0){
			this.alpha = 0;
			ChangeGameState( new MapState("title") ); // 버튼에 마우스가 위치한 상태에서 클릭시 실행!
		}
	}
};