var pgNPC;
function PGNPC(){
	this.sprEnemyDiaRight = resourcePreLoader.GetImage("img/game_enemy_dia_right.png");
	this.sprEnemyDiaLeft = resourcePreLoader.GetImage("img/game_enemy_dia_left.png");
	this.imgEnemyDiaRightDead = resourcePreLoader.GetImage("img/game_enemy_dia_right_dead.png");
	this.imgEnemyDiaLeftDead = resourcePreLoader.GetImage("img/game_enemy_dia_left_dead.png");
	this.imgBeatedright = resourcePreLoader.GetImage("img/game_enemy_dia_right_attack.png");
	this.imgBeatedLeft = resourcePreLoader.GetImage("img/game_enemy_dia_left_attack.png");
	this.shadow = resourcePreLoader.GetImage("img/shadow.png");
	this.imgCoin = resourcePreLoader.GetImage("img/game_item_coin.png");
	this.arrNPC = new Array();
	
	this.sprKnockback = resourcePreLoader.GetImage("img/game_enemy_knockback.png");
	this.arrKnockback = new Array();
	
	//적 생성 제어용 타이머
	this.enemyFrame=0;
	pgNPC = this;
}


PGNPC.prototype.Render = function(){
	//NPC타입에 따라 그림자 위치 다르게 출력
	for(var i=0; i<this.arrNPC.length; i++){
		//수치가 화면안에 존재할때만 렌더링
		if( (this.arrNPC[i].x>-64)&&(this.arrNPC[i].x<960) ){
			if( (this.arrNPC[i].sort=="diaRight")||(this.arrNPC[i].sort=="diaLeft") ) {
				//체력 게이지
				Context.globalAlpha = 1;
				Context.fillStyle="#696969";
				Context.fillRect(this.arrNPC[i].x, this.arrNPC[i].y-16, 64, 4);
				if(this.arrNPC[i].HP>0){
					Context.fillStyle="#f33e44";
					Context.fillRect(this.arrNPC[i].x, this.arrNPC[i].y-16, 64*(this.arrNPC[i].HP/this.arrNPC[i].fullHP), 4);
				}
				Context.lineWidth = 1;
				Context.strokeStyle="#353535";
				Context.strokeRect(this.arrNPC[i].x, this.arrNPC[i].y-16, 64, 4);
				if(this.arrNPC[i].sort=="diaRight"){
					if(this.arrNPC[i].HP>0) {
						Context.globalAlpha = 0.6;
						Context.drawImage(this.shadow, this.arrNPC[i].x+13, this.arrNPC[i].y+82);
						Context.globalAlpha = this.arrNPC[i].alpha;
						Context.drawImage(this.sprEnemyDiaRight, 64*Math.floor(this.arrNPC[i].sprFrame), 0, 64, 92, this.arrNPC[i].x, this.arrNPC[i].y, 64, 92);
						if(this.arrNPC[i].isBeating && (pgWard.isUnbeatable==false)){
							Context.globalAlpha = 1;
							Context.drawImage(this.imgBeatedright, this.arrNPC[i].x+64, this.arrNPC[i].y);
						}
					} else {
						Context.globalAlpha = 0.6;
						Context.drawImage(this.shadow, this.arrNPC[i].x+13, this.arrNPC[i].y+82);
						Context.globalAlpha = this.arrNPC[i].alpha;
						Context.drawImage(this.imgEnemyDiaRightDead, this.arrNPC[i].x+10, this.arrNPC[i].y);
					}
				} else if(this.arrNPC[i].sort=="diaLeft") {
					if(this.arrNPC[i].HP>0){
						Context.globalAlpha = 0.6;
						Context.drawImage(this.shadow, this.arrNPC[i].x+6, this.arrNPC[i].y+82);
						Context.globalAlpha = this.arrNPC[i].alpha;
						Context.drawImage(this.sprEnemyDiaLeft, 64*Math.floor(this.arrNPC[i].sprFrame), 0, 64, 92, this.arrNPC[i].x, this.arrNPC[i].y, 64, 92);
						if(this.arrNPC[i].isBeating && (pgWard.isUnbeatable==false)){
							Context.globalAlpha = 1;
							Context.drawImage(this.imgBeatedLeft, this.arrNPC[i].x-21, this.arrNPC[i].y);
						}
					} else {
						Context.globalAlpha = 0.6;
						Context.drawImage(this.shadow, this.arrNPC[i].x+13, this.arrNPC[i].y+82);
						Context.globalAlpha = this.arrNPC[i].alpha;
						Context.drawImage(this.imgEnemyDiaLeftDead, this.arrNPC[i].x-5, this.arrNPC[i].y);
					}
				}
			} else if(this.arrNPC[i].sort=="coin"){
				Context.globalAlpha = 0.6;
				Context.drawImage(this.shadow, this.arrNPC[i].x-6, 387+12);
				Context.globalAlpha = this.arrNPC[i].alpha;
				Context.drawImage(this.imgCoin, this.arrNPC[i].x, this.arrNPC[i].y);
			}
		}
	}
	
	for(var j=0; j<this.arrKnockback.length; j++){
		if( (this.arrKnockback[j].x>-30)&&(this.arrKnockback[j].x<960) ){
			Context.globalAlpha = 1;
			Context.drawImage(this.sprKnockback, 64*Math.floor(this.arrKnockback[j].sprFrame), 0, 64, 24, this.arrKnockback[j].x, this.arrKnockback[j].y, 64, 24);
		}
	}
};

