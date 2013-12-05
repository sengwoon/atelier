var idxIntro1, idxIntro2, idxWork1, idxWork2, light;
var x, y;
var lightAlpha = 1;
var lightW = 1920;
var lightH = 1080;
var lightX = -960;
var lightY = -60;
var flagLight = "init";

var pages = 5;
var arrPage = new Array();
var arrContent = new Array();

var currentPage = 0;
//페이지 넘김 조절 플래그
var flag = "none";
var multiFlag = "none";
var num;
//현 콘텐츠 알파값 조절 플래그
var contentFlag = false;

function animation(){
	light.style.width = lightW+"px";
	light.style.height = lightH+"px";
	light.style.marginLeft = lightX+"px";
	light.style.marginTop = lightY+"px";
	if(flagLight=="init"){
		lightAlpha-=0.01;
		if(lightAlpha<0){
			lightAlpha=0;
			flagLight="none";
		}
		light.style.backgroundColor = "rgba(0,0,0,"+lightAlpha+")";
	} else if(flagLight=="in"){
		lightW+=16;
		lightH+=9;
		lightX-=8;
		lightY-=4.5;
		if(lightW>3840)  lightW = 3840;
		if(lightH>2160)  lightH = 2160;
		if(lightX<-1920) lightX = -1920;
		if(lightY<-600)  lightY = -600;
		if(lightW==3840 && lightH==2160 && lightX== -1920 && lightY== -600) flagLight = "none";
	} else if(flagLight=="out"){
		lightW-=32;
		lightH-=18;
		lightX+=16;
		lightY+=9;
		if(lightW<1920)  lightW = 1920;
		if(lightH<1080)  lightH = 1080;
		if(lightX>-960) lightX = -960;
		if(lightY>-60)  lightY = -60;
		if(lightW==1920 && lightH==1080 && lightX== -960 && lightY== -50) flagLight = "none";
	}

	for(var i=0; i<pages; i++){
		if( flag != "prev" && arrPage[i].flag=="next"){
			if(i==0) flagLight="in";
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
				} else {
					arrPage[i].accel -=0.02 ;
					if(arrPage[i].accel <= 0.1){
						arrPage[i].accel = 0.1;
					}
					arrPage[i].page.style.zIndex = i;
					//페이지 앞뒷면 전환효과
					if(i == 0)
						arrPage[i].page.childNodes[0].style.display="none";

				}
				arrPage[i].deg -= arrPage[i].accel ;
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
				} else {
					if(i==0) flagLight="out";
					
					arrPage[i].accel -=0.02 ;
					if(arrPage[i].accel <= 0.1){
						arrPage[i].accel = 0.1;
					}
					arrPage[i].page.style.zIndex = pages-i;
					//페이지 앞뒷면 전환효과
					if(i == 0)
						arrPage[i].page.childNodes[0].style.display="block";

						
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

		arrContent[i].ctnt.style.opacity=arrContent[i].alpha;
		arrPage[i].page.style["-webkit-transform"] = "rotateY("+arrPage[i].deg+"deg)";
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
	requestAnimationFrame(animation);
}

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

	animation();
	setInterval(multiAnim, 100);
};

window.onmousemove = function(e){
	if(arrPage[pages-1] !=undefined){
		var margin = arrPage[pages-1].page.getBoundingClientRect();
		x = Math.floor(e.clientX - margin.left);
		y = Math.floor(e.clientY - margin.top);
	}
}
window.onmousedown = function(e){
	if(flag!="prev" && x>0 && x<1280 && y>0 && y<720){
		if(currentPage<pages-1 && multiFlag=="none"){
			arrPage[currentPage].flag = "next";
			currentPage++;
		}
	}
	if(flag!="next" && x>-1280 && x<0 && y>0 && y<720){
	 	if(currentPage>0 && multiFlag=="none"){
	 		arrPage[currentPage-1].flag = "prev";
	 		currentPage--;
	 	}
	}
	if(flag=="none" && x>330 && x<630 && y>=-60 && y<0){
		if(currentPage<2 && flag=="none"){
			multiFlag="work1";
		} else if(currentPage>2 && flag=="none"){
			multiFlag="work2";
		}
	}
	if(flag=="none" && x>40 && x<340 && y>=-60 && y<0){
		if(currentPage==0){
			multiFlag = "intro1";
			if(arrPage[currentPage].className!="nextPage" && (flag=="none" || flag=="next")){
				arrPage[0].flag = "next";
				currentPage=1;
			}
		} else if(currentPage>1 && flag=="none"){
			multiFlag="intro2";
		}
	}
}
window.onmousewheel = function(){
	return;
}