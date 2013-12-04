var btnNext, btnPrev, idxIntro1, idxIntro2, idxWork1, idxWork2;

var pages = 5;
var arrPage = new Array();
var arrContent = new Array();

var currentPage=0;
//페이지 넘김 조절 플래그
var flag = "none";
var multiFlag = "none";
var num;
//현 콘텐츠 알파값 조절 플래그
var contentFlag = false;

function animation(){
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
				} else {
					arrPage[i].accel -=0.02 ;
					if(arrPage[i].accel <= 0.1){
						arrPage[i].accel = 0.1;
					}
					arrPage[i].page.style.zIndex = i;
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
					arrPage[i].accel +=0.05 ;
				} else {
					arrPage[i].accel -=0.02 ;
					if(arrPage[i].accel <= 0.1){
						arrPage[i].accel = 0.1;
					}
					arrPage[i].page.style.zIndex = pages-i;
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

function logic(){
	btnNext.onclick = function(){
		if(currentPage<pages-1 && multiFlag=="none"){
			arrPage[currentPage].flag = "next";
			currentPage++;
		}
	};
	btnPrev.onclick = function(){
		if(currentPage>0 && multiFlag=="none"){
			arrPage[currentPage-1].flag = "prev";
			currentPage--;
		}
	};
	idxIntro1.onclick = function(){
		if(currentPage==0){
			multiFlag = "intro1";
			if(arrPage[currentPage].className!="nextPage" && (flag=="none" || flag=="next")){
				arrPage[0].flag = "next";
				currentPage=1;
			}
		}
	};
	idxWork1.onclick = function(){
		if(currentPage<2 && flag=="none"){
			multiFlag="work1";

		}
	};
	idxIntro2.onclick = function(){
		if(currentPage>1 && flag=="none"){
			multiFlag="intro2";
		}
	};
	idxWork2.onclick = function(){
		if(currentPage>2 && flag=="none"){
			multiFlag="work2";
		}
	};
};

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
	btnNext = document.querySelector("#nextBtn");
	btnPrev = document.querySelector("#prevBtn");
	btnNext.style["-webkit-transform"] = "translate3d(0px, 0px, 1px)";
	btnPrev.style["-webkit-transform"] = "translate3d(0px, 0px, 1px)";

	idxIntro1 = document.querySelector("#intro1");
	idxIntro2 = document.querySelector("#intro2");
	idxWork1 = document.querySelector("#work1");
	idxWork2 = document.querySelector("#work2");

	logic();
	animation();
	setInterval(multiAnim, 100);
};