PGNPC.prototype.Update = function(){
	//적 생성 타이머
	this.enemyFrame+=(1000/GAME_FPS);
	//적 생성 시간 및 객체수 제어
	if( game.playTime < 60000 ){
		if( (this.enemyFrame) >= 5000 ) // 5초마다 적이 추가됨
			this.AddEnemy();
	} else if( (game.playTime>=60000)&&(game.playTime<120000) ){
		if( (this.enemyFrame) >= 4000 ) // 4초마다 적이 추가됨
			this.AddEnemy();
	} else if( (game.playTime >=120000)&&(game.playTime<180000) ){
		if( (this.enemyFrame) >= 4000 ){ // 4초마다 적이 렌덤하게 1~2마리까지
			for(var i=0; i<1+Math.round(Math.random()); i++){
				this.AddEnemy();
			}
		}
	} else if( (game.playTime >=180000)&&(game.playTime <205000) ){
		if( (this.enemyFrame) >= 4000 ){ // 4초마다 적이 렌덤하게 2~3마리
			for(var i=0; i<2+Math.round(Math.random()); i++){
				this.AddEnemy();
			}
		}
	} else if( (game.playTime >=205000) ){
		if( (this.enemyFrame) >= 3000 ){ // 3초마다 적이 렌덤하게 2~4마리
			for(var i=0; i<2+Math.round(Math.random()*2); i++){
				this.AddEnemy();
			}
		}
	}
	//적 개체별 프레임 제어
	for(var i=0; i<this.arrNPC.length; i++){
		if( (this.arrNPC[i].sort == "diaRight") || (this.arrNPC[i].sort == "diaLeft") ){
			this.arrNPC[i].sprFrame+=(1/4);
			if(Math.floor(this.arrNPC[i].sprFrame) >= 4)
				this.arrNPC[i].sprFrame=0;
			//적은 체력이 0보다 작아지면 드롭프레임이 증가	
			if(this.arrNPC[i].HP<=0){
				this.arrNPC[i].dropFrame += (1000/GAME_FPS);
				//1.5초 지나고 0.5초남은 시점부터 깜빡거림
				if(this.arrNPC[i].dropFrame>1500){
					var alphaSin = Math.sin(this.arrNPC[i].dropFrame*0.5);
					this.arrNPC[i].alpha = (alphaSin+3)*0.25;
				}
			}
			//넉백시 1.5초간 넉백 유지
			if(this.arrNPC[i].isKnockback){
				this.arrNPC[i].knockbackFrame += (1000/GAME_FPS);
				if(this.arrNPC[i].knockbackFrame > 1500) this.arrNPC[i].isKnockback=false;
			}
		}
		//코인은 생성직후 바니쉬프레임이 증가
		if(this.arrNPC[i].sort == "coin"){
			this.arrNPC[i].vanishFrame += (1000/GAME_FPS);
			//8초지나고 2초남은 시점부터 깜빡거림
			if(this.arrNPC[i].vanishFrame > 8000){
				var alphaSin = Math.sin(this.arrNPC[i].vanishFrame*0.5);
				this.arrNPC[i].alpha = (alphaSin+3)*0.25;
			}
			//5초전엔 동전이 위로 올라갔다 내려옴
			if(this.arrNPC[i].vanishFrame<3000){ 
				this.arrNPC[i].y += this.arrNPC[i].speedY;
				this.arrNPC[i].speedY += 1.5;
				if(this.arrNPC[i].y > 387) this.arrNPC[i].y=387;
			}
		}
	}
	//적 이동. 타입에 따라 돈은 와드와 동일한 로직을 적용할 것
	for(var i=0; i<this.arrNPC.length; i++){
		 if ( (this.arrNPC[i].isBeating) || (this.arrNPC[i].HP<=0) || (this.arrNPC[i].isKnockback) || (this.arrNPC[i].sort == "coin")){ // 와드를 치고있을때나 죽었을때나 넉백상태거나 코인이면 배경의 속도만 적용
		 	if(game.onGoingTo=="right") this.arrNPC[i].x -= game.speed;
			if(game.onGoingTo=="left") this.arrNPC[i].x += game.speed;
		 } else {
			if(game.onGoingTo=="stop") this.arrNPC[i].x += this.arrNPC[i].speed;
			if(game.onGoingTo=="right") this.arrNPC[i].x += (this.arrNPC[i].speed-game.speed);
			if(game.onGoingTo=="left") this.arrNPC[i].x += (this.arrNPC[i].speed+game.speed);
		} 
	}
	//넉백 이펙트 제어 
	for(var j=0; j<this.arrKnockback.length; j++){
		this.arrKnockback[j].sprFrame += (1/4);
		this.arrKnockback[j].vanishFrame += (1000/GAME_FPS);
		if( Math.floor(this.arrKnockback[j].sprFrame) > 2.5)
			this.arrKnockback[j].sprFrame = 0;
		if(this.arrKnockback[j].vanishFrame>1500){
			this.arrKnockback.splice(j, 1);
			continue;
		}
		if(game.onGoingTo=="right") this.arrKnockback[j].x -= game.speed;
		if(game.onGoingTo=="left") this.arrKnockback[j].x += game.speed;
	}
	//객체가 사라지는 조건
	for(var i=0; i<this.arrNPC.length; i++){
		//적이 사라지는 로직 (화면밖으로 나가거나 죽거나)
		if( (this.arrNPC[i].sort == "diaRight") || (this.arrNPC[i].sort == "diaLeft") ){
			if(this.arrNPC[i].x > (game.BG03x+2880+300)){ // 적이 사라지는 분기점
				this.arrNPC.splice(i, 1);
				this.AddEnemy();
				continue;
			}
			if(this.arrNPC[i].x < (game.BG03x-300)){ // 적이 사라지는 분기점
				this.arrNPC.splice(i, 1);
				this.AddEnemy();
				continue;
			}
			if(this.arrNPC[i].dropFrame>2000){
				if( Math.random()>0.5 ){
					this.AddObject( "coin", this.arrNPC[i].x+16, this.arrNPC[i].y+70, this.arrNPC[i].level ); // 50% 확률로 아이템 드롭!
					soundSystem.PlaySound("sound/item_drop.mp3");
				}
				this.arrNPC.splice(i,1);
				continue;
			}
		}
		//코인의 바니쉬프레임이 10초가 넘으면 사라짐
		if( this.arrNPC[i].sort == "coin"){
			if(this.arrNPC[i].vanishFrame>10000){
				this.arrNPC.splice(i,1);
				continue;
			}
		}
	}
};

