var game;

function PlayGameState(){
	this.UI = new PGUI();
	this.player = new PGPlayer();
	this.npc = new PGNPC();
	this.ward = new PGWard();
	this.timeLimit = 240;
	this.playTime = 0;
	this.onGoingTo = "stop"; // 배경화면이 움직이고 있는지 여부
	this.speed = 5; // 플레이어와 동일한 스피드로, 배경이 움직일때만 적용되는 스피드.
	this.score = 0;
	this.kill = 0;
	this.coinGain = 0;
	this.isPaused = false;
	this.isOver = false;
	this.transition = 1; // 1은 들어올때, 2는 나갈때
	this.transAlpha = 1;
	
	
	this.msgCoin = resourcePreLoader.GetImage("img/message_coin.png");
	this.msgExp = resourcePreLoader.GetImage("img/message_exp.png");
	this.msgLevelUp = resourcePreLoader.GetImage("img/message_level_up.png");
	this.msgScore = resourcePreLoader.GetImage("img/message_score.png");
	this.arrMessage = new Array();
	
	//배경
	this.imgBackground00 = resourcePreLoader.GetImage("img/game_background_00.png");
	this.imgBackground01 = resourcePreLoader.GetImage("img/game_background_01.png");
	this.imgBackground02 = resourcePreLoader.GetImage("img/game_background_02.png");
	this.imgBackground03 = resourcePreLoader.GetImage("img/game_background_03.png");
	this.imgBackgroundLeftside = resourcePreLoader.GetImage("img/game_background_leftside.png");
	this.imgBackgroundRightside = resourcePreLoader.GetImage("img/game_background_rightside.png");
	this.BG00x=-960;
	this.BG01x=-960;
	this.BG02x=-960;
	this.BG03x=-960;

	//NPC위치 알리미
	this.imgNotifyEnemydiaLeft = resourcePreLoader.GetImage("img/game_notify_enemydia_left.png");
	this.imgNotifyEnemydiaRight = resourcePreLoader.GetImage("img/game_notify_enemydia_right.png");
	this.imgNotifyItemLeft = resourcePreLoader.GetImage("img/game_notify_item_left.png");
	this.imgNotifyItemRight = resourcePreLoader.GetImage("img/game_notify_item_right.png");
	this.imgNotifyWardLeft = resourcePreLoader.GetImage("img/game_notify_ward_left.png");
	this.imgNotifyWardRight = resourcePreLoader.GetImage("img/game_notify_ward_right.png");
	this.imgNotifyWardLeftBeat = resourcePreLoader.GetImage("img/game_notify_ward_left_beat.png");
	this.imgNotifyWardRightBeat = resourcePreLoader.GetImage("img/game_notify_ward_right_beat.png");
	
	//게임 결과 확인 창 관련
	this.resultSort;
	this.resultFrame =0;
	this.pauseAlpha=0; // 일시정지화면, 게임종료 화면의 검은 화면 출력
	this.resultAlpha = 0; // 게임 종료후 종료 원인 표시용
	this.imgOver = resourcePreLoader.GetImage("img/game_over.png");
	this.imgScrollUpper = resourcePreLoader.GetImage("img/game_over_scroll_upper.png");
	this.imgScrollLower = resourcePreLoader.GetImage("img/game_over_scroll_lower.png");
	this.imgScrollButton = resourcePreLoader.GetImage("img/game_over_scroll_button.png");
	this.imgScrollButtonDown = resourcePreLoader.GetImage("img/game_over_scroll_button_down.png");
	this.scrollY = 188;
	this.isScrollOpened = false; // 스크롤이 펼쳐졌는지 여부
	this.flagScrollButton = false; //확인 버튼 눌렀는지 여부
	this.scoreRender =0;
	this.coinGainRender =0;
			
	soundSystem.PlayBackgroundMusic("sound/bgm_ready.mp3");
	game = this;
}

