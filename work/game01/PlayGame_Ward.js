var pgWard;

function PGWard(){
	this.imgWard = resourcePreLoader.GetImage("img/game_ward.png");
	this.shadow = resourcePreLoader.GetImage("img/shadow.png");
	
	this.wardAlpha = 1;
	this.alphaSin = 0;
	this.x = 426;
	this.y = 327;
	this.HP = 200;
	this.fullHP = 200;
	this.speed = 1; // 벌벌 떠는것!
	this.unbeatableFrame=0;
	this.isUnbeatable = true; // 초기 시작시 무적!
	this.collisionBox = {left:this.x+10, top:this.y, right:this.x+37, bottom:this.y+78};
	
	pgWard = this;
}

PGWard.prototype.Render = function(){
	//수치가 화면안에 존재할때만 렌더링
	if( (this.x>-47)&&(this.x<960) ){
		Context.globalAlpha = 0.6
		Context.drawImage(this.shadow, this.x+2, this.y+69);
		Context.globalAlpha = this.wardAlpha;
		Context.drawImage(this.imgWard, this.x, this.y);
	}
};

PGWard.prototype.Update = function(){
	//무적시간 타이머
	this.unbeatableFrame+=(1000/GAME_FPS);
	 // 계속 떨고 있음을 표현!
	this.speed *= -1;
	if(game.onGoingTo=="stop") this.x += this.speed;
	if(game.onGoingTo=="right") this.x += this.speed-game.speed;
	if(game.onGoingTo=="left") this.x += this.speed+game.speed;
	this.collisionBox = {left:this.x+10, top:this.y, right:this.x+37, bottom:this.y+78};
	
	//무적 시간
	if(this.unbeatableFrame <4000){ // 적의 공격속도를 추가하게 되면 이곳을 제어할것!
		this.isUnbeatable = true;
		this.alphaSin = Math.sin(this.unbeatableFrame*0.01);
		this.wardAlpha = (this.alphaSin+3)*0.25;
	} else {
		this.isUnbeatable = false;
		this.wardAlpha=1;
	}
};