//지정한 타입과 좌표에 NPC객체 추가
PGNPC.prototype.AddObject = function( _sort, _x, _y, _enemyLevel){
	var obj ={};
	if( (_sort == "diaRight")||(_sort =="diaLeft") ){
		if(_enemyLevel == 1){
			if(_sort == "diaRight"){
				obj.speed=2;
			} else if(_sort =="diaLeft"){
				obj.speed=-2;
			}
			obj.HP=100;
			obj.fullHP=100;
			obj.exp=5;
			obj.power=20;
		} else if(_enemyLevel == 2){
			if(_sort == "diaRight"){
				obj.speed=2.2;
			} else if(_sort =="diaLeft"){
				obj.speed=-2.2;
			}
			obj.HP=120;
			obj.fullHP=120;
			obj.exp=7;
			obj.power=22;
		} else if(_enemyLevel == 3){
			if(_sort == "diaRight"){
				obj.speed=2.5;
			} else if(_sort =="diaLeft"){
				obj.speed=-2.5;
			}
			obj.HP=150;
			obj.fullHP=150;
			obj.exp=10;
			obj.power=25;
		} else if(_enemyLevel == 4){
			if(_sort == "diaRight"){
				obj.speed=2.7;
			} else if(_sort =="diaLeft"){
				obj.speed=-2.7;
			}
			obj.HP=170;
			obj.fullHP=170;
			obj.exp=13;
			obj.power=27;
		} else if(_enemyLevel == 5){
			if(_sort == "diaRight"){
				obj.speed=3;
			} else if(_sort =="diaLeft"){
				obj.speed=-3;
			}
			obj.HP=200;
			obj.fullHP=200;
			obj.exp=15;
			obj.power=35;
		} else if(_enemyLevel == 6){
			if(_sort == "diaRight"){
				obj.speed=3;
			} else if(_sort =="diaLeft"){
				obj.speed=-3;
			}
			obj.HP=200;
			obj.fullHP=200;
			obj.exp=15;
			obj.power=35;
		}
		obj.isBeating=false;
		obj.sprFrame=0;
		obj.dropFrame=0;
		obj.isKnockback=false;
		obj.knockbackFrame=0;
	} else if (_sort =="coin"){
		obj.vanishFrame=0;
		obj.speedY=-10;
		obj.power = 10+Math.floor(Math.random()*5);
	}
	obj.level=_enemyLevel;
	obj.alpha = 1;
	obj.x=_x;
	obj.y=_y;
	obj.sort=_sort;
	this.arrNPC.push(obj);
};
//게임 전체 시간에 따라 적 추가, 렌덤하게 지정된 타입으로 추가
PGNPC.prototype.AddEnemy = function(){
	//레벨 조정을 위한 값을 0~1까지 먼저 뽑음
	var levelControl = Math.random();
	var enemyLevel;
	//컨트롤 값에 따라 적 레벨 결정
	if(level == 1){
		if(levelControl < 0.8)
			enemyLevel = level;
		else 
			enemyLevel = level+1;
	} else if(level >= 2){
		if(levelControl < 0.3)
			enemyLevel = (level-1);
		else if( levelControl>0.3 && levelControl<0.8 )
			enemyLevel = level;
		else
			enemyLevel = (level+1);
	}
	if( Math.random() < 0.5 )
		this.AddObject( "diaRight", game.BG03x-300+(Math.random()*200), 314, enemyLevel);
	else
		this.AddObject( "diaLeft", game.BG03x+2880+300-(Math.random()*200), 314, enemyLevel);
	this.enemyFrame = 0;
};

