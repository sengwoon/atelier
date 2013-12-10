var select;
function SelectState(e){
	this.flagSettingButton = false;
	this.imgSetting = resourcePreLoader.GetImage("img/settingbutton.png");
	this.imgSettingDown = resourcePreLoader.GetImage("img/settingbutton_down.png");
	this.flagBackButton = false;
	this.imgBack = resourcePreLoader.GetImage("img/backbutton.png");
	this.imgBackDown = resourcePreLoader.GetImage("img/backbutton_down.png");
	this.imgSelect = resourcePreLoader.GetImage("img/select.png");
	this.selectMode = 0; //0:아무것도 선택안됨 / 1: 게임모드 / 2:데이터모드
	this.flagBackground = false; //스크롤이 열린 상태에서 배경을 눌렀는지 여부
	this.flagGameButton = false; // 버튼 눌렸는지 여부!
	this.imgGameButtonOn = resourcePreLoader.GetImage("img/select_gamebutton_on.png");
    this.imgGameButtonOff = resourcePreLoader.GetImage("img/select_gamebutton_off.png");
    this.flagDataButton = false; // 버튼 눌렸는지 여부!
    this.imgDataButtonOn = resourcePreLoader.GetImage("img/select_databutton_on.png");
    this.imgDataButtonOff = resourcePreLoader.GetImage("img/select_databutton_off.png");
    //게임 스크롤
    this.gameScrollY = -650;
    this.isGameScrollOpened = false; // 펼쳐져있는지여부
    this.imgGameScroll = resourcePreLoader.GetImage("img/select_gamescroll.png");
    this.imgGameScrollMask = resourcePreLoader.GetImage("img/select_gamescroll_mask.png");
    this.flagShopButton = false;
    this.imgShop = resourcePreLoader.GetImage("img/select_gamescroll_shop.png");
    this.imgShopDown = resourcePreLoader.GetImage("img/select_gamescroll_shop_down.png");
    this.flagStage2Button = false;
    this.imgStage2 = resourcePreLoader.GetImage("img/select_gamescroll_stage02.png");
    this.imgStage2Down = resourcePreLoader.GetImage("img/select_gamescroll_stage02_down.png");
	this.flagStage3Button = false;
    this.imgStage3 = resourcePreLoader.GetImage("img/select_gamescroll_stage03.png");
    this.imgStage3Down = resourcePreLoader.GetImage("img/select_gamescroll_stage03_down.png");
    this.flagGameStartButton = false; // 게임 스타트 버튼 눌렸는지 여부
    this.imgGameStart = resourcePreLoader.GetImage("img/select_gamescroll_startbutton.png");
    this.imgGameStartDown = resourcePreLoader.GetImage("img/select_gamescroll_startbutton_down.png");
    //데이터 스크롤
    this.dataScrollY = -260;
    this.isDataScrollOpened = false; // 펼쳐져있는지여부
    this.imgDataScroll = resourcePreLoader.GetImage("img/select_datascroll.png");
    this.imgDataScrollMask = resourcePreLoader.GetImage("img/select_datascroll_mask.png");
    this.DataMode = 0; // 0은 전송, 1은 수령모드
    this.flagDataSendButton = false; //전송모드가 켜진상태에서 전송버턴을 눌렀는지
    this.flagDataReceiveButton = false; //수령 모드가 켜진 상태에서 전송버튼을 눌렀는지
    this.imgDataSendOn = resourcePreLoader.GetImage("img/select_datascroll_sendbutton_on.png");
    this.imgDataSendOnDown = resourcePreLoader.GetImage("img/select_datascroll_sendbutton_on_down.png");
    this.imgDataSendOff = resourcePreLoader.GetImage("img/select_datascroll_sendbutton_off.png");
    this.imgDataSendOffDown = resourcePreLoader.GetImage("img/select_datascroll_sendbutton_off_down.png");
	this.imgDataReceiveOn = resourcePreLoader.GetImage("img/select_datascroll_receivebutton_on.png");
    this.imgDataReceiveOnDown = resourcePreLoader.GetImage("img/select_datascroll_receivebutton_on_down.png");
    this.imgDataReceiveOff = resourcePreLoader.GetImage("img/select_datascroll_receivebutton_off.png");
    this.imgDataReceiveOffDown = resourcePreLoader.GetImage("img/select_datascroll_receivebutton_off_down.png");

    this.isError = false;
	this.imgError = resourcePreLoader.GetImage("img/error.png");
	this.flagClick = false;
    
    //게임 모드에서 바뀔때 음악 다시 재생!
    this.previousState = e;
    
    this.transition = 1; // 1은 들어올때, 2는 맵으로 다시 나갈때, 3은 게임으로 나갈때
	this.alpha = 0;
	this.transitionX = 960;
    select = this;
}

