var idxIntro1, idxIntro2, idxWork1, idxWork2, light, prev, next;
var x, y;
var lightAlpha = 0.9;
var lightDropoff=0.5;
var lightSize = 0;

var flagLight = "init";

var pages = 5;
var arrPage = new Array();
var arrContent = new Array();

var currentPage = 0;
//페이지 넘김 조절 플래그
var flag = "none";
var canNext = false;
var canPrev = false;
var multiFlag = "none";
var num;
//현 콘텐츠 알파값 조절 플래그
var contentFlag = false;

function animation(){
	//조명 제어
	light.style.backgroundImage = "-webkit-gradient(radial, 50% 500, 0, 50% 500, "+lightSize+", from(rgba(0,0,0,0)), to(rgba(0,0,0,"+lightAlpha+")), color-stop(0.7, rgba(0,0,0,"+lightDropoff+")))";
	if(flagLight=="init"){
		lightAlpha-=0.001;
		lightSize+=2.5;
		if(lightAlpha<0.85)
			lightAlpha=0.85;
		if(lightSize>350)
			lightSize=350;
		if(lightAlpha==0.85 && lightSize==350)
			flagLight="none";
	}
	if(flagLight=="in" && lightAlpha==0.85){
		lightSize+=7;
		lightDropoff-=0.01;
		if(lightDropoff<0)
			lightDropoff=0;
		if(lightSize>750)
			lightSize=750;
		if(lightDropoff==0 && lightSize==750)
			flagLight = "none";			
	} else if(flagLight=="out" && lightAlpha==0.85){
		lightSize-=7;
		lightDropoff+=0.01;
		if(lightDropoff>0.5)
			lightDropoff=0.5;
		if(lightSize<350)
			lightSize=350;
		if(lightDropoff==0.5 && lightSize==350)
			flagLight = "none";
	}
	//페이지 밝기 제어
	for(var i=2; i<pages; i++){
		if(i<=currentPage-1){
			arrPage[i].bright=1;
		} else if(i==currentPage){
			arrPage[i].bright+=0.002;
			if(arrPage[i].bright>=1)
				arrPage[i].bright=1;
		} else if(i==currentPage+1){
			arrPage[i].bright-=0.002;
			if(arrPage[i].bright<=0.85)
				arrPage[i].bright=0.85;
		} else if(i>currentPage+1){
			arrPage[i].bright=0.85;
		}
	}
	//페이지 넘김가능표시 제어
	if(flag=="none"){
		if(canNext){
			arrPage[currentPage].deg-=0.4;
			if(arrPage[currentPage].deg<-5)
				arrPage[currentPage].deg=-5;
		} else {
			arrPage[currentPage].deg+=0.25;
			if(arrPage[currentPage].deg>0)
				arrPage[currentPage].deg=0;
		}
	}
	//페이지 넘김 제어
	for(var i=0; i<pages; i++){
		if( flag != "prev" && arrPage[i].flag=="next"){
			//여러번 클릭해 넘길때 페이지넘김플래그와 콘텐츠플래그가 가장 마지막 페이지 넘김이 완료될때까지 유지
			flag = "next";
			contentFlag = false;
			//콘텐츠 오퍼시티를 낮춤 // 페이지 넘김 트렌지션 시작
			arrContent[i].alpha-=0.05;
			arrPage[i].trans+=0.05;
			//콘텐츠 오퍼시티가 0이되면 0으로 고정
			if(arrContent[i].alpha<=0)
				arrContent[i].alpha=0;
			//콘텐츠 오퍼시티가 0이되는 시간과 동일한 시간을 상정한 트렌지션
			if(arrPage[i].trans>=1){
				arrPage[i].trans=1;
				//페이지 넘김
				if(arrPage[i].deg>-82.7){
					arrPage[i].accel +=0.05 ;
					//표지의 경우, 조명 인
					if(i==0 && arrPage[i].deg<-40) flagLight="in";
				} else {
					arrPage[i].accel -=0.02 ;
					if(arrPage[i].accel <= 0.1){
						arrPage[i].accel = 0.1;
					}
					arrPage[i].page.style.zIndex = i;
					//페이지 앞뒷면 전환효과
					if(i == 0)
						arrPage[i].page.childNodes[0].style.display="none";
					if(i == 1)
						idxIntro1.style.display="none";
					if(i == 2)
						idxWork1.style.display="none";
				}
				arrPage[i].deg -= arrPage[i].accel;
				//페이지가 완전히 넘어가면 가속도 초기화, 페이지 넘김 종료, 콘텐츠 플래그 실행
				if(arrPage[i].deg<=-180){
					arrPage[i].accel= 0;
					arrPage[i].deg  = -180;
					flag = "none";
					contentFlag = true;
					arrPage[i].trans = 0;
					arrPage[i].flag = "none";
				}
			}
		}
		if( flag != "next" && arrPage[i].flag=="prev"){
			//여러번 클릭해 넘길때 페이지넘김플래그와 콘텐츠플래그가 가장 마지막 페이지 넘김이 완료될때까지 유지
			flag = "prev";
			contentFlag = false;
			//콘텐츠 오퍼시티를 낮춤 // 페이지 넘김 트렌지션 시작
			arrContent[i+1].alpha-=0.05;
			arrPage[i].trans+=0.05;
			//콘텐츠 오퍼시티가 0이되면 0으로 고정
			if(arrContent[i+1].alpha<=0)
				arrContent[i+1].alpha=0;
			//콘텐츠 오퍼시티가 0이되는 시간과 동일한 시간을 상정한 트렌지션
			if(arrPage[i].trans>=1){
				arrPage[i].trans=1;
				//페이지 넘김
				if(arrPage[i].deg<-82.7){
					arrPage[i].accel +=0.05;
					//표지의 경우, 조명 아웃
					if(i==0 && arrPage[i].deg>-110) flagLight="out";
				} else {
					arrPage[i].accel -=0.02 ;
					if(arrPage[i].accel <= 0.1){
						arrPage[i].accel = 0.1;
					}
					arrPage[i].page.style.zIndex = pages-i;
					//페이지 앞뒷면 전환효과
					if(i == 0)
						arrPage[i].page.childNodes[0].style.display="block";
					if(i == 1)
						idxIntro1.style.display="block";
					if(i == 2)
						idxWork1.style.display="block";
				}			
				arrPage[i].deg += arrPage[i].accel ;
				//페이지가 완전히 넘어가면 가속도 초기화, 페이지 넘김 종료, 콘텐츠 플래그 실행
				if(arrPage[i].deg>=0){
					arrPage[i].accel= 0;
					arrPage[i].deg  = 0;
					flag = "none";
					contentFlag = true;
					arrPage[i].trans = 0;
					arrPage[i].flag = "none";
				}
			}
		}
		//콘텐츠 투명도와 알파변수, 페이지 각도와 디그리변수, 페이지 밝기와 브라이트 변수 동기화
		arrContent[i].ctnt.style.opacity=arrContent[i].alpha;
		arrPage[i].page.style["-webkit-transform"] = "rotateY("+arrPage[i].deg+"deg)";
		arrPage[i].page.style["-webkit-filter"] = "brightness("+arrPage[i].bright+")";
	}

	if(contentFlag){
		arrContent[currentPage].alpha+=0.04;
		if(arrContent[currentPage].alpha>=1){
			if(currentPage>0)
				arrContent[currentPage].ctnt.style["-webkit-transform"] = "translate3d(0px, 0px, 2px)";
			arrContent[currentPage].alpha=1;
			contentFlag = false;
		}
	}
	//인덱스 움직임 제어
	if(currentPage<1){
		if(flag=="none"){
			if(flagLight=="init"){
				idxIntro1.className="indexInit1";
				idxWork1.className="indexInit2";
			} else {
				idxIntro1.className="indexAni";
				idxWork1.className="indexAni";
			}
		} else {
			idxIntro1.className="index";
			idxWork1.className="index";
		}
		if(flagLight=="init"){
			idxIntro2.style.opacity=0;
			idxWork2.style.opacity=0;
		} else {
			idxIntro2.style.opacity=1;
			idxWork2.style.opacity=1;
		}
	} else if(currentPage==1){
		idxIntro1.className="index";
		if(flag=="none"){
			idxWork1.className="indexAni";
		} else{
			idxWork1.className="index";
		}
		idxIntro2.style.opacity=1;
		idxIntro2.className="index";
		idxWork2.style.opacity=1;
		idxWork2.className="index";
	} else if(currentPage==2){
		idxIntro1.className="index";
		idxWork1.className="index";
		if(flag=="none"){
			idxIntro2.className="indexAni";
		} else{
			idxIntro2.className="index";
		}
		idxWork2.className="index";
	} else if(currentPage>2){
		idxIntro1.className="index";
		idxWork1.className="index";
		if(flag=="none"){
			idxIntro2.className="indexAni";
			idxWork2.className="indexAni";
		} else{
			idxIntro2.className="index";
			idxWork2.className="index";
		}
	}

	requestAnimationFrame(animation);
}
//여러장의 페이지 넘김 제어
function multiAnim(){
	if(multiFlag=="work1"){
		if(num == undefined)
			num = currentPage;
		arrPage[num].flag = "next";
		currentPage++;
		num++;
		if(num==2){
			currentPage=2;
			num=undefined;
			multiFlag="none";
		}
	}
	if(multiFlag=="intro2"){
		if(num == undefined)
			num = currentPage-1;
		arrPage[num].flag = "prev";
		currentPage--;
		num--;
		if(num==0){
			currentPage=1;
			num = undefined;
			multiFlag="none";
		}
	}
	if(multiFlag=="work2"){
		if(num == undefined)
			num = currentPage-1;
		arrPage[num].flag = "prev";
		currentPage--;
		num--;
		if(num==1){
			currentPage=2;
			num = undefined;
			multiFlag="none";
		}
	}
}
function pageSetting(_i){
	var objP={};
	objP.page = document.querySelector("#page"+_i);
	objP.flag = "none";
	objP.deg = 0;
	objP.accel = 0;
	objP.trans = 0;
	objP.bright = 1;
	arrPage.push(objP);
	arrPage[_i].page.style.zIndex = pages-_i;

	var objC={};
	objC.ctnt = document.querySelector("#content"+_i);
	objC.alpha = 0;
	arrContent.push(objC);
}