PGNPC.prototype.Knockback = function(_x, _y){
	this.arrKnockback.push( {x:_x, y:_y, vanishFrame:0, sprFrame:0} );
};

//NPC 객체 종유별로 대상과의 충돌 체크. 게임상태에서 불러냄
PGNPC.prototype.CheckCollision = function( target ){
	for(var i=0; i<this.arrNPC.length; i++){
		//타입이 적 이고, 체력이 남아 있으며 넉백상태가 아닌 적
		if( ((this.arrNPC[i].sort == "diaRight")||(this.arrNPC[i].sort == "diaLeft")) && (this.arrNPC[i].HP>0) && (this.arrNPC[i].isKnockback==false) ){
			var collisionBox = {left:this.arrNPC[i].x+10, top:this.arrNPC[i].y, right:this.arrNPC[i].x+54, bottom:this.arrNPC[i].y+92};
			//플레이어, 와드와의 충돌
			if( (collisionBox.left<target.collisionBox.right) && (collisionBox.bottom>target.collisionBox.top) && (collisionBox.right > target.collisionBox.left) && (collisionBox.top < target.collisionBox.bottom)){
				this.arrNPC[i].isBeating = true;
			} else {
				this.arrNPC[i].isBeating = false;
			}
		}
		if(this.arrNPC[i].sort == "coin"){
			var collisionBox = {left:this.arrNPC[i].x, top:this.arrNPC[i].y, right:this.arrNPC[i].x+32, bottom:this.arrNPC[i].y+27};
			var gainCoin = Math.floor(this.arrNPC[i].power*(1-0.2*(level-this.arrNPC[i].level)) )*10
			if( (collisionBox.left<target.collisionBox.right) && (collisionBox.bottom>target.collisionBox.top) && (collisionBox.right > target.collisionBox.left) && (collisionBox.top < target.collisionBox.bottom)){
				game.Message("coin", this.arrNPC[i].x, this.arrNPC[i].y, gainCoin);
				game.coinGain += gainCoin;
				this.arrNPC.splice(i, 1);
				soundSystem.PlaySound("sound/item_gain.mp3");
				break;
			}
		}
	}
};
//스킬과의 충돌 체크. 게임상태 에서 불러냄
PGNPC.prototype.CheckBeated = function(){
	var target = pgPlayer.arrSkill;
	for(var i=0; i<this.arrNPC.length; i++){
		if( ((this.arrNPC[i].sort=="diaRight")||(this.arrNPC[i].sort=="diaLeft")) && (this.arrNPC[i].HP>0) && (this.arrNPC[i].x>game.BG03x+350 ) && (this.arrNPC[i].x<game.BG03x+2880-350 ) ){
			var collisionBox = {left:this.arrNPC[i].x+10, top:this.arrNPC[i].y, right:this.arrNPC[i].x+54, bottom:this.arrNPC[i].y+92};
			var gainScore = 50*( 1-0.2*(level-this.arrNPC[i].level));
			var gainExp = Math.floor(this.arrNPC[i].exp*( 1-0.2*(level-this.arrNPC[i].level)));
			for(var j=0; j<target.length; j++){
				var skillBox = {left:target[j].x, top:target[j].y, right:target[j].x+46, bottom:target[j].y+27};
				if( (collisionBox.left<skillBox.right) && (collisionBox.bottom>skillBox.top) && (collisionBox.right > skillBox.left) && (collisionBox.top < skillBox.bottom)){
					this.arrNPC[i].HP-=target[j].power;
					pgPlayer.Explosion(target[j].sort, this.arrNPC[i].x, this.arrNPC[i].y, target[j].power);
					if( target[j].knockback && (this.arrNPC[i].isKnockback==false) ){
						this.arrNPC[i].x +=target[j].speed*5;
						this.Knockback(this.arrNPC[i].x, this.arrNPC[i].y-18);
						this.arrNPC[i].isKnockback = true;
					}
					target.splice(j, 1);
					game.score += gainScore;
					game.Message("score", this.arrNPC[i].x, this.arrNPC[i].y+20, gainScore);
					soundSystem.PlaySound("sound/flame.mp3");
					if(this.arrNPC[i].HP<=0){
						this.arrNPC[i].HP=0;
						game.score += gainScore;
						game.Message("score", this.arrNPC[i].x, this.arrNPC[i].y-20, gainScore);
						game.kill ++;
						exp += gainExp;
						game.Message("exp", this.arrNPC[i].x, this.arrNPC[i].y, gainExp);
						this.arrNPC[i].dropFrame++;
					}
				}
			}
		}
	}
};