SelectState.prototype.Init = function(){
	Context.clearRect(0, 0, 960, 576);
	if(this.previousState=="game"){
		soundSystem.PlayBackgroundMusic("sound/bgm_ready.mp3");
		this.selectMode=1;
		this.gameScrollY = 64;
		this.isGameScrollOpened=true;
	}
};

SelectState.prototype.Render= function(){
	Context.clearRect(0, 0, 960, 576);
	//배경
	Context.globalAlpha = this.alpha;
	Context.drawImage(this.imgSelect, 0, 0);
	//세팅 버튼
	if(this.flagSettingButton)
		Context.drawImage(this.imgSettingDown, 1, 1);
	else
		Context.drawImage(this.imgSetting, 1, 1);
	//뒤로가기 버튼
	if(this.flagBackButton)	
		Context.drawImage(this.imgBackDown, 5, 89);
	else
		Context.drawImage(this.imgBack, 5, 89);
		
	//데이터 스크롤
	Context.drawImage(this.imgDataScroll, 423, this.dataScrollY); // -260 ~ 251
	if( this.DataMode==0){ //전송모드
		if(this.flagDataSendButton)
			Context.drawImage(this.imgDataSendOnDown, 456, this.dataScrollY+71);
		else
			Context.drawImage(this.imgDataSendOn, 456, this.dataScrollY+71);
		if(this.flagDataReceiveButton)
			Context.drawImage(this.imgDataReceiveOffDown, 456, this.dataScrollY+219);
		else
			Context.drawImage(this.imgDataReceiveOff, 456, this.dataScrollY+219);
	} else if( this.DataMode==1) { //수령모드
		if(this.flagDataReceiveButton)
			Context.drawImage(this.imgDataReceiveOnDown, 456, this.dataScrollY+219);
		else
			Context.drawImage(this.imgDataReceiveOn, 456, this.dataScrollY+219);
		if(this.flagDataSendButton)
			Context.drawImage(this.imgDataSendOffDown, 456, this.dataScrollY+71);
		else
			Context.drawImage(this.imgDataSendOff, 456, this.dataScrollY+71);
	}
	//데이터 스크롤 마스킹
	Context.drawImage(this.imgDataScrollMask, 400, 0);
	
	//데이터 스크롤 버튼
	if(this.selectMode==0){
		if(this.flagDataButton)
			Context.drawImage(this.imgDataButtonOff, 371, 142);
		else
			Context.drawImage(this.imgDataButtonOn, 371, 142);
	} else if (this.selectMode==1){
		Context.drawImage(this.imgDataButtonOff, 371, 142);
	} else if (this.selectMode==2){
		Context.drawImage(this.imgDataButtonOn, 371, 142);
	}
	
	
	//게임 스크롤
	Context.drawImage(this.imgGameScroll, 423, this.gameScrollY);
	if( (this.selectMode==1)&&this.isGameScrollOpened ){
		if(this.flagStage2Button)
    		Context.drawImage(this.imgStage2Down, 588, 122);
    	else 
    		Context.drawImage(this.imgStage2, 588, 122);
    	if(this.flagStage3Button)
    	    Context.drawImage(this.imgStage3Down, 715, 122);
    	else
			Context.drawImage(this.imgStage3, 715, 122);
		if(this.flagShopButton)
			Context.drawImage(this.imgShopDown, 721, 251);
		else
			Context.drawImage(this.imgShop, 721, 251);
		if(this.flagGameStartButton)
			Context.drawImage(this.imgGameStartDown, 458, 303);
		else
			Context.drawImage(this.imgGameStart, 458, 303);
	}
	//게임 스크롤 마스킹
	Context.drawImage(this.imgGameScrollMask, 400, 0);
	
	//게임 스크롤 버튼
	if(this.selectMode==0){
		if(this.flagGameButton)
			Context.drawImage(this.imgGameButtonOff, 371, 11);
		else
			Context.drawImage(this.imgGameButtonOn, 371, 11);
	} else if (this.selectMode==1){
		Context.drawImage(this.imgGameButtonOn, 371, 11);
	} else if (this.selectMode==2){
		Context.drawImage(this.imgGameButtonOff, 371, 11);
	}

	if(this.isError){
		Context.globalAlpha = 0.6;
		Context.fillStyle="#000000";
		Context.fillRect(0, 0, 960, 576);
		Context.globalAlpha = 1;
		Context.drawImage(this.imgError, 280, 251);
	}
	
	if(this.transition ==3){
		Context.globalAlpha = 1;
		Context.fillStyle = "#000000";
		Context.fillRect(this.transitionX, 0, 960, 640);
	}
};

