//게임을 맨 처음 실행할때 정해지고 그 이후로는 변동!
var pgPlayer;
var level = 1;
var exp = 0;
var fullExp = 100;
var fullHP = 100;
var inventoryCoin = 0;

function PGPlayer(){
	this.sprPlayerRight = resourcePreLoader.GetImage("img/game_player_right.png");
	this.sprPlayerLeft = resourcePreLoader.GetImage("img/game_player_left.png");
	this.shadow = resourcePreLoader.GetImage("img/shadow.png");
	this.playerAlpha=1;
	this.x = 294;
	this.y = 324;
	this.HP;
	this.speed = 5;
	this.skillPower;
	this.skillRate;
	this.skillKnockback;
	this.splashDamage
	this.playerDirection="right"; //캐릭터 방향, 스프라이트 출력과 이동을 제어
	this.playerOnGoingTo= "stop"; //화면 너머로 더 가는지 여부, 게임에 값을 넘겨서 화면 이동을 제어
	this.unbeatableFrame=0;
	this.isUnbeatable = true;
	this.collisionBox = {left:this.x+10, top:this.y, right:this.x+40, bottom:this.y+82};
	this.sprFrame = 0;
	this.LevelUpFrame=0;
	
	this.sprFireRight = resourcePreLoader.GetImage("img/game_fireball_right.png");
	this.sprFireLeft = resourcePreLoader.GetImage("img/game_fireball_left.png");
	this.arrSkill = new Array();
	
	this.sprSpellRight = resourcePreLoader.GetImage("img/skillspelling_right.png");
	this.sprSpellLeft = resourcePreLoader.GetImage("img/skillspelling_left.png");
	this.spellFrame = 0;
	this.skillFrame=0;
	
	this.sprExploRight = resourcePreLoader.GetImage("img/game_flame_right.png");
	this.sprExploLeft = resourcePreLoader.GetImage("img/game_flame_left.png");
	this.arrExplo = new Array();
	
	pgPlayer = this;
}

