/*
	Marionette Atelier, ver.1.00.0, 2013.12.27
	Copyright 2013. RM (Seungwoon Park)
	Designed and built by RM.
	red.marionette0424@gmail.com
*/
var book, light, zoomBox, btnClose;
var idxIntro1, idxIntro2, idxWork1, idxWork2, prev, next;

var mode="book";
var flagLight = "load";
var lightAlpha = 1;
var lightDropoff=0.5;
var lightSize = 0;
//커버, 프로필 페이지는 먼저 계산하고 시작
var categories=0;
var pages=2;
var arrPage = [];
var arrContent = [];
var currentPage = 0;
//페이지 넘김 조절 플래그
var flag = "none";
var canNext = false;
var canPrev = false;
var multiFlag = "none";
var targetNum;
//여러장 넘김 제어용 변수
var num;
//페이지 UI 제어용 마우스 위치 변수
var x, y;
//현 콘텐츠 알파값 조절 플래그
var contentFlag = false;

function animation(){
	//모드 제어(조명, 페이지 넘김가능 표시, )
	if(mode=="book"){
		light.style.backgroundImage = "-webkit-gradient(radial, 50% 50%, 0, 50% 50%, "+lightSize+", from(rgba(0,0,0,0)), to(rgba(0,0,0,"+lightAlpha+")), color-stop(0.7, rgba(0,0,0,"+lightDropoff+")))";
		light.style.backgroundImage	= "-ms-radial-gradient(center center, "+lightSize+"px "+lightSize+"px, rgba(0,0,0,0) 0%, rgba(0,0,0,"+lightDropoff+") 70%, rgba(0,0,0,"+lightAlpha+") 100%)";
		if(flagLight=="init"){
			lightAlpha-=0.002;
			lightSize+=2.5;
			if(lightAlpha<0.85)
				lightAlpha=0.85;
			if(lightSize>350)
				lightSize=350;
			if(lightAlpha==0.85 && lightSize==350)
				flagLight="none";
		}
		if(flagLight=="in"){
			lightSize+=7;
			lightDropoff-=0.01;
			if(lightDropoff<0)
				lightDropoff=0;
			if(lightSize>750)
				lightSize=750;
			if(lightDropoff==0 && lightSize==750)
				flagLight = "none";			
		} else if(flagLight=="out"){
			lightSize-=7;
			lightDropoff+=0.01;
			if(lightDropoff>0.5)
				lightDropoff=0.5;
			if(lightSize<350)
				lightSize=350;
			if(lightDropoff==0.5 && lightSize==350)
				flagLight = "none";
		} else if(flagLight=="zoomout"){
			lightSize+=40;
			if(lightSize>0)
				lightSize=750;
			if(lightSize==750)
				flagLight="none";
		}
		//페이지 넘김 제어
		for(var i=0; i<pages; i++){
			if( flag != "prev" && arrPage[i].flag=="next"){
				//여러번 클릭해 넘길때 페이지넘김플래그와 콘텐츠플래그가 가장 마지막 페이지 넘김이 완료될때까지 유지
				flag = "next";
				contentFlag = false;
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
					//페이지 앞뒷면 전환효과
					arrPage[i].page.style.zIndex = i+1;
					arrContent[i].style.opacity=0;
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
					// contentFlag = true;
					arrPage[i].flag = "none";
				}
			}
			if( flag != "next" && arrPage[i].flag=="prev"){
				//여러번 클릭해 넘길때 페이지넘김플래그와 콘텐츠플래그가 가장 마지막 페이지 넘김이 완료될때까지 유지
				flag = "prev";
				contentFlag = false;
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
					//페이지 앞뒷면 전환효과
					arrPage[i].page.style.zIndex = pages-(i+1);
					arrContent[i].style.opacity=1;
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
					// contentFlag = true;
					arrPage[i].flag = "none";
				}
			}
			//페이지 각도와 디그리변수, 페이지 밝기와 브라이트 변수 동기화
			arrPage[i].page.style["-webkit-transform"] = "rotateY("+arrPage[i].deg+"deg)";
			arrPage[i].page.style["transform"] = "rotateY("+arrPage[i].deg+"deg)";
			arrPage[i].page.style["-webkit-filter"] = "brightness("+arrPage[i].bright+")";
		}
		//페이지 넘김가능표시 제어
		if(flag=="none" && contentFlag==false){
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
		//콘텐츠 알파값 제어 / 현재 페이지의 각도가 -5도 이내로 들어오면 시작(이전/다음페이지 UI를 위해 -5도의 여분)
		// if(contentFlag && arrPage[currentPage].deg >=-5){
		// 	arrContent[currentPage].alpha+=0.04;
		// 	if(arrContent[currentPage].alpha>=1){
		// 		// if(currentPage>0) // 플래그하나 추가해서 콘텐츠 확대? 활성화? 버튼을 가능하게 만들것
		// 		// 	arrContent[currentPage].ctnt.style["-webkit-transform"] = "translate3d(0px, 0px, 2px)";
		// 		arrContent[currentPage].alpha=1;
		// 		contentFlag = false;
		// 	}
		// }

		//인덱스 움직임 제어
		if(currentPage<1){
			if(flag=="none"){
				if(flagLight=="init"){
					if(lightAlpha<=0.86)
						idxIntro1.className="indexInit";
					if(lightAlpha<=0.85)
						idxWork1.className="indexInit";
				} else {
					idxIntro1.className="indexHover";
					idxWork1.className="indexHover";
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
				idxWork1.className="indexHover";
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
				idxIntro2.className="indexHover";
			} else{
				idxIntro2.className="index";
			}
			idxWork2.className="index";
		} else if(currentPage>2){
			idxIntro1.className="index";
			idxWork1.className="index";
			if(flag=="none"){
				idxIntro2.className="indexHover";
				idxWork2.className="indexHover";
			} else{
				idxIntro2.className="index";
				idxWork2.className="index";
			}
		}
	} else if(mode=="zoom"){
		//줌 모드 라이트 조절
		light.style.backgroundImage = "-webkit-gradient(radial, 50% 50%, 0, 50% 50%, "+lightSize+", from(rgba(0,0,0,0)), to(rgba(0,0,0,"+lightAlpha+")), color-stop(0.7, rgba(0,0,0,"+lightDropoff+")))";
		light.style.backgroundImage	= "-ms-radial-gradient(center center, "+lightSize+"px "+lightSize+"px, rgba(0,0,0,0) 0%, rgba(0,0,0,"+lightDropoff+") 70%, rgba(0,0,0,"+lightAlpha+") 100%)";
		if(flagLight=="none"){
			lightSize-=40;
			if(lightSize<=0)
				lightSize=0;
			if(lightSize==0)
				flagLight="zoomout";
		}
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
	if(multiFlag=="category"){
		if(num == undefined)
			num = currentPage;
		arrPage[num].flag = "next";
		currentPage++;
		num++;
		if(num==targetNum){
			currentPage=targetNum;
			targetNum=undefined;
			num=undefined;
			multiFlag="none";
		}
	}
}
function pageSetting(_i){
	var arrP = document.getElementsByClassName("page");
	var objP={};
	objP.page = arrP[_i];
	objP.flag = "none";
	objP.deg = 0;
	objP.accel = 0;
	objP.bright = 1;
	arrPage.push(objP);
	arrPage[_i].page.style.zIndex = pages-(_i+1);
	if(_i==0){
		arrPage[_i].page.style.backgroundColor="#2c2119";
	} else if(_i==pages-1){
		arrPage[_i].page.style.backgroundColor="lightgrey";
		arrPage[_i].page.style["-webkit-box-shadow"]="0px 0 100px 30px rgba(0, 0, 0, 0.6)";
		arrPage[_i].page.style["box-shadow"]="0px 0 100px 30px rgba(0, 0, 0, 0.6)";
	}
}
function init(){
	//시작
	mode="book";
	book.style.display="block";
	flagLight="init";
	light.removeChild(light.childNodes[0]);
	// light.style.backgroundColor="transparent";
	animation();
	//페이지가 여러장 넘어가는 움직임에 약간의 시간차를 주기위해 리퀘스트애니메이션 대신에 인터벌함수 사용
	setInterval(multiAnim, 100);
};
//sheetdata로부터 분류해서 카테고리 배열 설정
function categorySetting(){
	var categorySheet=[];
	var point;
	categories=0;
	//카테고리 갯수 확인
	for(var i=0; i<sheetdata.length; i++){
		if(sheetdata[i].content.$t=="누적통계")
			point=sheetdata[i].title.$t.substr(0,1);
		if(sheetdata[i].title.$t.substr(0,1)==point && sheetdata[i].title.$t.substr(1, 5)!=1){
			categories++;
		}
	}
	
	//카테고리별 항목수 확인 및 카테고리 배열 생성
	for(var i=2; i<categories+2; i++){
		var data={};
		for(var j=0; j<sheetdata.length; j++){
			if(sheetdata[j].title.$t.substr(1, 5)==i){
				if(sheetdata[j].title.$t.substr(0, 1)==point){
					data.name=sheetdata[j].content.$t;
					data.num=sheetdata[j+1].content.$t;
				}
			}
		}
		categorySheet.push(data);
	}
	//카테고리별 샘플 이미지주소 삽입
	for(var i=0; i<categories; i++){
		for(var j=0; j<database.length; j++){
			if(database[j].category==categorySheet[i].name && database[j].rep=="v"){
				if(database[j].type=="image")
					categorySheet[i].sample=database[j].source;
				else
					categorySheet[i].sample=database[j].sample;
				categorySheet[i].targetNum=j;
			}
		}
	}
	return categorySheet;
};
//html 페이지 세팅
function building(){
	book = document.querySelector("#book");
	zoomBox = document.querySelector("#zoomBox");
	prev = document.querySelector("#prev");
	next = document.querySelector("#next");
	btnClose = document.querySelector("#close");
	light.childNodes[0].textContent="사이트 구성중...";
	//작업확대창 종료 버튼
	light.onclick = function(){
		if(mode=="zoom"){
			zoomBox.style.opacity=0;
			zoomBox.style.width="0px";
			zoomBox.style.height="0px";
			zoomBox.innerHTML = "";
			zoomBox.style.marginLeft = "0px";
			zoomBox.style.marginTop = "0px";
			btnClose.style.display="none";
			light.style.pointerEvents="none";
			mode="book";
		}
	}
	//페이지 설정 시작 //work 페이지 생성
	var pagediv = document.createElement('div');
	pagediv.className = "page";
	pagediv.appendChild(document.createElement('div')); pagediv.childNodes[0].id="work1"; pagediv.childNodes[0].textContent="Work";
	pagediv.appendChild(document.createElement('img')); pagediv.childNodes[1].src="css/bg_page.png"; pagediv.childNodes[1].style.backgroundColor="#f3f3f3"; pagediv.childNodes[1].style.position="absolute";
	pagediv.appendChild(document.createElement('div'));	pagediv.childNodes[2].className="content";
	//카테고리 생성
	categorySetting();
	for(var i=0; i<categories; i++){
		pagediv.childNodes[2].appendChild(document.createElement('div'));
		pagediv.childNodes[2].childNodes[i].className="block";
			pagediv.childNodes[2].childNodes[i].appendChild(document.createElement('div'));
			pagediv.childNodes[2].childNodes[i].childNodes[0].className="category";
			pagediv.childNodes[2].childNodes[i].childNodes[0].name=categorySetting()[i].targetNum;
			//샘플 이미지 삽입
			pagediv.childNodes[2].childNodes[i].childNodes[0].style.backgroundImage="url("+categorySetting()[i].sample+")";
			pagediv.childNodes[2].childNodes[i].childNodes[0].style.backgroundSize="330px";
			pagediv.childNodes[2].childNodes[i].childNodes[0].style.backgroundRepeat="repeat-x";
			//카테고리 버튼
			pagediv.childNodes[2].childNodes[i].childNodes[0].onclick = function(e){
				targetNum=e.target.name+3;
				if(e.target.name!=undefined && currentPage==2 && flag=="none"){
					multiFlag="category";
				}
			};
			//카테고리명 삽입
			pagediv.childNodes[2].childNodes[i].appendChild(document.createElement('div'));
			pagediv.childNodes[2].childNodes[i].childNodes[1].className="subBlock";
				pagediv.childNodes[2].childNodes[i].childNodes[1].appendChild(document.createElement('h2'));
				pagediv.childNodes[2].childNodes[i].childNodes[1].childNodes[0].textContent=categorySetting()[i].name+" ("+categorySetting()[i].num+")";
	}
		pagediv.childNodes[2].appendChild(document.createElement('div'));
		pagediv.childNodes[2].childNodes[categories].className="footer";
			pagediv.childNodes[2].childNodes[categories].appendChild(document.createElement('div')); pagediv.childNodes[2].childNodes[categories].childNodes[0].className="footerLeft"; pagediv.childNodes[2].childNodes[categories].childNodes[0].textContent="Copyright 2013. RM (Seungwoon Park) all rights reserved.";
			pagediv.childNodes[2].childNodes[categories].appendChild(document.createElement('div')); pagediv.childNodes[2].childNodes[categories].childNodes[1].className="footerRight"; pagediv.childNodes[2].childNodes[categories].childNodes[1].textContent="Work_2";
	pages++;
	book.appendChild(pagediv);
	//작업별 페이지 생성
	for(var i=0; i<database.length; i++){
		pagediv = document.createElement('div');
		pagediv.className = "page";
		pagediv.appendChild(document.createElement('div'));	pagediv.childNodes[0].className="content";
			pagediv.childNodes[0].appendChild(document.createElement('div'));
			//샘플 이미지 삽입
			pagediv.childNodes[0].childNodes[0].className="workBlock";
				pagediv.childNodes[0].childNodes[0].appendChild(document.createElement('img'));
				pagediv.childNodes[0].childNodes[0].childNodes[0].className="button";
				pagediv.childNodes[0].childNodes[0].childNodes[0].name = i;
				if(database[i].type=="image")
					pagediv.childNodes[0].childNodes[0].childNodes[0].src=database[i].source;
				else
					pagediv.childNodes[0].childNodes[0].childNodes[0].src=database[i].sample;
				pagediv.childNodes[0].childNodes[0].childNodes[0].style.width = "678px";
				//이미지 클릭 버튼
				pagediv.childNodes[0].childNodes[0].childNodes[0].onclick = function(e){
					var i=e.target.name;
					if(flag=="none" && mode=="book"){
						zoomBox.style.opacity=1;
						zoomBox.style.width=database[i].width+"px";
						zoomBox.style.height=database[i].height+"px";
						if(database[i].type=="web")
							zoomBox.innerHTML = "<iframe src="+database[i].source+" class=\"zoom\" style=\"border: none\"></iframe>"
						else if(database[i].type=="video")
							zoomBox.innerHTML = "<video src="+database[i].source+" class=\"zoom\" autoplay loop controls=\"none\">브라우저에서 비디오를 지원하지 않습니다.</video>"
						else if(database[i].type=="image")
							zoomBox.innerHTML = "<img src="+database[i].source+" class=\"zoom\"/>";
						zoomBox.childNodes[0].style.width=database[i].width+"px";
						zoomBox.childNodes[0].style.height=database[i].height+"px";
						zoomBox.style.marginLeft = (database[i].width/2*-1)+"px";
						zoomBox.style.marginTop = (database[i].height/2*-1)+"px";
						btnClose.style.display="block";
						light.style.pointerEvents="auto";
						mode="zoom";
					}
				};
			//작업 텍스트 삽입
			pagediv.childNodes[0].appendChild(document.createElement('div'));
			pagediv.childNodes[0].childNodes[1].className="workTextBlock";
			pagediv.childNodes[0].childNodes[1].innerHTML="<h2>"+database[i].title+"</h2><h3>"+database[i].content+"</h3><h3 style=\"color:grey\">"+database[i].subcontent+"</h3>"
			pagediv.childNodes[0].appendChild(document.createElement('div')); pagediv.childNodes[0].childNodes[2].className="footer";
				pagediv.childNodes[0].childNodes[2].appendChild(document.createElement('div')); pagediv.childNodes[0].childNodes[2].childNodes[0].className="footerLeft"; pagediv.childNodes[0].childNodes[2].childNodes[0].textContent="Copyright 2013. RM (Seungwoon Park) all rights reserved.";
				pagediv.childNodes[0].childNodes[2].appendChild(document.createElement('div')); pagediv.childNodes[0].childNodes[2].childNodes[1].className="footerRight"; pagediv.childNodes[0].childNodes[2].childNodes[1].textContent="Work_"+database[i].category+"_"+database[i].title+"_"+(i+3);
		pages++;
		book.appendChild(pagediv);
	}
	//outro 페이지 생성
	pagediv = document.createElement('div');
	pagediv.className = "page";
	pagediv.appendChild(document.createElement('div')); pagediv.childNodes[0].id="work2"; pagediv.childNodes[0].textContent="Work";
	pagediv.appendChild(document.createElement('div')); pagediv.childNodes[1].id="intro2"; pagediv.childNodes[1].textContent="About";
	pagediv.appendChild(document.createElement('img')); pagediv.childNodes[2].src="css/bg_page.png"; pagediv.childNodes[2].style.backgroundColor="lightgrey"; pagediv.childNodes[2].style.position="absolute";
	pagediv.appendChild(document.createElement('div'));	pagediv.childNodes[3].className="content";
		pagediv.childNodes[3].appendChild(document.createElement('div'));
		pagediv.childNodes[3].childNodes[0].className="block";
			pagediv.childNodes[3].childNodes[0].appendChild(document.createElement('h2')); pagediv.childNodes[3].childNodes[0].childNodes[0].textContent="Outro: Marionette Atelier";
			pagediv.childNodes[3].childNodes[0].appendChild(document.createElement('h3')); pagediv.childNodes[3].childNodes[0].childNodes[1].textContent="RM's web-portfolio";
			pagediv.childNodes[3].childNodes[0].appendChild(document.createElement('h3')); pagediv.childNodes[3].childNodes[0].childNodes[2].textContent="Design: RM";
			pagediv.childNodes[3].childNodes[0].appendChild(document.createElement('h3')); pagediv.childNodes[3].childNodes[0].childNodes[3].textContent="010-6346-4374"; pagediv.childNodes[3].childNodes[0].childNodes[3].style.color="#2c2119";
			pagediv.childNodes[3].childNodes[0].appendChild(document.createElement('h3')); pagediv.childNodes[3].childNodes[0].childNodes[4].textContent="red.marionette0424@gmail.com"; pagediv.childNodes[3].childNodes[0].childNodes[4].style.color="#2c2119";
			pagediv.childNodes[3].childNodes[0].appendChild(document.createElement('br'));
			pagediv.childNodes[3].childNodes[0].appendChild(document.createElement('h3')); pagediv.childNodes[3].childNodes[0].childNodes[6].textContent="Font: Malgun Gothic";
			pagediv.childNodes[3].childNodes[0].appendChild(document.createElement('h3')); pagediv.childNodes[3].childNodes[0].childNodes[7].textContent="Built by RM, in HTML5.";
			pagediv.childNodes[3].childNodes[0].appendChild(document.createElement('br'));
			pagediv.childNodes[3].childNodes[0].appendChild(document.createElement('h3')); pagediv.childNodes[3].childNodes[0].childNodes[9].textContent="Copyright 2013. RM (Seungwoon Park) all rights reserved.";

	pages++;
	book.appendChild(pagediv);
	//페이지/컨텐츠 제어 변수
	for(var i=0; i<pages; i++){
		pageSetting(i);
	}
	arrContent = document.getElementsByClassName("content");
	//페이지 설정 종료 // 인덱스 설정
	idxIntro1 = document.querySelector("#intro1");
	idxIntro2 = document.querySelector("#intro2");
	idxWork1 = document.querySelector("#work1");
	idxWork2 = document.querySelector("#work2");
	idxIntro1.style.left=48+"px";
	idxWork1.style.left=220+"px";
	idxIntro2.style.left=48+"px";
	idxIntro2.style.backgroundColor="#bcbcbc";
	idxWork2.style.left=220+"px";
	idxWork2.style.backgroundColor="#a6a6a6";
	//인덱스 버튼의 경우 겹치는 부분을 처리하기 위해 온클릭 함수를 사용(div의 상하관계를 인식)
	idxIntro1.onclick = function(){
		if(currentPage==0 && flag=="none" && mode=="book"){
			if(arrPage[currentPage].className!="nextPage" && (flag=="none" || flag=="next")){
				arrPage[0].flag = "next";
				currentPage=1;
			}
		}
	}
	idxIntro2.onclick = function(){
		if(currentPage>1 && flag=="none" && mode=="book"){
			multiFlag="intro2";
		}
	}
	idxWork1.onclick = function(){
		if(currentPage<2 && flag=="none" && mode=="book"){
			multiFlag="work1";
		}
	}
	idxWork2.onclick = function(){
		if(currentPage>2 && flag=="none" && mode=="book"){
			multiFlag="work2";
		}
	}
	init();
};
//마우스 버튼 제어
window.onmousemove = function(e){
	if(arrPage[pages-1] !=undefined){
		var margin = arrPage[pages-1].page.getBoundingClientRect();
		x = Math.floor(e.clientX - margin.left);
		y = Math.floor(e.clientY - margin.top);

		//이전페이지, 다음페이지 UI 뜨는 조건
		if(flag!="prev" && mode=="book" && flagLight!="load" && flagLight!="init" && currentPage==0 && x>0 && x<1280 && y>0 && y<720){
			canNext=true;
			next.style.opacity=0.75;
		} else if(flag!="prev" && mode=="book"  && currentPage>0 && currentPage<pages-1 && arrPage[0].flag!="next" && x>1000 && x<1280 && y>0 && y<720){
			canNext=true;
			next.style.opacity=0.75;
		} else {
			canNext=false;
			next.style.opacity=0;
		}
		if(flag!="next" && mode=="book" && flagLight!="load" && flagLight!="init" && currentPage>0 && x>-1280 && x<100 && y>0 && y<720){
			canPrev=true;
			prev.style.opacity=0.75;
		} else {
			canPrev=false;
			prev.style.opacity=0;
		}
	}
};
window.onmousedown = function(e){
	if(flag!="prev" && mode=="book" && currentPage==0 && x>0 && x<1280 && y>0 && y<720){
		if(flag=="none" && currentPage==0 && multiFlag=="none"){
			arrPage[0].flag = "next";
	 		currentPage=1;
	 	}
	}else if(flag!="prev" && mode=="book" && currentPage>0 && x>1000 && x<1280 && y>0 && y<720){
		if(arrPage[0].flag!="next" && currentPage<pages-1 && multiFlag=="none"){
			arrPage[currentPage].flag = "next";
			currentPage++;
		}
	}
	if(x>-1280 && x<100 && y>0 && y<720){
		if(flag=="none" && mode=="book" && currentPage==1 && multiFlag=="none"){
	 		arrPage[0].flag = "prev";
	 		currentPage=0;
	 	} else if(flag!="next" && mode=="book" && currentPage>1 && multiFlag=="none"){
	 		arrPage[currentPage-1].flag = "prev";
	 		currentPage--;
	 	}
	}
};
window.onmousewheel = function(){
	return;
};