SelectState.prototype.UpdateUI = function(){
	if( (this.selectMode==0) && (this.isGameScrollOpened==false) && (this.isDataScrollOpened==false) ){ // 아무 모드도 아니면서 스크롤이 전부 닫혀있을때
		if(inputSystem.mouseX>371 && inputSystem.mouseY>11 && inputSystem.mouseX<371+563 && inputSystem.mouseY<11+105){
			if(inputSystem.isMousePressed){
				if(this.flagGameButton==false){
					this.flagGameButton=true;
				}
			} else {
				if(this.flagGameButton){ // 버튼 클릭후 반응 부분
					soundSystem.PlaySound("sound/menuclick.mp3");
					this.selectMode=1;
				}
			}
		} else {
			this.flagGameButton=false;
		}
		if(inputSystem.mouseX>371 && inputSystem.mouseY>142 && inputSystem.mouseX<371+563 && inputSystem.mouseY<142+105){
			if(inputSystem.isMousePressed){
				if(this.flagDataButton==false){
					this.flagDataButton=true;
				}
			} else {
				if(this.flagDataButton){ // 버튼 클릭 후 반응 부분
					soundSystem.PlaySound("sound/menuclick.mp3");
					this.selectMode=2;
				}
			} 
		} else {
			this.flagDataButton=false;
		}
		//뒤로가기 버튼은 아무것도 선택 안된 모드일때만 실행
		if(inputSystem.mouseX>5 && inputSystem.mouseY>89 && inputSystem.mouseX<5+70 && inputSystem.mouseY<89+63){
			if(inputSystem.isMousePressed){
				if(this.flagBackButton==false){
					this.flagBackButton=true;
				}
			} else {
				if(this.flagBackButton){
					soundSystem.PlaySound("sound/menuclick.mp3");
					this.transition = 2;
					this.flagBackButton=false;
				}
			}
		} else {
			this.flagBackButton=false;
		}
	}
	// 게임모드로 바뀌고 게임 스크롤이 펴지고 에러메시지가 출력되지 않았을때
	if( (this.selectMode==1) && this.isGameScrollOpened && this.isError==false  ){
		//스테이지 클릭시 에러메시지 출력
		if(inputSystem.mouseX>588 && inputSystem.mouseY>122 && inputSystem.mouseX<588+126 && inputSystem.mouseY<122+126){
			if(inputSystem.isMousePressed){
				if(this.flagStage2Button==false){
					this.flagStage2Button=true;
				}
			} else {
				if(this.flagStage2Button){
					soundSystem.PlaySound("sound/menuclick.mp3");
					this.isError =true;
					this.flagStage2Button=false;
				}
			}
		} else {
			this.flagStage2Button=false;
		}
		if(inputSystem.mouseX>715 && inputSystem.mouseY>122 && inputSystem.mouseX<715+126 && inputSystem.mouseY<122+126){
			if(inputSystem.isMousePressed){
				if(this.flagStage3Button==false){
					this.flagStage3Button=true;
				}
			} else {
				if(this.flagStage3Button){
					soundSystem.PlaySound("sound/menuclick.mp3");
					this.isError =true;
					this.flagStage3Button=false;
				}
			}
		} else {
			this.flagStage3Button=false;
		}
		//상점 클릭시 에러메시지 출력
		if(inputSystem.mouseX>721 && inputSystem.mouseY>251 && inputSystem.mouseX<721+114 && inputSystem.mouseY<251+51){
			if(inputSystem.isMousePressed){
				if(this.flagShopButton==false){
					this.flagShopButton=true;
				}
			} else {
				if(this.flagShopButton){
					soundSystem.PlaySound("sound/menuclick.mp3");
					this.isError =true;
					this.flagShopButton=false;
				}
			}
		} else {
			this.flagShopButton=false;
		}
		//게임 스타트 버튼
		if(inputSystem.mouseX>458 && inputSystem.mouseY>303 && inputSystem.mouseX<458+383 && inputSystem.mouseY<303+222){
			if(inputSystem.isMousePressed){
				if(this.flagGameStartButton==false){
					this.flagGameStartButton=true;
				}
			} else {
				if(this.flagGameStartButton){
					soundSystem.PlaySound("sound/menuclick.mp3");
					this.transition =3;
					this.flagGameStartButton=false;
				}
			}
		} else {
			this.flagGameStartButton=false;
		}
		//배경 클릭 제어
		if(inputSystem.mouseX>0 && inputSystem.mouseY>0 && inputSystem.mouseX<430 && inputSystem.mouseY<640){
			if(inputSystem.isMousePressed){
				if (this.flagBackground==false){
					this.flagBackground = true;
				}
			} else {
				if(this.flagBackground){
					soundSystem.PlaySound("sound/menuclick.mp3");
					this.selectMode = 0;
					this.flagGameButton = false;
					this.flagDataButton = true;
					this.flagBackground = false;
				}
			}
		} else {
			this.flagBackground = false;
		}
	}
	
	// 데이터모드로 바뀌고 데이터 스크롤이 펴졌고 에러메시지가 출력되지 않았을때
	if( (this.selectMode==2) && this.isDataScrollOpened && this.isError==false ){
		//데이터 전송 버튼 제어
		if(this.DataMode ==0){ //전송 모드
			if(inputSystem.mouseX>456 && inputSystem.mouseY>this.dataScrollY+71 && inputSystem.mouseX<456+386 && inputSystem.mouseY<this.dataScrollY+71+97 ){
				if(inputSystem.isMousePressed){
					if (this.flagDataSendButton==false){
						this.flagDataSendButton = true;
											}
				} else {
					if (this.flagDataSendButton){
						soundSystem.PlaySound("sound/menuclick.mp3");
						this.isError=true;
						this.flagDataSendButton = false;
						/////////////////////////////////////////////////////////////////정보 전송 시스템 넣기
					}
				}
			} else {
				this.flagDataSendButton = false;
			}
			if(inputSystem.mouseX>456 && inputSystem.mouseY>this.dataScrollY+219 && inputSystem.mouseX<456+386 && inputSystem.mouseY<this.dataScrollY+219+97 ){
				if(inputSystem.isMousePressed){
					if (this.flagDataReceiveButton==false){
						this.flagDataReceiveButton = true;
					}
				} else {
					if (this.flagDataReceiveButton){
						soundSystem.PlaySound("sound/menuclick.mp3");
						this.DataMode=1;
						this.flagDataReceiveButton = false;
					}
				}
			} else {
				this.flagDataReceiveButton = false;
			}				
		} else if (this.DataMode ==1){ //수령 모드
			if(inputSystem.mouseX>456 && inputSystem.mouseY>this.dataScrollY+71 && inputSystem.mouseX<456+386 && inputSystem.mouseY<this.dataScrollY+71+97 ){
				if(inputSystem.isMousePressed){
					if (this.flagDataSendButton==false){
						this.flagDataSendButton = true;
					}
				} else {
					if (this.flagDataSendButton){
						soundSystem.PlaySound("sound/menuclick.mp3");
						this.DataMode=0;
						this.flagDataSendButton = false;
					}
				}
			} else {
				this.flagDataSendButton = false;
			}
			if(inputSystem.mouseX>456 && inputSystem.mouseY>this.dataScrollY+219 && inputSystem.mouseX<456+386 && inputSystem.mouseY<this.dataScrollY+219+97 ){
				if(inputSystem.isMousePressed){
					if (this.flagDataReceiveButton==false){
						this.flagDataReceiveButton = true;
					}
				} else {
					if (this.flagDataReceiveButton){
						soundSystem.PlaySound("sound/menuclick.mp3");
						this.isError=true;
						this.flagDataReceiveButton = false;
					}
				}
			} else {
				this.flagDataReceiveButton = false;
			}
		}
		//배경 클릭 제어
		if(inputSystem.mouseX>0 && inputSystem.mouseY>0 && inputSystem.mouseX<430 && inputSystem.mouseY<640){
			if(inputSystem.isMousePressed){
				if (this.flagBackground==false){
					this.flagBackground = true;
				}
			} else {
				if(this.flagBackground){
					soundSystem.PlaySound("sound/menuclick.mp3");
					this.DataMode = 0;
					this.selectMode = 0;
					this.flagDataButton = false;
					this.flagGameButton = true;
					this.flagBackground = false;
				}
			}
		} else {
			this.flagBackground = false;
		}
	}

	if(this.isError){
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

SelectState.prototype.ScrollMove = function(){
	//게임 스크롤
	if(this.selectMode==1){
		if(this.isGameScrollOpened == false){
			this.gameScrollY +=30;
			if(this.gameScrollY>64) {
				this.gameScrollY = 64;
				this.isGameScrollOpened = true;
			}
		}
	}
	//데이터스크롤
	if(this.selectMode==2){
		if(this.isDataScrollOpened == false){
			this.dataScrollY +=30;
			if(this.dataScrollY>194) {
				this.dataScrollY = 194;
				this.isDataScrollOpened = true;
			}
		}
	}
	if(this.selectMode==0){
		if(this.isGameScrollOpened){
			this.gameScrollY -=30;
			if(this.gameScrollY<-650) {
				this.gameScrollY = -650;
				this.isGameScrollOpened = false;
				this.flagDataButton = false;
			}
		}
		if(this.isDataScrollOpened){
			this.dataScrollY -=30;
			if(this.dataScrollY<-260) {
				this.dataScrollY = -260;
				this.isDataScrollOpened = false;
				this.flagGameButton = false;
			}
		}
	}
};

SelectState.prototype.Update = function(){
	this.UpdateUI();
	this.ScrollMove();
	if(this.transition ==1){
		this.alpha += 0.08;
		if(this.alpha >1)
			this.alpha = 1;
	} else if(this.transition ==2){
		this.alpha -= 0.08;
		if(this.alpha < 0){
			this.alpha = 0;
			ChangeGameState( new MapState("select") );
		}
	} else if(this.transition ==3){
		this.transitionX -= 40;
		if(this.transitionX < 0){
			this.transitionX = 0;
			ChangeGameState( new LoadGameState("select") );
		}
	}
};