PGPlayer.prototype.Render = function(){
	//플레이어
	
	if(this.playerDirection=="right"){
		Context.globalAlpha = 0.6;
		Context.drawImage(this.shadow, this.x+2, this.y+72);
		Context.globalAlpha = this.playerAlpha;
		Context.drawImage(this.sprPlayerRight, 50*Math.floor(this.sprFrame), 0, 50, 82, this.x, this.y, 50, 82);
		Context.globalAlpha = 1;
		Context.drawImage(this.sprSpellRight, 20*Math.floor(this.spellFrame), 0, 20, 60, this.x+50, this.y+10, 20, 60);
	} else if (this.playerDirection=="left"){
		Context.globalAlpha = 0.6;
		Context.drawImage(this.shadow, this.x+3, this.y+72);
		Context.globalAlpha = this.playerAlpha;
		Context.drawImage(this.sprPlayerLeft, 50*Math.floor(this.sprFrame), 0, 50, 82, this.x, this.y, 50, 82);
		Context.globalAlpha = 1;
		Context.drawImage(this.sprSpellLeft, 20*Math.floor(this.spellFrame), 0, 20, 60, this.x-20, this.y+10, 20, 60);
	}
	//스킬
	for(var i=0; i<this.arrSkill.length; i++){
		//수치가 화면안에 존재할때만 렌더링
		Context.globalAlpha = 1;
		if( (this.arrSkill[i].x>-46)&&(this.arrSkill[i].x<960) ){
			if(this.arrSkill[i].sort == "heartRight")
				Context.drawImage(this.sprFireRight, 46*this.arrSkill[i].sprFrame, 0, 46, 27, this.arrSkill[i].x, this.arrSkill[i].y, 46, 27);
			else if(this.arrSkill[i].sort == "heartLeft")
				Context.drawImage(this.sprFireLeft, 46*this.arrSkill[i].sprFrame, 0, 46, 27, this.arrSkill[i].x, this.arrSkill[i].y, 46, 27);
		}
	}
	//폭발 이펙트
	for(var j=0; j<this.arrExplo.length; j++){
		Context.globalAlpha = 1;
		if( (this.arrExplo[j].x>-60)&&(this.arrExplo[j].x<960) ){
			if(this.arrExplo[j].sort == "heartRight")
				Context.drawImage(this.sprExploRight, 60*this.arrExplo[j].sprFrame, 0, 60, 60, this.arrExplo[j].x, this.arrExplo[j].y, 60, 60);
			else if(this.arrExplo[j].sort == "heartLeft")
				Context.drawImage(this.sprExploLeft, 60*this.arrExplo[j].sprFrame, 0, 60, 60, this.arrExplo[j].x, this.arrExplo[j].y, 60, 60);
		}
	}
};
PGPlayer.prototype.Update = function(){
	//각종 타이머
	this.skillFrame+=(1000/GAME_FPS);
	this.unbeatableFrame+=(1000/GAME_FPS);
	this.LevelUpFrame+=(1000/GAME_FPS);
	// 플레이어 설정
	this.LevelSetting();
	this.sprFrame += (1/2);
	if(Math.floor(this.sprFrame) >= 8)
		this.sprFrame = 0;
	// UI의 방향조절값을 받아와서 케릭터 방향에 적용!
	this.playerDirection = pgUI.UIdirection;
	//플레이어 이동 로직
	if(this.playerDirection == "right"){
		this.x += this.speed;
		if(this.x>660){
			this.x = 660;
			this.playerOnGoingTo = "right";
		} else {
			this.playerOnGoingTo = "stop";
		}
	} else if(this.playerDirection == "left"){
		this.x -= this.speed;
		if(this.x<300){
			this.x = 300;
			this.playerOnGoingTo = "left";
		} else {
			this.playerOnGoingTo = "stop";
		}
	}
	this.collisionBox = {left:this.x+10, top:this.y, right:this.x+40, bottom:this.y+82};
	//플레이어 무적 시간
	if(this.unbeatableFrame <1500){
		var alphaSin = Math.sin(this.unbeatableFrame*0.01);
		this.playerAlpha = (alphaSin+3)*0.25;
		this.isUnbeatable = true;
	} else {
		this.isUnbeatable = false;
		this.playerAlpha = 1;
	}
	//시전이펙트
	this.spellFrame += this.skillRate;
	if(Math.floor(this.spellFrame) > 76)
		this.spellFrame = 76;
	//스킬 설정
	this.PushSkill();
	for(var i=0; i<this.arrSkill.length; i++){
		this.arrSkill[i].sprFrame++;
		if(this.arrSkill[i].sprFrame >= 28)
			this.arrSkill[i].sprFrame=0;

		if(game.onGoingTo=="stop") this.arrSkill[i].x += this.arrSkill[i].speed;
		if(game.onGoingTo=="right") this.arrSkill[i].x += (this.arrSkill[i].speed-game.speed);
		if(game.onGoingTo=="left") this.arrSkill[i].x += (this.arrSkill[i].speed+game.speed);
		if(this.arrSkill[i].x > (game.BG03x+2880+100)){
			this.arrSkill.splice(i, 1);
			continue;
		}
		if(this.arrSkill[i].x < (game.BG03x-100)){
		 	this.arrSkill.splice(i, 1);
		 	continue;
		}
	}
	//폭발이펙트 제어
	for(var j=0; j<this.arrExplo.length; j++){
		this.arrExplo[j].sprFrame++;
		if(this.arrExplo[j].sprFrame ==1)
			this.arrExplo[j].splash = false;
		if(this.arrExplo[j].sprFrame > 19){
			this.arrExplo.splice(j, 1);
			continue;
		}

		if(game.onGoingTo=="right") {
			this.arrExplo[j].x-=game.speed;
			this.arrExplo[j].collisionBox.left -= game.speed;
			this.arrExplo[j].collisionBox.right -= game.speed;
		} else if(game.onGoingTo=="left") {
			this.arrExplo[j].x+=game.speed;
			this.arrExplo[j].collisionBox.left += game.speed;
			this.arrExplo[j].collisionBox.right += game.speed;
		}
	}
};