PGNPC.prototype.CheckSplash = function(){
	var target = pgPlayer.arrExplo;
	for(var i=0; i<this.arrNPC.length; i++){
		if( ((this.arrNPC[i].sort=="diaRight")||(this.arrNPC[i].sort=="diaLeft")) && (this.arrNPC[i].HP>0) && (this.arrNPC[i].x>game.BG03x+350 ) && (this.arrNPC[i].x<game.BG03x+2785-350 ) ){
			var collisionBox = {left:this.arrNPC[i].x+10, top:this.arrNPC[i].y, right:this.arrNPC[i].x+54, bottom:this.arrNPC[i].y+92};
			var gainSplashScore = 50*( 1-0.2*(level-this.arrNPC[i].level));
			var gainSplashExp = Math.floor(this.arrNPC[i].exp*( 1-0.2*(level-this.arrNPC[i].level)));
			for(var j=0; j<target.length; j++){
				if( (collisionBox.left<target[j].collisionBox.right) && (collisionBox.bottom>target[j].collisionBox.top) && (collisionBox.right > target[j].collisionBox.left) && (collisionBox.top < target[j].collisionBox.bottom) && (target[j].splash) ){
					this.arrNPC[i].HP-=target[j].power;
					if( target[j].knockback && (this.arrNPC[i].isKnockback==false) ){
						this.arrNPC[i].x +=target[j].speed*5;
						this.Knockback(this.arrNPC[i].x, this.arrNPC[i].y-18);
						this.arrNPC[i].isKnockback = true;
					}
					if(this.arrNPC[i].HP<=0){
						this.arrNPC[i].HP=0;
						game.score += gainSplashScore;
						game.Message("score", this.arrNPC[i].x, this.arrNPC[i].y-20, gainSplashScore);
						game.kill ++;
						exp += gainSplashExp;
						game.Message("exp", this.arrNPC[i].x, this.arrNPC[i].y, gainSplashExp);
						this.arrNPC[i].dropFrame++;
					}
				}
			}
		}
	}
};