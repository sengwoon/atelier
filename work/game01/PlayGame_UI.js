var pgUI;

function PGUI(){
	this.flagSetting = false;
	this.imgSetting = resourcePreLoader.GetImage("img/settingbutton.png");
	this.imgSettingDown = resourcePreLoader.GetImage("img/settingbutton_down.png");
	this.flagLeft = false;
	this.imgUIleftbutton = resourcePreLoader.GetImage("img/game_UI_leftbutton.png");
	this.imgUIleftbuttonDown = resourcePreLoader.GetImage("img/game_UI_leftbutton_down.png");
	this.flagRight = false;
	this.imgUIrightbutton = resourcePreLoader.GetImage("img/game_UI_rightbutton.png");
	this.imgUIrightbuttonDown = resourcePreLoader.GetImage("img/game_UI_rightbutton_down.png");
	this.imgUItotal = resourcePreLoader.GetImage("img/game_UI_total.png");
	this.imgUItotalUpper = resourcePreLoader.GetImage("img/game_UI_totalupper.png");
	this.imgUIplayerHP = resourcePreLoader.GetImage("img/game_UI_player_hp.png");
	this.imgUIwardHP = resourcePreLoader.GetImage("img/game_UI_ward_hp.png");
	this.imgUIexp = resourcePreLoader.GetImage("img/game_UI_exp_gauge.png");
	
	this.UIdirection = "right"; // 케릭터 방향 조절을 위한 변수! 클릭 여부 같은 것.
	pgUI = this;
}
PGUI.prototype.Render = function(){
	Context.globalAlpha = 1;
	Context.drawImage(this.imgUItotal, 0, 0);
	
	//UI 바뀌는 소스 넣는 장소!
	Context.drawImage(this.imgUIplayerHP, 494, 448, 290*pgPlayer.HP/fullHP, 18);
	Context.drawImage(this.imgUIwardHP, 494, 498, 290*pgWard.HP/pgWard.fullHP, 12);
	Context.drawImage(this.imgUIexp, 0, 52-52*(exp/fullExp), 48, 52*(exp/fullExp), 403, 483-(52*(exp/fullExp)), 48, 52*(exp/fullExp));
	
	Context.fillStyle    = "#ffffff";
	Context.strokeStyle  = "#000000";
	Context.lineWidth	 = 6;
	Context.lineJoin	 = "round";
    Context.font         = '42px "ShowcardGothic"'; 
    Context.textBaseline = "top";
    Context.textAlign	 = "left";
    Context.strokeText( game.score, 15, 95 );
    Context.fillText( game.score, 15, 95 );
    
    Context.font         = '28px "ShowcardGothic"'; 
    this.RenderTime();

    Context.font         = '42px "ShowcardGothic"'; 
    Context.textBaseline = "bottom";
    Context.strokeText( level, 382, 482 );
    Context.fillText( level, 382, 482 );

	Context.font         = '60px "ShowcardGothic"'; 
    Context.textAlign	 = "right";
    Context.strokeText( game.kill, 439, 74 );
    Context.fillText( game.kill, 439, 74 );
	//
	
	Context.drawImage(this.imgUItotalUpper, 0, 0);
	if(this.flagLeft)
		Context.drawImage(this.imgUIleftbuttonDown, 29, 433);
	else
		Context.drawImage(this.imgUIleftbutton, 29, 433);
	if(this.flagRight)
		Context.drawImage(this.imgUIrightbuttonDown, 215, 433);
	else
		Context.drawImage(this.imgUIrightbutton, 215, 433);
	if(this.flagSetting)
		Context.drawImage(this.imgSettingDown, 1, 1);
	else
		Context.drawImage(this.imgSetting, 1, 1);
};

PGUI.prototype.RenderTime = function(){
	var countDown = game.timeLimit-Math.floor(game.playTime/1000);
	var min = parseInt(countDown/60);
	var sec = countDown%60;
	if(sec>=10){
		Context.strokeText( "0"+min+":"+sec, 15, 170 );
    	Context.fillText( "0"+min+":"+sec, 15, 170 );
    } else {
    	Context.strokeText( "0"+min+":"+"0"+sec, 15, 170 );
    	Context.fillText( "0"+min+":"+"0"+sec, 15, 170 );
    }
};
PGUI.prototype.Update = function(){
	//마우스 제어
	if(inputSystem.mouseX>29 && inputSystem.mouseY>433 && inputSystem.mouseX<29+116 && inputSystem.mouseY<433+96 && game.isPaused==false && game.isOver==false ){
		if(inputSystem.isMousePressed){
			if(this.flagLeft==false){
				this.flagLeft=true;
			}
		} else {
			if(this.flagLeft){
				this.UIdirection = "left";
				this.flagLeft=false;
				
			}
		}
	} else {
		this.flagLeft=false;
	}
	if(inputSystem.mouseX>215 && inputSystem.mouseY>433 && inputSystem.mouseX<215+116 && inputSystem.mouseY<433+96 && game.isPaused==false && game.isOver==false ){
		if(inputSystem.isMousePressed){
			if(this.flagRight==false){
				this.flagRight=true;
			}
		} else {
			if(this.flagRight){
				this.UIdirection = "right";
				this.flagRight=false;
			}
		}
	} else {
		this.flagRight=false;
	}
	//키보드 제어
	if(inputSystem.isKeyPressed[37] && game.isPaused==false && game.isOver==false){
		this.UIdirection = "left";
	}
	if(inputSystem.isKeyPressed[39] && game.isPaused==false && game.isOver==false){
		this.UIdirection = "right";
	}

	//설정 버튼 누르면 일시정지
	if(inputSystem.mouseX>1 && inputSystem.mouseY>1 && inputSystem.mouseX<1+78 && inputSystem.mouseY<1+78 && game.isOver==false){
		if(inputSystem.isMousePressed){
			if(this.flagSetting==false){
				this.flagSetting=true;
			}
		} else {
			if(this.flagSetting){
				if(game.isPaused == false){ //설정화면 구성 끝나면 true로 만드는 기능만남기고 false로 돌아가는 기능은 설정화면의 확인 버튼에 넘길 것
					game.isPaused = true;
					this.flagSetting=false;
				}else if(game.isPaused){
					game.isPaused = false;
					this.flagSetting=false;
				}
			}
		}
	} else {
		this.flagSetting=false;
	}
};
