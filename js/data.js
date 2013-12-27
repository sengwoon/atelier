/*
	Marionette Atelier, ver.1.00.0, 2013.12.27
	Copyright 2013. RM (Seungwoon Park)
	Designed and built by RM.
	red.marionette0424@gmail.com
*/

//구글 스프레드시트를 sheetdata에 넣고 분류후 database에 넣음
var database=[];
var url="https://spreadsheets.google.com/feeds/cells/0AkpjYAue4uC8dG1LVU5aTng3eWo0MDdSMEVHQjIwUXc/od6/public/basic?alt=json-in-script&callback=?";
var sheetdata=[];
$.getJSON(url, function(resp){ sheetdata=resp.feed.entry });
//sheetdata 정보를 분류해서 database에 넣기
function dataBaseSetting(){
	var arrHeader={};
	var workNum=0;
	//항목 불러오고 등록 작품 갯수 카운트
	for(var i=0; i<sheetdata.length; i++){
		if(sheetdata[i].title.$t.substr(1, 5)==1){
			arrHeader[i]=sheetdata[i].content.$t;
		}
		if(sheetdata[i].title.$t.substr(0, 1)=="A" && sheetdata[i].title.$t.substr(1, 5)!=1){
			workNum++;
		}
	}
	//알파벳을 수치화 할 수 있는 방법 찾아내면 바꿀 것
	for(var i=2; i<workNum+2; i++){
		var data={};
		for(var j=0; j<sheetdata.length; j++){
			if(sheetdata[j].title.$t.substr(1, 5)==i){
				switch(sheetdata[j].title.$t.substr(0, 1)){
					case "A":
						data[arrHeader[0].toLowerCase()]=sheetdata[j].content.$t;
						break;
					case "B":
						data[arrHeader[1].toLowerCase()]=sheetdata[j].content.$t;
						break;
					case "C":
						data[arrHeader[2].toLowerCase()]=sheetdata[j].content.$t;
						break;
					case "D":
						data[arrHeader[3].toLowerCase()]=sheetdata[j].content.$t;
						break;
					case "E":
						data[arrHeader[4].toLowerCase()]=sheetdata[j].content.$t;
						break;
					case "F":
						data[arrHeader[5].toLowerCase()]=sheetdata[j].content.$t;
						break;
					case "G":
						data[arrHeader[6].toLowerCase()]=sheetdata[j].content.$t;
						break;
					case "H":
						data[arrHeader[7].toLowerCase()]=sheetdata[j].content.$t;
						break;
					case "I":
						data[arrHeader[8].toLowerCase()]=sheetdata[j].content.$t;
						break;
					case "J":
						data[arrHeader[9].toLowerCase()]=sheetdata[j].content.$t;
						break;
				}
			}
		}
		database.push(data);
	}
	//page.js에서 세팅 실행
	building();
};
window.onload = function(){
	dataBaseSetting();
};