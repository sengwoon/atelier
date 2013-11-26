var btnNext, btnPrev;
var idxIntro, idxWork;
var arrPage = new Array(3);
var arrContent = new Array(3);
var flag = "none";
var currentPage=0;

function logic(){
	btnNext.onclick = function(){
		if(currentPage<arrPage.length){
			if(arrPage[currentPage].className!="nextPage" && (flag=="none" || flag=="next")){
				var i=currentPage;
				arrPage[i].className = "nextPage";
				arrContent[i].className = "nextContent";
				if(currentPage<arrPage.length-1) arrContent[i+1].className = "prevContent";
				flag="next";
				setTimeout( function(){
					arrPage[i].style.zIndex = i;
				}, 1000);
				setTimeout( function(){
					flag="none";
				}, 3200);
				currentPage++;
			}
		}
	};
	btnPrev.onclick = function(){
		if(currentPage>0){
			if(arrPage[currentPage-1].className=="nextPage" && (flag=="none" || flag=="prev")){
				var i=currentPage-1;
				arrPage[i].className = "prevPage";
				arrContent[i].className = "currentContent";
				if(currentPage<arrPage.length) arrContent[i+1].className = "nextContent";
				flag="prev";
				setTimeout( function(){
					arrPage[i].style.zIndex = arrPage.length-i;
				}, 1000);
				setTimeout( function(){
					flag="none";
				}, 3000);
				currentPage--;
			}
		}
	};
};

window.onload = function(){
	for(var i=0; i<arrPage.length; i++){
		arrPage[i] = document.querySelector("#page"+i);
		arrPage[i].style.zIndex = arrPage.length-i;
		arrContent[i] = document.querySelector("#content"+i);
	}
	btnNext = document.querySelector("#nextBtn");
	btnPrev = document.querySelector("#prevBtn");
	btnNext.style.zIndex=arrPage.length+1;
	btnPrev.style.zIndex=arrPage.length+1;

	idxIntro = document.querySelector("#intro1");
	idxWork = document.querySelector("#work1");

	logic();
};