//게임 시작할때 1회 실행
PlayGameState.prototype.Init = function(){
	Context.clearRect(0, 0, 960, 576);
	this.playTime = 0;
	this.player.HP=fullHP;
	//기본 적 세마리
	this.npc.AddObject( "diaLeft", 1000, 314, level );
	this.npc.AddObject( "diaLeft", 1600, 314, level );
	this.npc.AddObject( "diaRight", -400, 314, level );
	soundSystem.PlayBackgroundMusic("sound/bgm_play.mp3");
	soundSystem.SetVolume(1);
};
//게임 화면 출력
PlayGameState.prototype.Render= function(){
	Context.clearRect(0, 0, 960, 576);
	Context.globalAlpha = 1;
	Context.drawImage(this.imgBackground00, -this.BG00x, 0, 960, 576, 0, 0, 960, 576);
	Context.drawImage(this.imgBackground01, -this.BG01x, 0, 960, 576, 0, 0, 960, 576);
	Context.drawImage(this.imgBackground02, -this.BG02x, 0, 960, 576, 0, 0, 960, 576);
	Context.drawImage(this.imgBackground03, -this.BG03x, 0, 960, 576, 0, 0, 960, 576);
	
	this.ward.Render();
	this.npc.Render();
	this.player.Render();
	for(var i=0; i<this.arrMessage.length; i++){
		if( (this.arrMessage[i].x>-100)&&(this.arrMessage[i].x<960) ){
			Context.globalAlpha = 1;
			Context.fillStyle   = "#ffffff";
			Context.strokeStyle = "#000000";
			Context.lineWidth	= 4;
			Context.lineJoin	= "round";
			Context.font		= '18px "ShowcardGothic"';
			Context.textBaseline = "top";
   		 	Context.textAlign	 = "center";
			if ( this.arrMessage[i].sort == "level"){
				Context.drawImage(this.msgLevelUp, this.arrMessage[i].x, this.arrMessage[i].y);
			} else {
				Context.strokeText( "+"+this.arrMessage[i].text, this.arrMessage[i].x+(this.arrMessage[i].textWidth/2), this.arrMessage[i].y);
				Context.fillText( "+"+this.arrMessage[i].text, this.arrMessage[i].x+(this.arrMessage[i].textWidth/2), this.arrMessage[i].y);
				if( this.arrMessage[i].sort == "score")
					Context.drawImage(this.msgScore, this.arrMessage[i].x+this.arrMessage[i].textWidth, this.arrMessage[i].y+2);
				else if ( this.arrMessage[i].sort == "exp")
					Context.drawImage(this.msgExp, this.arrMessage[i].x+this.arrMessage[i].textWidth, this.arrMessage[i].y+2);
				else if ( this.arrMessage[i].sort == "coin")
					Context.drawImage(this.msgCoin, this.arrMessage[i].x+this.arrMessage[i].textWidth, this.arrMessage[i].y+2);
			}
		}
	}
	if(this.BG03x>=-540)
		Context.drawImage(this.imgBackgroundLeftside, this.BG03x, 0);
	if(this.BG03x<=-(1920-486))
		Context.drawImage(this.imgBackgroundRightside, this.BG03x+2880-486, 0);
	//NPC위치 알리미
	this.Notify();
	//UI
	this.UI.Render();
	//게임이 끝나거나 일시정지일 때 화면 어둡게
	if(this.isOver || this.isPaused){
		Context.globalAlpha = this.pauseAlpha;
		Context.fillStyle ="#000000";
		Context.fillRect(0, 0, 960, 576);
	}
	//결과창
	if(this.isOver){
		//게임 업데이트를 멈추므로 결과 업데이트를 렌더에서 실행
		this.ResultUpdate();
		//종료 원인 표시
		if(this.resultSort=="playerDie"){
			Context.globalAlpha = this.resultAlpha;
			Context.fillStyle="#ff3f3f";
			Context.fillRect(494, 448, 290, 18);
		} else if(this.resultSort=="wardDie"){
			Context.globalAlpha = this.resultAlpha;
			Context.fillStyle="#ff3f3f";
			Context.fillRect(494, 498, 290, 12);
		}
		if(this.resultFrame>2000){
			Context.globalAlpha = 1;
			Context.drawImage(this.imgScrollUpper, 0, 0, 592, 456-this.scrollY*2, 184, this.scrollY, 592, 456-this.scrollY*2);
			Context.drawImage(this.imgScrollLower, 184, 456-this.scrollY );
			if(this.isScrollOpened){
				Context.fillStyle    = "#ffffff";
    			Context.font         = '56px "AgendaBold"'; 
    			Context.textBaseline = "bottom";
    			Context.textAlign	 = "right";
    			Context.fillText( this.scoreRender, 690, 178 );
    			Context.fillText( this.coinGainRender, 690, 247 );
    			if(this.flagScrollButton)
					Context.drawImage(this.imgScrollButtonDown, 360, 342);
				else
					Context.drawImage(this.imgScrollButton, 360, 342);
			}
		}
	}
	
	/* //변수 테스트
	Context.fillStyle    = "red";
    Context.font         = '20px Arial'; 
    Context.textBaseline = "top";
    Context.fillText( "플레이어 x : " + this.player.x, 600, 10 );
    Context.fillText( "플레이어 무적임? : " + this.player.isUnbeatable, 600, 35 );
    */
    if(this.transition ==1){
    	Context.globalAlpha = this.transAlpha;
    	Context.fillStyle="#000000";
    	Context.fillRect(0, 0, 960, 576);
    }
};
//게임 작동 로직
PlayGameState.prototype.Update = function(){
	//일시정지를 제어할 수 있게 isPauseed에 영향받지 않는 밖에서 실행
	if(this.isPaused){
		this.pauseAlpha = 0.6;
		this.UI.Update();
	} else {
		//게임 오버되면 게임 작동은 멈춤
		if(this.isOver){
			clearInterval(gameInterval);
			gameInterval = setInterval( gameLoop, 1000 / (GAME_FPS/2) );
			if(this.resultFrame>2000)
				return;
		}
		this.pauseAlpha = 0;
		//디펜스로써, 시간이 지나면 게임 끝!
		if(this.playTime>=240000){
			for(var i=0; i<this.npc.arrNPC.length; i++){
				if((this.npc.arrNPC[i].sort=="diaLeft")||(this.npc.arrNPC[i].sort=="diaRight")){
					this.npc.arrNPC[i].HP = 0;
				}
			}
			this.isOver = true;
			this.resultSort="clear";
		} else {
			this.playTime += (1000/GAME_FPS);
		}
		//시작할때 트렌지션
		if(this.transition ==1){
			this.transAlpha -= 0.16;
			if(this.transAlpha < 0){
				this.transAlpha = 0;
				this.transition =0;
			}
		}
		//플레이어 가는 방향에 따라 배경 움직임 , 한계점에 다다르면 배경 움직임 멈춤
		if(this.player.playerOnGoingTo == "right"){
			this.onGoingTo="right";
			this.BG00x -=1;
			if(this.BG00x<-1152) this.BG00x = -1152;
			this.BG01x -=2;
			if(this.BG01x<-1344) this.BG01x = -1344;
			this.BG02x -=4;
			if(this.BG02x<-1728) this.BG02x = -1728;
			this.BG03x -=this.speed;
			if(this.BG03x<-1920) {
				this.BG03x = -1920;
				this.onGoingTo = "stop";
			}
		} else if (this.player.playerOnGoingTo == "left"){
			this.onGoingTo="left";
			this.BG00x +=1;
			if(this.BG00x> -768) this.BG00x = -768;
			this.BG01x +=2;
			if(this.BG01x> -576) this.BG01x = -576;
			this.BG02x +=4;
			if(this.BG02x> -192) this.BG02x = -192;
			this.BG03x +=this.speed;
			if(this.BG03x> 0) {
				this.BG03x = 0;
				this.onGoingTo = "stop";
			}
		} else {
			this.onGoingTo = "stop";
		}
		this.UI.Update();
		this.ward.Update();
		this.npc.Update();
		this.player.Update();

		for(var i=0; i<this.arrMessage.length; i++){
			this.arrMessage[i].spliceFrame += (1000/GAME_FPS);
			this.arrMessage[i].y -= 2;
			if(game.onGoingTo=="right") this.arrMessage[i].x -= this.speed;
			if(game.onGoingTo=="left") this.arrMessage[i].x += this.speed;
			//this.arrMessage[i].Update();
			if(this.arrMessage[i].spliceFrame>700) this.arrMessage.splice(i, 1);
		}
		
		//npc(적, 아이템)과 플레이어간의 충돌 제어
		this.npc.CheckCollision( this.player );
		for(var i=0; i<this.npc.arrNPC.length; i++){
			if( ((this.npc.arrNPC[i].sort == "diaRight") || (this.npc.arrNPC[i].sort == "diaLeft")) && this.npc.arrNPC[i].HP>0 ){
				if(this.npc.arrNPC[i].isBeating){
					if( this.player.isUnbeatable == false ){
						soundSystem.PlaySound("sound/attacked.mp3");
						this.player.unbeatableFrame = 0;
						this.player.HP-=this.npc.arrNPC[i].power;
						if(this.player.HP<=0){
							this.player.HP = 0;
							this.resultSort="playerDie";
							this.isOver = true;
						}
					}
				}
			}
		}
		//npc(적)과 와드 간의 충돌 제어
		this.npc.CheckCollision( this.ward );
		for(var i=0; i<this.npc.arrNPC.length; i++){
			if( ((this.npc.arrNPC[i].sort == "diaRight") || (this.npc.arrNPC[i].sort == "diaLeft")) && this.npc.arrNPC[i].HP>0 ){
				if(this.npc.arrNPC[i].isBeating){
					if( this.ward.isUnbeatable == false ){
						soundSystem.PlaySound("sound/attacked.mp3");
						this.ward.unbeatableFrame = 0;
						this.ward.HP-=this.npc.arrNPC[i].power;
						if(this.ward.HP<=0){
							this.ward.HP = 0;
							this.resultSort="wardDie";
							this.isOver = true;
						}
					}
				}
			}
		}
		//적이 스킬과 스플레시 데미지에 맞는지 여부 체크
		this.npc.CheckBeated();
		this.npc.CheckSplash();
	}
};