// 플레이어 방향과 스킬 파워에 따라 파이어볼 삽입
PGPlayer.prototype.PushSkill = function(){
	var obj = {};
	if (this.playerDirection=="right"){
		obj.x = this.x + 50;
		obj.sort = "heartRight";
		obj.speed = 7;
	} else if(this.playerDirection="left"){
		obj.x = this.x-46;
		obj.sort = "heartLeft";
		obj.speed = -7;
	}
	obj.y = this.y+41-13;
	obj.power = this.skillPower;
	obj.sprFrame = 0;
	if(Math.round(Math.random()*(4/this.skillKnockback)) == 1)
		obj.knockback = true;
	else
		obj.knockback = false;

	if(this.skillFrame > 2500 / this.skillRate){
		soundSystem.PlaySound("sound/attack.mp3");
		this.arrSkill.push( obj );
		this.skillFrame =0;
		this.spellFrame =0;
	}
};
//충돌시 파이어볼 방향에 따라 폭발 삽입
PGPlayer.prototype.Explosion = function(_sort, _x, _y, _power){
	var explo = {};
	if(_sort == "heartRight"){
		explo.x=_x-20;
		explo.collisionBox = {left:_x-40, top:_y+20, right:_x-20+60, bottom:_y+20+60};
		explo.speed = 7;
	} else if(_sort == "heartLeft"){
		explo.x=_x+14;
		explo.collisionBox = {left:_x+14, top:_y+20, right:_x+14+60, bottom:_y+20+60};
		explo.speed = -7;
	}
	explo.y=_y+20;
	explo.sort=_sort;
	explo.power = _power*this.splashDamage;
	if(level<3){
		explo.splash = false;
		explo.knockback = false;
	} else {
		explo.splash = true;
		if(Math.round(Math.random()*(8/this.skillKnockback)) == 1)
			explo.knockback = true;
		else
			explo.knockback = false;
	}
	
	explo.sprFrame = 0;
	this.arrExplo.push( explo );
};
//플레이어 레벨 세팅
PGPlayer.prototype.LevelSetting = function(){
	if(exp>=fullExp){
		level++;
		game.Message("level", this.x-50, this.y);
		exp=0;
		this.LevelUpFrame=0;
	} 
	if(level==1){
		fullHP=100;
		this.skillPower = 50;
		this.skillRate = 1;
		this.skillKnockback=1;
	}else if(level==2){
		fullExp = 200;
		fullHP=200;
		this.skillPower = 75;
		this.skillRate = 1.5;
		this.skillKnockback=1;
		if(this.LevelUpFrame<(1000/30)) this.HP = fullHP;
	} else if(level==3){
		fullExp = 400;
		fullHP=300;
		this.skillPower = 75;
		this.skillRate = 2;
		this.skillKnockback=1;
		this.splashDamage=0.25;
		if(this.LevelUpFrame<(1000/30)) this.HP = fullHP;
	} else if(level==4){
		fullExp = 800;
		fullHP=400;
		this.skillPower = 90;
		this.skillRate = 2.4;
		this.skillKnockback =2;
		this.splashDamage=0.3;
		if(this.LevelUpFrame<(1000/30)) this.HP = fullHP;
	} else if(level==4){
		fullExp = 1600;
		fullHP=500;
		this.skillPower = 100;
		this.skillRate = 2.7;
		this.skillKnockback =2;
		this.splashDamage=0.35;
		if(this.LevelUpFrame<(1000/30)) this.HP = fullHP;
	} else if(level==5){
		exp=0;
		fullHP=600;
		this.skillPower = 110;
		this.skillRate = 3;
		this.skillKnockback = 4;
		this.splashDamage=0.4;
		if(this.LevelUpFrame<(1000/30)) this.HP = fullHP;
	}
};