window.onload = function(){
	for(var i=0; i<pages; i++){
		pageSetting(i);
	}
	arrContent[0].alpha=1;

	idxIntro1 = document.querySelector("#intro1");
	idxIntro2 = document.querySelector("#intro2");
	idxWork1 = document.querySelector("#work1");
	idxWork2 = document.querySelector("#work2");
	light = document.querySelector("#black");
	prev = document.querySelector("#prev");
	next = document.querySelector("#next");
	//인덱스 버튼의 경우 겹치는 부분을 처리하기 위해 온클릭 함수를 사용(div의 상하관계를 인식)
	idxIntro1.onclick = function(){
		if(currentPage==0 && flag=="none"){
			if(arrPage[currentPage].className!="nextPage" && (flag=="none" || flag=="next")){
				arrPage[0].flag = "next";
				currentPage=1;
			}
		}
	}
	idxIntro2.onclick = function(){
		if(currentPage>1 && flag=="none"){
			multiFlag="intro2";
		}
	}
	idxWork1.onclick = function(){
		if(currentPage<2 && flag=="none"){
			multiFlag="work1";
		}
	}
	idxWork2.onclick = function(){
		if(currentPage>2 && flag=="none"){
			multiFlag="work2";
		}
	}
	animation();
	//페이지가 여러장 넘어가는 움직임에 약간의 시간차를 주기위해 리퀘스트애니메이션 대신에 인터벌함수 사용
	setInterval(multiAnim, 100);
};