PlayGameState.prototype.Message = function( _sort, _x, _y, _gain){
	var obj={};
	Context.font  = '18px "ShowcardGothic"';
	var metrics = Context.measureText("+"+_gain);
	obj.textWidth = metrics.width;
	obj.text=_gain;
	obj.x =_x;
	obj.y =_y;
	obj.sort = _sort;
	obj.spliceFrame = 0;
	this.arrMessage.push(obj);
};

//NPC, 와드 위치
PlayGameState.prototype.Notify = function(){
	//적, 코인
	for(var i=0; i<this.npc.arrNPC.length; i++){
		var methodX=this.npc.arrNPC[i].x;
		var relY;
		if( (this.npc.arrNPC[i].x<-64)&&(this.npc.arrNPC[i].x>this.BG03x+350 ) ){
			if(methodX<-960) methodX=-960;
			relY=(methodX+1680)/6;
			Context.globalAlpha=0.8;
			if(this.npc.arrNPC[i].sort=="coin"){
				Context.globalAlpha=0.8;
				Context.drawImage(this.imgNotifyItemLeft, 40, relY);
			}
			if( (this.npc.arrNPC[i].sort=="diaRight" || this.npc.arrNPC[i].sort=="diaLeft")&&(this.npc.arrNPC[i].HP>0) ){
				Context.globalAlpha=0.8;
				Context.drawImage(this.imgNotifyEnemydiaLeft, 40, relY);
			}
		}
		if( (this.npc.arrNPC[i].x>960)&&(this.npc.arrNPC[i].x<this.BG03x+2880-350 ) ){
			if(methodX>1860) methodX=1860;
			relY=(2580-methodX)/6;
			if(this.npc.arrNPC[i].sort=="coin"){
				Context.globalAlpha=0.8;
				Context.drawImage(this.imgNotifyItemRight, 820, relY);
			}
			if( (this.npc.arrNPC[i].sort=="diaRight" || this.npc.arrNPC[i].sort=="diaLeft")&&(this.npc.arrNPC[i].HP>0) ){
				Context.globalAlpha=0.8;
				Context.drawImage(this.imgNotifyEnemydiaRight, 820, relY);
			}
		}
	}
	//와드
	if( (this.ward.x<-47)||(this.ward.x>960) ){
		var methodX=this.ward.x-this.ward.speed;
		var relY;
		if(this.ward.x<-47){
			relY=(methodX+1680)/6;
			Context.globalAlpha=0.8;
			if(this.ward.unbeatableFrame<3000)
				Context.drawImage(this.imgNotifyWardLeftBeat, 40, relY);
			else
				Context.drawImage(this.imgNotifyWardLeft, 40, relY);
		}
		if (this.ward.x>960){
			relY=(2580-methodX)/6;
			Context.globalAlpha=0.8;
			if(this.ward.unbeatableFrame<3000)
				Context.drawImage(this.imgNotifyWardRightBeat, 820, relY);
			else
				Context.drawImage(this.imgNotifyWardRight, 820, relY);
		}

	}
};
//게임 결과 확인
PlayGameState.prototype.ResultUpdate = function(){
	this.resultFrame += 1000/(GAME_FPS/2);
	var alphaSin = Math.sin(this.resultFrame*0.2);
	this.resultAlpha = (alphaSin+2)*0.25;

	if(this.resultFrame>2000){
		clearInterval(gameInterval);
		gameInterval = setInterval( gameLoop, 1000 / GAME_FPS );
		this.resultAlpha=0;
		this.pauseAlpha+=0.1;
		if(this.pauseAlpha>0.6) this.pauseAlpha=0.6;

		this.scrollY -=20;
		if(this.scrollY < 16) {
			this.scrollY = 16;
			this.isScrollOpened = true;
		} else {
			this.isScrollOpened = false;
		}
		if(this.isScrollOpened){
			this.scoreRender +=100;
			if(this.scoreRender > this.score) this.scoreRender = this.score;
			this.coinGainRender +=100;
			if(this.coinGainRender > this.coinGain) this.coinGainRender = this.coinGain;
			
			if( (this.scoreRender==this.score)&&(this.coinGainRender==this.coinGain) ){
				if( (inputSystem.mouseX>360) && (inputSystem.mouseX<342+240) && (inputSystem.mouseY>342) && (inputSystem.mouseY<342+90) ){
					if(inputSystem.isMousePressed){
						if(this.flagScrollButton==false){
							this.flagScrollButton=true;
						}
					} else {
						if(this.flagScrollButton){
						soundSystem.PlaySound("sound/menuclick.mp3");
						this.transition =2;
						}
					}
				}
			}
		}
		if(this.transition ==2){
			this.transAlpha += 0.16;
			if(this.transAlpha >1){
				this.transAlpha = 1;
				ChangeGameState( new SelectState("game") );
			}
		}
	}
};