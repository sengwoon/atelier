function ResourcePreLoader()
{
    this.isLoadComplete = false;
    this.nowResourceLoadedCount = 0; // 현재 로딩된 리소스 수
    this.intAllResourceCount = 0;
    this.arrResource = new Array();
    return this;
}

ResourcePreLoader.prototype.AddImage = function( fileName )
{    
    // 리소스 중복에 대한 처리
    for( var i = 0; i < this.arrResource.length; i++ )
    {
        if( this.arrResource[i].name == fileName )
        {
            debugSystem.Log( "WARN", "overlap resource "+ fileName );
            return;
        }
    }
    
    var img = new Image();
    img.src = fileName;
    img.addEventListener("load", onLoadImageResourceComplete, false);
    this.arrResource.push( { name: fileName ,image: img  } );
    this.intAllResourceCount++;
    
    debugSystem.Log( "LOG", "load resource "+ fileName );
};

ResourcePreLoader.prototype.GetImage = function( fileName )
{
    for( var i = 0; i < this.arrResource.length; i++ )
    {
        if( this.arrResource[i].name == fileName )
        {
            return this.arrResource[i].image;  
        }
    }
    
    debugSystem.Log( "ERROR", "can't find resource "+ fileName );
    return null;
};

var resourcePreLoader = new ResourcePreLoader();

function onLoadImageResourceComplete()
{
    
    resourcePreLoader.nowResourceLoadedCount++;
    // 현재 로딩된 리소스 수와 총 리소스 수 와 비교
    if( resourcePreLoader.nowResourceLoadedCount <= resourcePreLoader.intAllResourceCount )
    {
        // 모든 리소스 로딩 완료!!
        resourcePreLoader.isLoadComplete  = true;
    }
}

function LoadingState()
{
	this.loadingTimer = new Timer();
	this.developer = new Image();
	this.developer.src = "img/developer.png";
	this.imgLoading = new Image(); 
	this.imgLoading.src = "img/loading.png";
    return this;
}

LoadingState.prototype.Render = function( )
{
    var totalResourceCount = resourcePreLoader.intAllResourceCount + soundSystem.intAllResourceCount;
    var nowCompleteResourceCount = resourcePreLoader.nowResourceLoadedCount + soundSystem.nowResourceLoadedCount;
    Context.clearRect(0, 0, 960, 576);
	if(this.loadingTimer.nowFrame < 3000){
		Context.drawImage(this.developer, 0, 0);
	} else if( (this.loadingTimer.nowFrame>=3000)&&(this.loadingTimer.nowFrame < 7000) ) {
        Context.drawImage(this.imgLoading, 0, 0);
		Context.fillStyle    = "#ffffff";
	    Context.font         = '28px "ShowcardGothic"'; 
		Context.textBaseline = "top";
		Context.fillText( "Now Loading..." + (100 * nowCompleteResourceCount / totalResourceCount).toFixed(1)+" %", 31, 470 );
	}
	
};

LoadingState.prototype.Update = function( )
{
    // 리소스를 모두 로딩했다면 게임 타이틀 상태로 전환
    if( (this.loadingTimer.nowFrame>7000)&&resourcePreLoader.isLoadComplete&&soundSystem.isLoadComplete )
    {
        Context.clearRect(0, 0, 960, 576);
        ChangeGameState( after_loading_state );
    }    
};