window.onmousemove = function(e){
	if(arrPage[pages-1] !=undefined){
		var margin = arrPage[pages-1].page.getBoundingClientRect();
		x = Math.floor(e.clientX - margin.left);
		y = Math.floor(e.clientY - margin.top);

		if(flag!="prev" && currentPage==0 && x>0 && x<1280 && y>0 && y<720){
			canNext=true;
			next.style.opacity=0.75;
		} else if(flag!="prev" && currentPage>0 && currentPage<pages-1 && x>1000 && x<1280 && y>0 && y<720){
			canNext=true;
			next.style.opacity=0.75;
		} else {
			canNext=false;
			next.style.opacity=0;
		}
		if(flag!="next" && currentPage>0 && x>-1280 && x<0 && y>0 && y<720){
			canPrev=true;
			prev.style.opacity=0.75;
		} else {
			canPrev=false;
			prev.style.opacity=0;
		}
	}
}
window.onmousedown = function(e){
	if(flag!="prev" && currentPage==0 && x>0 && x<1280 && y>0 && y<720){
		if(currentPage<pages-1 && multiFlag=="none"){
			arrPage[currentPage].flag = "next";
			currentPage++;
		}
	}else if(flag!="prev" && currentPage>0 && x>1000 && x<1280 && y>0 && y<720){
		if(currentPage<pages-1 && multiFlag=="none"){
			arrPage[currentPage].flag = "next";
			currentPage++;
		}
	}
	if(x>-1280 && x<0 && y>0 && y<720){
		if(flag=="none" && currentPage==1 && multiFlag=="none"){
	 		arrPage[0].flag = "prev";
	 		currentPage=0;
	 	} else if(flag!="next" && currentPage>1 && multiFlag=="none"){
	 		arrPage[currentPage-1].flag = "prev";
	 		currentPage--;
	 	}
	}
}
window.onmousewheel = function(){
	return;
}