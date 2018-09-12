var linkApple = "https://itunes.apple.com/ph/app/episode-choose-your-story/id656971078?mt=8";
var linkPlaystore = "https://play.google.com/store/apps/details?id=com.episodeinteractive.android.catalog&hl=en";

function OpenExternalLink ( p_link )
{
    ExitApi.exit();
};
var frames = {  
    apple : {"x":0, "y":212, "w":288, "h":97},
    google :  {"x":0, "y":313, "w":288, "h":97},
    finger : {"x":292, "y":212, "w":126, "h":176},
    dialog : {"x":0, "y":0, "w":440, "h":120},
    choice :  {"x":0, "y":124, "w":404, "h":84},
    close :  {"x":0, "y":414, "w":24, "h":23}
    
};


//---//
var Preloader = function() {
	var resources = {};
	var cache = {};
	var loadPercentage = 0;
	var loadCallback = undefined;
	var doneCallback = undefined;

	var __construct = function() {

        var windowLocation = window.location.toString();
        var location = windowLocation.substring(0, windowLocation.lastIndexOf("/"));

		resources = {
			audio : [
			],

			image : [
				{ key : "01_BG", url : location + "/assets/01_BG_Landscape.jpg" }
				,{ key : "02_BG", url : location + "/assets/02_BG_Landscape.jpg" }
				,{ key : "03_BG", url : location + "/assets/03_BG_Landscape.jpg" }
				,{ key : "04_BG", url : location + "/assets/04_BG_Landscape.jpg" }
				,{ key : "endcard", url : location + "/assets/Endcard-landscape.jpg" }


				,{ key : "ui", url : location + "/assets/ui.png" }


				,{ key : "03_guy", url : location + "/assets/S3/03_Guy.png" }

				,{ key : "04_Girl_ArmR", url : location + "/assets/S4/04_Girl_ArmR_V2.png" }
				,{ key : "04_Girl_LowerBody", url : location + "/assets/S4/04_Girl_LowerBody_V2.png" }
				,{ key : "04_Girl_UpperBody", url : location + "/assets/S4/04_Girl_UpperBody_V3.png" }
				,{ key : "04_Girl_Head", url : location + "/assets/S4/04_Girl_Head.png" }
				,{ key : "04_Girl_BackHair", url : location + "/assets/S4/04_Girl_BackHair.png" }
				
				,{ key : "01_Girl_UpperBody", url : location + "/assets/S1/01_Girl_UpperBody_V2.png" }
				,{ key : "01_Guy", url : location + "/assets/S1/01_Guy.png" }
				,{ key : "01_Girl_ForearmR", url : location + "/assets/S1/01_Girl_ForearmR_V2.png" }
				,{ key : "01_Girl_ArmR", url: location + "/assets/S1/01_Girl_ArmR.png"}
				,{ key : "01_Girl_ArmL", url: location + "/assets/S1/01_Girl_ArmL.png"}
				,{ key : "01_Girl_ForearmL_V2", url: location + "/assets/S1/01_Girl_ForearmL_V2.png"}
				

				,{ key : "02_Girl_LowerBody", url : location + "/assets/S2/02_Girl_LowerBody.png" }
				,{ key : "02_Girl_Torso", url : location + "/assets/S2/02_Girl_Torso_V2.png" }
				,{ key : "02_Doctor_Body", url : location + "/assets/S2/02_Doctor_Body_V2.png" }
				,{ key : "02_Doctor_ForearmL", url : location + "/assets/S2/02_Doctor_ForearmL_V2.png" }
				,{ key : "02_Girl_ForearmL", url : location + "/assets/S2/02_Girl_ForearmL_V2.png" }

				,{ key : "03_Girl", url : location + "/assets/S3/03_Girl_Torso.png" }
				,{ key : "03_Girl_Head", url : location + "/assets/S3/03_Girl_Head.png" }
				,{ key : "03_Girl_HeadBack", url : location + "/assets/S3/03_Girl_BackHair.png" }
				,{ key : "03_Girl_Hand", url : location + "/assets/S3/03_Girl_Hand_Flower.png" }
				,{ key : "03_Doctor", url : location + "/assets/S3/03_Doctor_V3.png" }
				,{ key : "03_Doctor_Head", url : location + "/assets/S3/03_Doctor_Head.png" }

				,{ key : "04_Doctor_LowerBody", url : location + "/assets/S4/04_Doctor_LowerBody_V2.png" }
				,{ key : "04_Doctor_UpperBody", url : location + "/assets/S4/04_Doctor_UpperBody_V3.png" }
				,{ key : "04_Doctor_ArmL", url : location + "/assets/S4/04_Doctor_ArmL_V3.png" }
				,{ key : "04_Doctor_ForearmR", url : location + "/assets/S4/04_Doctor_ForearmR_V3.png" }
				,{ key : "04_Doctor_ForearmL", url : location + "/assets/S4/04_Doctor_ForearmL.png" }
				,{ key : "04_Girl_HandL", url : location + "/assets/S4/04_Girl_HandL.png" }

				,{ key : "04_Girl_ArmL", url : location + "/assets/S4/04_Girl_ArmL.png" }
                ,{ key : "04_Girl_ForearmL", url : location + "/assets/S4/04_Girl_ForearmL.png" }
                
			]
		};

		cache = {
			audio : {
				count : 0
			},
			image : {
				count : 0
			}
		};
	}()

	function setLoadCallback(callback) {
		loadCallback = callback;
	}

	function setDoneCallback(callback) {
		doneCallback = callback;
	}

	function loadResources() {
		var audioResources = resources["audio"];
		var audioCount = audioResources.length;
		while(audioCount) {
			audioCount -= 1;

			var xhr = new XMLHttpRequest();
			xhr.open("GET", audioResources[audioCount].url, true);
			xhr.responseType = "blob";
			xhr.type = "audio";
			xhr.key = audioResources[audioCount].key;
			xhr.onload = (pass) => { 
				loadComplete(pass.currentTarget); 
			};
			xhr.send();
		};

		var imageResources = resources["image"];
		var imageCount = imageResources.length;
		while(imageCount) {
			imageCount -= 1;

			var xhr = new XMLHttpRequest();
			xhr.open("GET", imageResources[imageCount].url, true);
			xhr.responseType = "blob";
			xhr.type = "image";
			xhr.key = imageResources[imageCount].key;
			xhr.onload = (pass) => { 
				loadComplete(pass.currentTarget); 
			};
			xhr.send();
		};
	}

	function loadComplete(pass) {
		var audioResourceCount = resources["audio"].length;
		var imageResourceCount = resources["image"].length;

		cache[pass.type][pass.key] = pass;
		cache[pass.type]["count"] += 1

		var audioCacheCount = cache["audio"]["count"];
		var imageCacheCount = cache["image"]["count"];

		loadPercentage = (audioCacheCount + imageCacheCount) / (audioResourceCount + imageResourceCount);

		if(loadCallback) {
			loadCallback();
		}

		if(loadPercentage >= 1 && doneCallback) {
			doneCallback();
		}
	}

	function loadDone() {
		if(loadDoneCallback) {
			loadDoneCallback();
		}
	}

	function getCachedData(type, key) {
		var resp = cache[type][key];
		return resp?window.URL.createObjectURL(resp.response):resp;
	}

	function getLoadPercentage() {
		return loadPercentage;
	}

	return {
		setLoadCallback : setLoadCallback,
		setDoneCallback : setDoneCallback,
		loadResources : loadResources,
		getCachedData : getCachedData,
		getLoadPercentage : getLoadPercentage
	}
};

var Preloader = new Preloader();
//---//
S6Scene = function()
{
    //Contains Declaration of Assets
    InitializeScene = function()
    {

    }

    DestroyScene = function()
    {

    }

    UpdateScene = function()
    {

    }

    return {
        InitializeScene:InitializeScene,
        DestroyScene:DestroyScene,
        UpdateScene:UpdateScene
    }

};

//---//
var S6Overlay = function(){
    
        var alpha = 0;
        var fadeDuration = 1;
        var fadingIn = false;
        var fadingOut = false;
        var bIsActive = false;
        var overlay = document.getElementById("overlay");
        //overlay.style.zIndex = 0;
    
        var lastUpdate = Date.now();
        var deltaTime = 0;
    
        var init = function ()
        {
            overlay = document.getElementById("overlay");
            console.log("S6Overlay Initialized");
        }
    
        init();
    
        var fadeIn = function( p_duration = 1 )
        {
            fadingIn = true;
            fadeDuration = p_duration;
            bIsActive = true;
            overlay.style.opacity = 0.5;
            overlay.style.zIndex = 10;
            console.log( "FADE IN");
        }
    
        var fadeOut = function( p_duration = 1 )
        {
            fadingOut = true;
            fadeDuration = p_duration;
            bIsActive = true;
        }
    
        var update = function()
        {
            if( overlay == undefined )
            {
                overlay = document.getElementById("overlay"); 
                if( overlay != undefined )
                {
                    console.log("Overlay has been Initialized Successfully");
                }
            }
    
            if( !bIsActive ) return;
    
            var now = Date.now();
            deltaTime = (now - lastUpdate)/1000;
            lastUpdate = now;
    
            if ( fadingIn )
            {
                overlay.style.zIndex = 10;
                //OnComplete, fadingIn = false
            }
            else if( fadingOut )
            {
                //OnComplete, fadingOut = false, overlay.style.zIndex = 0;
            }
        }
    
    
        return {
            init:init,
            fadeIn:fadeIn,
            fadeOut:fadeOut,
            update:update
        };
    
    
    }
    
    S6Overlay = new S6Overlay();

//---//
var EaseType = {
    Linear:0,

    QuadIn:1,
    QuadOut:2,
    QuadInOut:3,

    CubeIn:4,
    CubeOut:5,
    CubeInOut:6,

    QuartIn:7,
    QuartOut:8,
    QuartInOut:9,

    QuintIn:10,
    QuintOut:11,
    QuintInOut:12,

    SineIn:13,
    SineOut:14,
    SineInOut:15,

    ExpoIn:16,
    ExpoOut:17,
    ExpoInOut:18,

    CircIn:19,
    CircOut:20,
    CircInOut:21,

    BackIn:22,
    BackOut:23,
    BackInOut:24,

    BounceIn:25,
    BounceOut:26,
    BounceInOut:27,

    ElasticIn:28,
    ElasticOut:29,
    ElasticInOut:30
}

var easingFunctions = [];

easingFunctions[EaseType.Linear] = function(n){
  return n;
};

easingFunctions[EaseType.QuadIn] = function(n){
  return n * n;
};

easingFunctions[EaseType.QuadOut] = function(n){
  return n * (2 - n);
};

easingFunctions[EaseType.QuadInOut]= function(n){
  n *= 2;
  if (n < 1) return 0.5 * n * n;
  return - 0.5 * (--n * (n - 2) - 1);
};

easingFunctions[EaseType.CubeIn] = function(n){
  return n * n * n;
};

easingFunctions[EaseType.CubeOut] = function(n){
  return --n * n * n + 1;
};

easingFunctions[EaseType.CubeInOut] = function(n){
  n *= 2;
  if (n < 1) return 0.5 * n * n * n;
  return 0.5 * ((n -= 2 ) * n * n + 2);
};

easingFunctions[EaseType.QuartIn] = function(n){
  return n * n * n * n;
};

easingFunctions[EaseType.QuartOut] = function(n){
  return 1 - (--n * n * n * n);
};

easingFunctions[EaseType.QuartInOut] = function(n){
  n *= 2;
  if (n < 1) return 0.5 * n * n * n * n;
  return -0.5 * ((n -= 2) * n * n * n - 2);
};

easingFunctions[EaseType.QuintIn] = function(n){
  return n * n * n * n * n;
}

easingFunctions[EaseType.QuintOut] = function(n){
  return --n * n * n * n * n + 1;
}

easingFunctions[EaseType.QuintInOut] = function(n){
  n *= 2;
  if (n < 1) return 0.5 * n * n * n * n * n;
  return 0.5 * ((n -= 2) * n * n * n * n + 2);
};

easingFunctions[EaseType.SineIn] = function(n){
  return 1 - Math.cos(n * Math.PI / 2 );
};

easingFunctions[EaseType.SineOut] = function(n){
  return Math.sin(n * Math.PI / 2);
};

easingFunctions[EaseType.SineInOut] = function(n){
  return .5 * (1 - Math.cos(Math.PI * n));
};

easingFunctions[EaseType.ExpoIn] = function(n){
  return 0 == n ? 0 : Math.pow(1024, n - 1);
};

easingFunctions[EaseType.ExpoOut] = function(n){
  return 1 == n ? n : 1 - Math.pow(2, -10 * n);
};

easingFunctions[EaseType.ExpoInOut] = function(n){
  if (0 == n) return 0;
  if (1 == n) return 1;
  if ((n *= 2) < 1) return .5 * Math.pow(1024, n - 1);
  return .5 * (-Math.pow(2, -10 * (n - 1)) + 2);
};

easingFunctions[EaseType.CircIn] = function(n){
  return 1 - Math.sqrt(1 - n * n);
};

easingFunctions[EaseType.CircOut] = function(n){
  return Math.sqrt(1 - (--n * n));
};

easingFunctions[EaseType.CircInOut] = function(n){
  n *= 2
  if (n < 1) return -0.5 * (Math.sqrt(1 - n * n) - 1);
  return 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
};

easingFunctions[EaseType.BackIn] = function(n){
  var s = 1.70158;
  return n * n * (( s + 1 ) * n - s);
};

easingFunctions[EaseType.BackOut] = function(n){
  var s = 1.70158;
  return --n * n * ((s + 1) * n + s) + 1;
};

easingFunctions[EaseType.BackInOut] = function(n){
  var s = 1.70158 * 1.525;
  if ( ( n *= 2 ) < 1 ) return 0.5 * ( n * n * ( ( s + 1 ) * n - s ) );
  return 0.5 * ( ( n -= 2 ) * n * ( ( s + 1 ) * n + s ) + 2 );
};

easingFunctions[EaseType.BounceIn] = function(n){
  return 1 - easingFunctions[EaseType.BounceOut](1 - n);
};

easingFunctions[EaseType.BounceOut] = function(n){
  if ( n < ( 1 / 2.75 ) ) {
    return 7.5625 * n * n;
  } else if ( n < ( 2 / 2.75 ) ) {
    return 7.5625 * ( n -= ( 1.5 / 2.75 ) ) * n + 0.75;
  } else if ( n < ( 2.5 / 2.75 ) ) {
    return 7.5625 * ( n -= ( 2.25 / 2.75 ) ) * n + 0.9375;
  } else {
    return 7.5625 * ( n -= ( 2.625 / 2.75 ) ) * n + 0.984375;
  }
};

easingFunctions[EaseType.BounceInOut] = function(n){
  if (n < .5) return easingFunctions[EaseType.BounceIn](n * 2) * .5;
  return easingFunctions[EaseType.BounceOut](n * 2 - 1) * .5 + .5;
};

easingFunctions[EaseType.ElasticIn] = function(n){
  var s, a = 0.1, p = 0.4;
  if ( n === 0 ) return 0;
  if ( n === 1 ) return 1;
  if ( !a || a < 1 ) { a = 1; s = p / 4; }
  else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
  return - ( a * Math.pow( 2, 10 * ( n -= 1 ) ) * Math.sin( ( n - s ) * ( 2 * Math.PI ) / p ) );
};

easingFunctions[EaseType.ElasticOut] = function(n){
  var s, a = 0.1, p = 0.4;
  if ( n === 0 ) return 0;
  if ( n === 1 ) return 1;
  if ( !a || a < 1 ) { a = 1; s = p / 4; }
  else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
  return ( a * Math.pow( 2, - 10 * n) * Math.sin( ( n - s ) * ( 2 * Math.PI ) / p ) + 1 );
};

easingFunctions[EaseType.ElasticInOut] = function(n){
  var s, a = 0.1, p = 0.4;
  if ( n === 0 ) return 0;
  if ( n === 1 ) return 1;
  if ( !a || a < 1 ) { a = 1; s = p / 4; }
  else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
  if ( ( n *= 2 ) < 1 ) return - 0.5 * ( a * Math.pow( 2, 10 * ( n -= 1 ) ) * Math.sin( ( n - s ) * ( 2 * Math.PI ) / p ) );
  return a * Math.pow( 2, -10 * ( n -= 1 ) ) * Math.sin( ( n - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;
};
//---//
var S6Tween = function(){

    var Manager = function() {
		var lastUpdate = Date.now();
		var tweenArray = [];
		var bUpdateIsOn = false;

		var _startUpdate = function(){
			if(!bUpdateIsOn){
				bUpdateIsOn = true;
				lastUpdate = Date.now();
			}
		}

		var _checkToStopUpdate = function(){
			if(tweenArray.length == 0)
				bUpdateIsOn = false;	
		}

		var _update = function(){
			if(!bUpdateIsOn)
				return;

			var now = Date.now();
			var dt = (now - lastUpdate)/1000;
			lastUpdate = now;

			for(var i = 0; i < tweenArray.length; i++){
				tweenArray[i].update(dt);
			}
		}

		var _addTween = function(p_tween){
			tweenArray.push(p_tween);
			_startUpdate();
		}

		var _cleanTween = function(p_tween){
			for(var i = 0; i < tweenArray.length; i++){
				if(tweenArray[i] === p_tween){
					tweenArray.splice(i, 1);
					break;
				}
			}
			delete(p_tween);
			_checkToStopUpdate();
		}

		return {
			update:_update,
			cleanTween:_cleanTween,
			addTween:_addTween
		};
	}

	var _manager = new Manager();

//-- tween tools -----------------

	var TweenTimer = function (p_duration){

		var _delay = 0;
		var _bStart = false;
		var _timer = 0;

		var _start = function (p_delay = 0){
			_delay = p_delay;
			_timer = 0;
			_bStart = true;
		}

		var _update = function (p_dt){

			if(!_bStart)
				return 0;


			if(_delay > 0){
				_delay -= p_dt;
				if(_delay <= 0)
					_timer = 0;
				else
					return 0;
			}


			if(_timer < p_duration){
				_timer += p_dt;

				var unitProgress = _timer/p_duration;

				//clamp the value
				if(unitProgress > 1) unitProgress = 1;
				if(unitProgress < 0) unitProgress = 0;

				return unitProgress;
			}
			else{
				return 1;
			}
		}

		return {
			start:_start,
			update:_update,
			isRunning:function(){return _bStart;}
		};
	}

	var TweenRepeater = function(p_repeat){
		var _repeat = p_repeat;

		var _shouldRepeat = function(){

			if(_repeat == -1)
				return true;

			if(_repeat > 0){
				_repeat--;
				return true;
			}

			return false;
		}

		return {
			shouldRepeat:_shouldRepeat
		};
	}
	
	var CallBack = function (p_callBack, p_callbackContext = null){
		var callback = p_callBack;
		var context = p_callbackContext;

		if(typeof callback != "function")
			callback = null;

		var _trigger = function (){

			if(context != null){
				if(callback != null)
					context.callback();
			}
			else if(callback != null)
				callback();
		}

		return {
			trigger:_trigger
		};
	}

//----------------------------
// 		t w e e n s
//-----------------------------

	var MoveTo = function (p_target, p_to, p_duration, p_easeType, p_repeat, p_repeatBackwards){
		var spriteTarget = p_target;
		var toPos = {x:p_to.x, y: p_to.y};
		var fromPos = (p_target.position == undefined) ? undefined : {x:p_target.position.x, y:p_target.position.y};
		var startPos = fromPos;
		var timer = new TweenTimer(p_duration);
		var repeater = new TweenRepeater(p_repeat);
		var finishCb = null;
		var loopCb = null;

		var _start = function(p_delay = 0){
			fromPos = (p_target.position == undefined) ? undefined : {x:p_target.position.x, y:p_target.position.y};
			startPos = fromPos;
			timer.start(p_delay);
		}

		var _update = function(p_dt){

			if(!timer.isRunning())
				return;

			var unitProgress = timer.update(p_dt);

			//apply the easings here
			var easeval = easingFunctions[p_easeType](unitProgress);

			var newXPos = fromPos.x + (easeval * (toPos.x - fromPos.x));
			var newYPos = fromPos.y + (easeval * (toPos.y - fromPos.y));

			spriteTarget.setPosition(newXPos, newYPos);

			if(unitProgress == 1){
				if(repeater.shouldRepeat()){

					if(p_repeatBackwards){
						var tmp = toPos;
						toPos = fromPos;
						fromPos = tmp;
					}
					else{
						spriteTarget.setPosition(startPos.x, startPos.y);
					}
					if(loopCb != null)
						loopCb.trigger();
					timer.start();
				}
				else{
					if(finishCb != null)
						finishCb.trigger();
					_manager.cleanTween(this);
				}
			}
		}

		function _setFinishCallback(p_callbackFunc, p_callbackContext = null)
		{
			finishCb = new CallBack(p_callbackFunc, p_callbackContext);
		}

		function _setOnLoopCallback(p_callbackFunc, p_callbackContext = null)
		{
			loopCb = new CallBack(p_callbackFunc, p_callbackContext);
		}

		return {
			start:_start,
			update:_update,
			setFinishCallback:_setFinishCallback,
			setOnLoopCallback:_setOnLoopCallback
		};
	}

	var ScaleTo = function (p_target, p_to, p_duration, p_easeType, p_repeat, p_repeatBackwards){
		var spriteTarget = p_target;
		var toScale = p_to;
		var fromScale = spriteTarget.getScale(); //change this to getscale from S6Sprite when possible
		var startScale = fromScale;
		var timer = new TweenTimer(p_duration);
		var repeater = new TweenRepeater(p_repeat);
		var finishCb = null;
		var loopCb = null;

		var _start = function(p_delay = 0){
			fromScale = spriteTarget.getScale();
			startScale = fromScale;
			timer.start(p_delay);
		}

		var _update = function(p_dt){
			if(!timer.isRunning())
				return;
			var unitProgress = timer.update(p_dt);
			//apply the easings here
			var easeval = easingFunctions[p_easeType](unitProgress);
			var newScale = fromScale + (easeval * (toScale - fromScale));
			spriteTarget.setScale(newScale);
			//spriteTarget.scale = newScale;

			if(unitProgress == 1){
				if(repeater.shouldRepeat()){
					if(p_repeatBackwards){
						var tmp = toScale;
						toScale = fromScale;
						fromScale = tmp;
					}
					else{
						spriteTarget.setScale(startScale);	
						//spriteTarget.scale = startScale;								
					}
					if(loopCb != null)
						loopCb.trigger();
					timer.start();
				}
				else{
					if(finishCb != null)
						finishCb.trigger();
					_manager.cleanTween(this);
				}
			}
		}

		function _setFinishCallback(p_callbackFunc, p_callbackContext = null)
		{
			finishCb = new CallBack(p_callbackFunc, p_callbackContext);
		}

		function _setOnLoopCallback(p_callbackFunc, p_callbackContext = null)
		{
			loopCb = new CallBack(p_callbackFunc, p_callbackContext);
		}

		return {
			start:_start,
			update:_update,
			setFinishCallback:_setFinishCallback,
			setOnLoopCallback:_setOnLoopCallback
		};
	}

	var RotateTo = function (p_target, p_to, p_duration, p_easeType, p_repeat, p_repeatBackwards){
		var spriteTarget = p_target;
		var toRotate = p_to;
		var fromRotate = spriteTarget.getRotation();
		var startRotate = fromRotate;
		var timer = new TweenTimer(p_duration);
		var repeater = new TweenRepeater(p_repeat);
		var finishCb = null;
		var loopCb = null;

		var _start = function(p_delay = 0){
			fromRotate = spriteTarget.getRotation();
			startRotate = fromRotate;
			timer.start(p_delay);
		}

		var _update = function(p_dt){
			if(!timer.isRunning())
				return;
			var unitProgress = timer.update(p_dt);
			//apply the easings here
			var easeval = easingFunctions[p_easeType](unitProgress);

			var newRotate = fromRotate + (easeval * (toRotate - fromRotate));

			spriteTarget.rotate(newRotate);

			if(unitProgress == 1){
				if(repeater.shouldRepeat()){
					
					if(p_repeatBackwards){
						var tmp = toRotate;
						toRotate = fromRotate;
						fromRotate = tmp;
					}
					else{
						spriteTarget.rotate(startRotate);
					}
					if(loopCb != null)
						loopCb.trigger();
					timer.start();
				}
				else{
					if(finishCb != null)
						finishCb.trigger();
					_manager.cleanTween(this);
				}
			}
		}

		function _setFinishCallback(p_callbackFunc, p_callbackContext = null)
		{
			finishCb = new CallBack(p_callbackFunc, p_callbackContext);
		}

		function _setOnLoopCallback(p_callbackFunc, p_callbackContext = null)
		{
			loopCb = new CallBack(p_callbackFunc, p_callbackContext);
		}

		return {
			start:_start,
			update:_update,
			setFinishCallback:_setFinishCallback,
			setOnLoopCallback:_setOnLoopCallback
		};
	}

	var Delay = function (p_time){

		var timer = new TweenTimer(p_time);
		var finishCb = null;
		var loopCb = null;		

		var _start = function(p_delay = 0){
			timer.start(p_delay);
		}

		var _update = function(p_dt){
			if(!timer.isRunning())
				return;
			var unitProgress = timer.update(p_dt);
			if(unitProgress == 1){

				if(finishCb != null)
					finishCb.trigger();

				_manager.cleanTween(this);
			}
		}

		function _setFinishCallback(p_callbackFunc, p_callbackContext = null)
		{
			finishCb = new CallBack(p_callbackFunc, p_callbackContext);
		}

		function _setOnLoopCallback(p_callbackFunc, p_callbackContext = null)
		{
		}

		return {
			start:_start,
			update:_update,
			setFinishCallback:_setFinishCallback,
			setOnLoopCallback:_setOnLoopCallback
		};
	}

	var CallFunc = function(p_callBack, p_callbackContext = null){
		var callBack = new CallBack(p_callBack, p_callbackContext);
		var finishCb = null;
		var bIsStart = false;

		var _start = function(p_delay = 0){
			bIsStart = true;
		}

		var _update = function(p_dt){
			if(!bIsStart)
				return;
			callBack.trigger();
			if(finishCb != null)
				finishCb.trigger();
			_manager.cleanTween(this);
		}

		function _setFinishCallback(p_callbackFunc, p_callbackContext = null)
		{
			finishCb = new CallBack(p_callbackFunc, p_callbackContext);
		}

		function _setOnLoopCallback(p_callbackFunc, p_callbackContext = null)
		{
		}

		return {
			start:_start,
			update:_update,
			setFinishCallback:_setFinishCallback,
			setOnLoopCallback:_setOnLoopCallback
		};
	}


	var Sequence = function(_id, _class){
		var index = 0;
		var tweens = arguments;

    	var _startNextTween = function(){
    		_start();
    	}

    	var _start = function(p_delay = 0){

    		if(index < tweens.length){
    			var tween = tweens[index];
    			tween.start(p_delay);
    			tween.setFinishCallback(_startNextTween);
    			index++;
    		}
    	}

    	return { start:_start };
	}

	return {
		Sequence:Sequence,
		MoveTo:function (p_target, p_to, p_duration, p_easeType = 0, p_repeat = 0, p_repeatBackwards = false){
			var tween = new MoveTo(p_target, p_to, p_duration, p_easeType, p_repeat, p_repeatBackwards);
			_manager.addTween(tween);
			return tween;
		},
		ScaleTo:function (p_target, p_to, p_duration, p_easeType = 0, p_repeat = 0, p_repeatBackwards = false){
			var tween = new ScaleTo(p_target, p_to, p_duration, p_easeType, p_repeat, p_repeatBackwards);
			_manager.addTween(tween);
			return tween;
		},
		RotateTo:function (p_target, p_to, p_duration, p_easeType = 0, p_repeat = 0, p_repeatBackwards = false){
			var tween = new RotateTo(p_target, p_to, p_duration, p_easeType, p_repeat, p_repeatBackwards);
			_manager.addTween(tween);
			return tween;
		},
		Delay:function (p_time){
			var delay = new Delay(p_time);
			_manager.addTween(delay);
			return delay;
		},
		CallFunc:function(p_callbackFunc, p_callbackContext = null){
			var callfunc = new CallFunc(p_callbackFunc, p_callbackContext);
			_manager.addTween(callfunc);
			return callfunc;
		},
		Update:function(){
			_manager.update();
		},
		CleanTween:function(p_tween )
		{
			_manager.cleanTween(p_tween);
		}
	};
}

S6Tween = new S6Tween();
//---//
var S6Sprite = function(imgName, divName = 'scene'){
    
        var img;
        var pos = {x:-1000,y:-1000};
        var size = {w:0,h:0};
        var anchorpoint = {x:0,y:0};
        var scale = 1;
        var visible = true;
        var child = [];
        var posOffset = {x:0,y:0};
        var parent = undefined;
        var _rotation = 0;
    
        var __construct = function(imgName) {
            img = document.createElement("IMG");
            
            var src = Preloader.getCachedData( "image" ,imgName);
            if(  src != null )
            {
                img.src = src;
            }
            document.getElementById(divName).appendChild(img);
            child = [];
            this.parent = undefined;
            //setPosition(-1000,-1000);
            img.onload = function(){
                var scl = (img.clientHeight * worldScale * scale);
                img.style.height = scl + 'px';
                img.style.position = "absolute";
                size.w = img.clientWidth;
                size.h = img.clientHeight;
    
                var posx = (pos.x - (anchorpoint.x * size.w));
                var posy = (pos.y  - (anchorpoint.y * size.h));
                img.style.marginLeft = posx + 'px';
                img.style.marginTop = posy + 'px';
                img.style.visibility =  visible ? 'visible' : 'hidden';
            };

    
           }(imgName)

           function addChild(p_target ) {
                child.push(p_target);
                console.log("Child Added");
                p_target.parent = this;
                p_target.posOffset = {x:pos.x-p_target.position.x, y:pos.y-p_target.position.y};
                //console.log(p_target.parent);
               
           }
    
           function onclick(callback){
                img.addEventListener ("click", callback);
           }
    
           function setPercPosition(x,y){
                this.setPosition((x * winSize.w), (y * winSize.h));
           }
    
           function setPosition(x,y){
                setX(x);
                setY(y);
                
                if( this.parent != undefined )
                {
                    this.posOffset = {x:this.parent.position.x-pos.x, y:this.parent.position.y-pos.y};
                }
                for( var i = 0; i< child.length; i++ )
                {
                    child[i].setPosition( x - child[i].posOffset.x, y - child[i].posOffset.y );
                }
           }
    
           function setX(x){
                pos.x = x;
                var posx = (pos.x - (anchorpoint.x * size.w));
                img.style.marginLeft = posx + 'px';
           }
    
           function setY(y){
                pos.y = y;
                var posy = (pos.y  - (anchorpoint.y * size.h));
                img.style.marginTop = posy + 'px';
           }
    
           function setAnchorPoint(x,y){
                anchorpoint.x = x; 
                anchorpoint.y = y;
                img.style.transformOrigin = (x*100)+ '% ' + (y*100)+ '%' ;
               
           }
    
           function setScale(p_scale)
           {
                scale = p_scale;
                img.style.transform = "scale("+ p_scale +")";

            //    console.log( "before scale: " + scale);
            //     scale = p_scale;
            //     var scl = (img.clientHeight * worldScale * scale);
            //     //console.log( "after scale: " + img.clientHeight );

                

            //     img.style.height = scl + 'px';
        
            //     var posx = (pos.x - (anchorpoint.x * img.clientWidth));
            //     var posy = (pos.y  - (anchorpoint.y * img.clientHeight));
            //     img.style.marginLeft = posx + 'px';
            //     img.style.marginTop = posy + 'px';
            //     for( var i = 0; i< child.length; i++ )
            //     {
            //         child[i].setScale( child[i].scale * p_scale );
            //     }
           }
    
           function rotate(p_degrees)
           {
                _rotation = p_degrees;
              //  console.log('set rotation ' + Math.round(rotation) );
                img.style.transform = "rotate(" + p_degrees + "deg)";
                /*
                for( var i = 0; i < child.length; i++ )
                {
                    var tempAnchor = child[i].anchorpoint;
                    console.log("anchorpoint"+ (((pos.x - child[i].position.x)-child[i].anchorpoint.x)/ child[i].size.w) *100  );
                    child[i].setAnchorPoint( ((pos.x - child[i].position.x)-child[i].anchorpoint.x)/ child[i].img.style.height ,((pos.y - child[i].position.y)-child[i].anchorpoint.y)/ child[i].img.style.width )
                    child[i].rotate( p_degrees );
                    child[i].setAnchorPoint(tempAnchor.x, tempAnchor.y);
                }*/

           }
        var getRotation = function(){
            return _rotation;
        }
        var getScale = function(){
            return scale;
        }
        return {onclick:onclick,
                setPercPosition:setPercPosition,
                setPosition:setPosition,
                setAnchorPoint:setAnchorPoint,
                addChild:addChild,
                parent:parent,
                position:pos,
                posOffset:posOffset,
                anchorpoint:anchorpoint,
                setX:setX,
                setY:setY,
                size:size,
                set scale(s) { scale = s; },
                setScale:setScale,
                rotate:rotate,
                getRotation:getRotation,
                getScale:getScale,
                set visible(v){ visible = v; img.style.visibility =  v ? 'visible' : 'hidden'; }
                
        }
    }

var percPosition = function( p_x, p_y )
{
    return {x: (p_x * winSize.w) , y: (p_y * winSize.h) }
}
//---//
//---S6_Atlas---//

function S6Atlas(p_key, p_defaultFrame, p_div) 
{
	var img = undefined;

	var anchorpoint = {x: 0, y: 0};
	var position = {x: 0, y: 0};
	var scale = 1.0;
	var size = {width: 0, height: 0};
	var visible = true;

	var animations = {};
	var currentAnimation = undefined;

	var __construct = function() { 
		var key = p_key;
		var defaultFrame = p_defaultFrame || {x: 0, y: 0, w: 0, h: 0};
		p_div = p_div || 'scene';
		var div =  document.getElementById(p_div);

		img = document.createElement("div");

		img.style.backgroundImage = "url('" + Preloader.getCachedData("image", key) + "')";

		img.style.backgroundPosition = (-defaultFrame.x) + "px " + (-defaultFrame.y) + "px";

		img.style.overflow = "hidden";
		img.style.position = "absolute";

		size.width = defaultFrame.w;
		size.height = defaultFrame.h;
		
		img.style.width = size.width + "px";
		img.style.height = size.height + "px";

		img.style.marginLeft = (position.x - (anchorpoint.x * size.width)) + "px";
		img.style.marginTop = (position.y - (anchorpoint.x * size.height)) + "px";

		img.style.visibility = visible ? "visible" : "hidden";

		div.appendChild(img);
	}()

	function onClick(p_callback) {
        img.addEventListener("click", p_callback);
	}

	function update(p_deltaTime) {
		if(currentAnimation) {
			currentAnimation.counter += p_deltaTime;

			if(currentAnimation.counter >= currentAnimation.rate) {
				if(currentAnimation.index < currentAnimation.frameCount-1) {
					currentAnimation.index += 1;

					setFrame(currentAnimation.frames[currentAnimation.index]);

					currentAnimation.counter = 0;
				} else if(currentAnimation.loop) {
					currentAnimation.index = 0;

					setFrame(currentAnimation.frames[currentAnimation.index]);

					currentAnimation.counter = 0;
				}
			}
		}
	}

	function setAnchorPoint(p_x, p_y) {
		anchorpoint.x = p_x;
		anchorpoint.y = p_y;

		img.style.marginLeft = (position.x - (anchorpoint.x * size.width)) + "px";
		img.style.marginTop = (position.y - (anchorpoint.y * size.height)) + "px";
	}

	function setPercPosition(p_x, p_y) {
        setPosition ( p_x * winSize.w, p_y * winSize.h );
    }

    function setPercPosition(p_x,p_y) {
        setPosition ( p_x * winSize.w, p_y * winSize.h );
    }

	function setPosition(p_x, p_y) {
		position.x = p_x;
		position.y = p_y;

		img.style.marginLeft = (position.x - (anchorpoint.x * size.width)) + "px";
		img.style.marginTop = (position.y - (anchorpoint.y * size.height)) + "px";
	}

	function setScale(p_value) {
		scale = p_value;

		img.style.transform = "scale(" + scale + ")"; 
	}

	function setSize(p_width, p_height) {
		size.width = p_width;
		size.height = p_height;

		img.style.width = size.width + "px";
		img.style.height = size.height + "px";

		img.style.marginLeft = (position.x - (anchorpoint.x * size.width)) + "px";
		img.style.marginTop = (position.y - (anchorpoint.y * size.height)) + "px";
	}

	function setVisible(p_value) {
		visible = p_value;

		img.style.visibility = visible ? 'visible' : 'hidden'; 
	}

	function setX(p_x) {
		position.x = p_x;

		setPosition(position.x, position.y);
	}

	function setY(p_y) {
		position.y = p_y;

		setPosition(position.x, position.y);
	}

	function createAnimation(p_animationName, p_frames, p_loop, p_rate) {
		animations[p_animationName] = { 
			frames : p_frames, 
			loop : p_loop, rate : 
			p_rate 
		};
	}

	function playAnimation(p_animationName) {
		var animation = animations[p_animationName];

		currentAnimation = {
			frames : animation.frames,
			frameCount : animation.frames.length,
			loop : animation.loop,
			rate : animation.rate,
			index : 0,
			counter : 0,
		}

		setFrame(currentAnimation.frames[currentAnimation.index]);
	}

	function setFrame(p_frame) {
		img.style.backgroundPosition = (-p_frame.x) + "px " + (-p_frame.y) + "px";

		setSize(p_frame.w, p_frame.h);
	}

	var getScale = function(){
		return scale;
	}

	return {
		onClick: onClick,
		update : update,

		getScale:getScale,

		get anchorpoint() { return anchorpoint; },
		get position() { return position; },
		get scale() { return scale; },
		get size() { return size; },
		get visible() { return visible; },

        set scale(value) { setScale(value); },
        set visible(value) { setVisible(value); },

		setAnchorPoint : setAnchorPoint,
        setPercPosition : setPercPosition,
		setPosition : setPosition,
        setScale : setScale,
		setSize : setSize,
		setX : setX,
		setY : setY,
		setVisible : setVisible,

		createAnimation : createAnimation,
		playAnimation : playAnimation,
		setFrame : setFrame,
	}
}
//---//

var S6Choice = function()
{
    
        var img;
        var pos = {x:0,y:0};
        var returnPos = {x:0,y:0};
        var answerPos = {x:0, y:0};
        var size = {w:0,h:0};
        var scale = 1;
        var visible = true;
        var enableInput = false;

        var choiceLayer;
        var dialogBox;
        var dialogBoxImg;
        var dialogBoxText;

        var buttons = [];
        var buttonsImg = [];
        var buttonsText = [];

        var dialogText;
        var choiceText = [];
        var answerText;

        var pressCallback;
        var flipAfter;
        var bIsLeft;

        var pulse0;
        var pulse1;
    
        var init = function() {

            this.pulse0 = undefined;
            this.pulse1 = undefined;
            this.choiceLayer = document.getElementById("choiceBox");
            
            this.dialogBox = document.getElementById("dialogBox");
            this.dialogBoxText = document.getElementById("message");

            //this.dialogBoxImg = new S6Sprite( 'dialog_box', 'dialogBox' );
            this.dialogBoxImg = new S6Atlas( 'ui', frames.dialog , 'dialogBox' );
            // this.dialogBoxImg.setAnchorPoint(0.5, 0.0);
            this.dialogBoxImg.setPosition(-20,0);

            this.choiceText = []; 
            this.dialogText = "Dialog Text";
            this.answerText = "Default Answer";
            var tempString = "Answer 0";
            this.choiceText.push(tempString);
            tempString = "Answer 1";
            this.choiceText.push(tempString);

            this.buttons = [];
            var tempButton = document.getElementById("button0");
            this.buttons.push(tempButton);

            tempButton = document.getElementById("button1");
            this.buttons.push(tempButton);

            this.buttons[1].style.top = "212px";


            this.buttonsText = [];

            var tempButtonText = document.getElementById("text0");
            this.buttonsText.push(tempButtonText);

            tempButtonText = document.getElementById("text1");
            this.buttonsText.push(tempButtonText);


            var text = document.createTextNode("Text 0");
            this.buttonsText[0].appendChild(text);

            text = document.createTextNode("Text 1");
            this.buttonsText[1].appendChild(text);

            console.log( this.choiceText[0] );


            this.buttonsImg = [];
            var tempImg = new S6Atlas( 'ui',frames.choice , 'button0' );
            //var tempImg = new S6Sprite( 'choice', 'button0' );
            tempImg.setAnchorPoint(0.05, 0.5);
            tempImg.setPosition(0,46);
            this.buttonsImg.push( tempImg );

            tempImg = new S6Atlas( 'ui', frames.choice , 'button1' );
            //tempImg = new S6Sprite( 'choice', 'button1' );
            tempImg.setAnchorPoint(0.05, 0.5);
            tempImg.setPosition(0,46);
            this.buttonsImg.push( tempImg );

            // buttonLayer.style.cursor = 'pointer';
           
            this.buttons[0].onclick = function()
            {
                if( S6Choice.enableInput )
                {
                    S6Choice.answerText = S6Choice.choiceText[0];
                    S6Choice.showAnswer();
                    S6Choice.enableInput = false;
                    hideChoosingFinger();
                    if( S6Choice.flipAfter ) S6Choice.flipDialog(true);
                }
                
            }

            this.buttons[1].onclick = function()
            {
                if( S6Choice.enableInput )
                {
                    S6Choice.answerText = S6Choice.choiceText[1];
                    S6Choice.showAnswer();
                    S6Choice.enableInput = false;
                    hideChoosingFinger();
                    if( S6Choice.flipAfter ) S6Choice.flipDialog(true);
                }
            }

            this.setLeftSide( true );
            this.setAnswerPosition( 250, 400);
            this.setPosition( -1000, -1000);

    
        }

        function flipDialog( p_disregard = false )
        {  
            if( p_disregard )   bIsLeft = !bIsLeft;

            if ( bIsLeft )
            {
                this.dialogBox.style.transform = "scaleX(1)";
                this.dialogBoxText.style.transform = "scaleX(1)";
            }
            else{
                this.dialogBox.style.transform = "scaleX(-1)";
                this.dialogBoxText.style.transform = "scaleX(-1)";
            }

        }

        function enableButtonPress()
        {
            //this.enableInput = true;
            this.buttons[0].style.opacity = "1";
            this.buttons[1].style.opacity = "1";

        }



        function showAnswer()
        {
            //Hide Choice Layer

            while (this.dialogBoxText.firstChild) {
                this.dialogBoxText.removeChild( this.dialogBoxText.firstChild );
            }

            var text = document.createTextNode( this.answerText);
            this.dialogBoxText.appendChild(text);
            this.buttons[0].style.opacity = "0";
            this.buttons[1].style.opacity = "0";

            //this.enableInput = true;


            // var moveTween = S6Tween.MoveTo( S6Choice , {x:returnPos.x , y:returnPos.y} , 0.7, EaseType.QuadIn);
            // moveTween.setFinishCallback( exitAnswer );
            // moveTween.start(1.0);

            var seq = S6Tween.Sequence(
                S6Tween.Delay( 1.0 ),
                S6Tween.CallFunc(function(){
                    S6Choice.setPosition( -1000, -1000 );
                }),
                S6Tween.Delay( 0.7 ),
                S6Tween.CallFunc( exitAnswer )
            );
            seq.start();

            S6Tween.CleanTween( this.pulse0 );
            S6Tween.CleanTween( this.pulse1 );
            this.pulse0 = undefined;
            this.pulse1 = undefined;
        }

        function exitAnswer()
        {
            if( pressCallback != undefined )
            pressCallback()
        }

        function setDialogOnly( p_dialog )
        {
            //Set choices on variables
            //this.enableInput = true;
            
            this.dialogText = p_dialog;

            this.buttons[0].style.opacity = "0";
            this.buttons[1].style.opacity = "0";

            while (this.dialogBoxText.firstChild) {
                this.dialogBoxText.removeChild( this.dialogBoxText.firstChild );
            }
            var text = document.createTextNode( this.dialogText);
            this.dialogBoxText.appendChild(text);

        }

        function setChoices( p_dialog, p_choice0, p_choice1, p_flipAfter = false )
        {
            //Set choices on variables
            this.enableInput = false;
            this.flipAfter = p_flipAfter;
            
            this.dialogText = p_dialog;
            this.choiceText[0] = p_choice0;
            this.choiceText[1] = p_choice1;
            this.answerText = "Default Answer";

            this.buttons[0].style.opacity = "0";
            this.buttons[1].style.opacity = "0";
            this.buttonsImg[0].setScale( 1.0);
            this.buttonsImg[1].setScale( 1.0);

            while (this.dialogBoxText.firstChild) {
                this.dialogBoxText.removeChild( this.dialogBoxText.firstChild );
            }
            var text = document.createTextNode( this.dialogText);
            this.dialogBoxText.appendChild(text);

            //Remove previous text on buttons
            for( var i = 0 ; i < this.buttonsText.length ; i++) 
            {
                while (this.buttonsText[i].firstChild) {
                    this.buttonsText[i].removeChild( this.buttonsText[i].firstChild );
                }
            }
            //Show text on button
            for ( var i = 0 ; i < this.buttonsText.length ; i ++ )
            {
                text = document.createTextNode( this.choiceText[i] );
                this.buttonsText[i].appendChild(text);
            }

        }

        function startPulsating()
        {
            if( this.pulse0 == undefined )
            {
                //this.buttonsImg[0].scale = 1 ;
                this.buttonsImg[0].setScale( 1.0);
                //console.log( "scale "+ this.buttonsImg[0].getScale() );
                this.pulse0 = S6Tween.ScaleTo( this.buttonsImg[0] , 1.05 , 0.65, EaseType.ExpoIn, -1, true );
                this.pulse0.start(0.65);

                this.buttonsImg[1].setScale( 1.0);
                //console.log( "scale "+ this.buttonsImg[0].getScale() );
                this.pulse1 = S6Tween.ScaleTo( this.buttonsImg[1] , 1.05 , 0.65, EaseType.ExpoIn, -1, true );
                this.pulse1.start();
            }

        }

        function showChoices()
        {
            var seq = S6Tween.Sequence(
                S6Tween.Delay( 0.1 ),
                S6Tween.CallFunc(function(){
                    S6Choice.buttons[0].style.opacity = "1";
                }),
                S6Tween.Delay( 0.25 ),
                S6Tween.CallFunc(function(){
                    S6Choice.buttons[1].style.opacity = "1";
                })
            );
            seq.start();

        }

        function setLeftSide ( p_bIsLeft )
        {
            bIsLeft = p_bIsLeft;
            this.flipDialog();
            if( p_bIsLeft )
            {
                console.log( "left" );
                for( var i = 0 ; i < this.buttons.length ; i++ )
                {
                        this.buttons[i].style.left = "40px";
                        
                }
            }
            else
            {
                console.log( "right" );
                for( var i = 0 ; i < this.buttons.length ; i++ )
                {
                        this.buttons[i].style.left = "0px";
                }    
            }
        }

        function setAnswerPosition(p_x,p_y){
            answerPos.x = p_x;
            answerPos.y = p_y;
        }

        function setReturnPosition(p_x,p_y){
            returnPos.x = p_x;
            returnPos.y = p_y;
        }

        function setPosition(p_x,p_y){
            if( p_x.x != undefined )
            {
                setX(p_x.x);
                setY(p_x.y);
            }
            else{
                setX(p_x);
                setY(p_y);
            }
        }
    
        function setX(x){
            pos.x = x;
            S6Choice.choiceLayer.style.left = pos.x + 'px';
        }

        function setY(y){
            pos.y = y;
            S6Choice.choiceLayer.style.top = pos.y + 'px';
        }

        function setPressCallback(p_callback)
        {
            pressCallback = p_callback;
        }
    
        return {
                init:init,
                choiceText:choiceText,
                setChoices:setChoices,
                setDialogOnly:setDialogOnly,
                setLeftSide:setLeftSide,
                setPosition:setPosition,
                setAnswerPosition:setAnswerPosition,
                setReturnPosition:setReturnPosition,
                setPressCallback:setPressCallback,
                showChoices:showChoices,
                position:pos,
                showAnswer:showAnswer,
                setX:setX,
                setY:setY,
                size:size,
                enableInput:enableInput,
                enableButtonPress:enableButtonPress,
                flipAfter:flipAfter,
                dialogBox:dialogBox,
                dialogBoxText:dialogBoxText,
                flipDialog:flipDialog,
                startPulsating:startPulsating,
                set visible(v){ visible = v; img.style.visibility =  v ? 'visible' : 'hidden'; }
                
        }
};




//---//
var sceneTweens = [];

    var nextScene = function()
    {
        //Clears all tweens this scene
        //as long as they were added
        if( sceneTweens != undefined && sceneTweens.length > 0 )
        {
            for( var i = 0 ; i < sceneTweens.length; i++ )
            {
                S6Tween.CleanTween( sceneTweens[i] );
            }       
        }
        sceneTweens = [];
        console.log("complete");
        gameManager.gameState = 0;
        gameManager.setupScene();
    }
    
    scene01 = new S6Scene();
    
    scene01.InitializeScene = function( p_base )
    {
        //gameManager.AnimateGirl();
        S6Choice.setPosition( -1000 , 360/2 );
        S6Choice.setReturnPosition( -1000 , 360/2 );
        S6Choice.setPressCallback( nextScene );
        S6Choice.setChoices( "I'll love you forever...", "But I need to move on.", "I'll wait for you");
        S6Choice.setLeftSide(true);

        var seq = S6Tween.Sequence(
            S6Tween.Delay( 3.5 ),
            S6Tween.CallFunc(function(){
                S6Choice.setPosition( percPosition( 0.5, 0.25 ) );
            }),
            S6Tween.Delay( 0.250 ),
            S6Tween.CallFunc( ShowChoices )
        );
        seq.start();

        showChoosingFinger( percPosition( 0.5, 0.25 ) , 4.5 );


        //-- left arm
        var girlArmL = new S6Sprite('01_Girl_ArmL');
        girlArmL.setAnchorPoint(0.5,0.1);
        girlArmL.setPercPosition(0.39,0.41);
        girlArmL.rotate(25);


        var animLAnim1 = S6Tween.MoveTo(girlArmL , percPosition(0.39,0.42 ) , 1.5, EaseType.QuadIn );
        var animLAnim2 = S6Tween.RotateTo(girlArmL , 30 , 1.5, EaseType.QuadInOut);

        var seqLA = S6Tween.Sequence(
            S6Tween.Delay( 1.5 ),
            animLAnim1,
            S6Tween.Delay( 1 ),
            animLAnim2
        );
        seqLA.start();




        //-- body
        var girlBody = new S6Sprite('01_Girl_UpperBody');
        girlBody.setAnchorPoint(0.5,1.0);
        girlBody.setPercPosition(0.45,0.90);

        girlBody.addChild( girlArmL );

        
   
        

        //-- left forearm
        var forearmL = new S6Sprite('01_Girl_ForearmL_V2');
        forearmL.setAnchorPoint(0.1,0.9);
        forearmL.setPercPosition(0.32,0.73);
        forearmL.rotate(-30);
        girlBody.addChild( forearmL );


        var animLFAnim1 = S6Tween.MoveTo(forearmL , percPosition(0.32,0.73) , 1.5, EaseType.QuadIn );
        var animLFAnim2 = S6Tween.MoveTo(forearmL , percPosition(0.35,0.58) , 1.5, EaseType.QuadInOut );
        var animLFAnim2_5 = S6Tween.RotateTo(forearmL , -50 , 1.5, EaseType.QuadInOut);
        var animLFAnim3 = S6Tween.RotateTo(forearmL , -55 , 1.25, EaseType.QuadInOut, 1, true);

        animLFAnim2_5.start(4);

        var seqLFA = S6Tween.Sequence(
            S6Tween.Delay( 1.5 ),
            animLFAnim1,
            S6Tween.Delay( 1),
            animLFAnim2,
            animLFAnim3
        );
        seqLFA.start();



        //*-- boy body
        var patient = new S6Sprite('01_Guy');
        patient.setAnchorPoint(0.0,1.0);
        patient.setPercPosition(0,1.0);
        //*/

        //-- right arm
        var girlArmR = new S6Sprite('01_Girl_ArmR');
        girlArmR.setAnchorPoint(0.5,0.1);
        girlArmR.setPercPosition(0.54,0.4);
        girlArmR.rotate(15);
        girlBody.addChild( girlArmR );

        var animRAnim1 = S6Tween.RotateTo(girlArmR , 5 , 1.5, EaseType.QuadOut, -1 , true );
        sceneTweens.push( animRAnim1 );

        var animRAnim2 = S6Tween.MoveTo(girlArmR , percPosition( 0.53,0.4 ) , 1.5, EaseType.QuadIn );
        var animRAnim3 = S6Tween.RotateTo(girlArmR , 8 , 1.5, EaseType.QuadIn);
        animRAnim3.start(1.5);

        var seqRA = S6Tween.Sequence(
            S6Tween.Delay( 1.5 ),
            animRAnim2,
            animRAnim1
        );
        seqRA.start();

        //-- right hand
        var girlHandR = new S6Sprite('01_Girl_ForearmR');
        girlHandR.setAnchorPoint(0.5,0.1);
        girlHandR.setPercPosition(0.5,0.7);
        girlHandR.rotate(120);

        var rotate = S6Tween.RotateTo(girlHandR , 98 , 1, EaseType.QuadInOut);
        moveTween = S6Tween.MoveTo(girlHandR , percPosition( 0.525, 0.7 ) , 1.5, EaseType.QuadOut, -1 , true );
        girlBody.addChild( girlHandR );

        sceneTweens.push( moveTween );

        var seq = S6Tween.Sequence(
            S6Tween.Delay( 1.5 ),
            rotate,
            S6Tween.Delay( 0.5 ),
            moveTween
        );
        seq.start();

        rotate = S6Tween.RotateTo(girlBody , -3 , 1.5, EaseType.QuadIn);
        rotate.start(1.5);

        girlBody.setPercPosition(1.45,0.90);
        moveTween = S6Tween.MoveTo(girlBody , percPosition( 0.46, 0.90 ) , 1.0, EaseType.QuadOut );
        moveTween.start(0.1);
    
    
        worldBG.addChild(girlBody);
        worldBG.addChild(patient);
    };
    

    
    scene01.UpdateScene = function()
    {
    
    };


    scene02 = new S6Scene();
    var s2HandTween;
    scene02.InitializeScene = function( p_base )
    {
    
        S6Choice.setPosition( -1000 , 720*0.5 );
        S6Choice.setReturnPosition( -1000 , 720*0.5 );
        S6Choice.setPressCallback( nextScene );
        S6Choice.setChoices( "You have to let him go.", "I... I just can't.", "I understand", true );
        S6Choice.setLeftSide(true);

        var seq = S6Tween.Sequence(
            S6Tween.Delay( 3.0 ),
            S6Tween.CallFunc(function(){
                S6Choice.setPosition( percPosition( 0.35, 0.5 ) );
            }),
            S6Tween.Delay( 0.250 ),
            S6Tween.CallFunc( ShowChoices )
        );
        seq.start();

        showChoosingFinger( percPosition( 0.35, 0.5 ) , 4.2 );


        //

        var girlLowBody = new S6Sprite('02_Girl_LowerBody');
        girlLowBody.setAnchorPoint(0.5,0);
        girlLowBody.setPercPosition(0.65,0.78);

        var girlUpBody = new S6Sprite('02_Girl_Torso');
        girlUpBody.setAnchorPoint(0.5,0);
        girlUpBody.setPercPosition(0.65,0.11);
        

        var doctorBody = new S6Sprite('02_Doctor_Body');
        doctorBody.setAnchorPoint(0.4,0.6);
        doctorBody.setPercPosition(0.313,0.92);

        var doctorForearm = new S6Sprite('02_Doctor_ForearmL');
        doctorForearm.setAnchorPoint(0.25,0.1);
        doctorForearm.setPercPosition(0.16,0.875);

        doctorBody.addChild(doctorForearm);

        var girlForearm = new S6Sprite('02_Girl_ForearmL');
        girlForearm.setAnchorPoint(0.5,0.1);
        girlForearm.setPercPosition(0.56,0.76);
        girlForearm.rotate(195);

        girlLowBody.addChild( girlUpBody);
        girlUpBody.addChild( girlForearm);


        doctorBody.setPercPosition(-0.518, 0.92);
        moveTween = S6Tween.MoveTo( doctorBody , percPosition( 0.313, 0.92 ) , 1.0, EaseType.CubeOut );
        moveTween.start(0.1);

        var rotate = S6Tween.RotateTo(doctorBody , 2 , 1.0, EaseType.QuadIn);
        rotate.start(1.3);

        girlLowBody.setPercPosition(1.2,0.78);
        moveTween = S6Tween.MoveTo( girlLowBody , percPosition( 0.65, 0.78 ) , 1.0, EaseType.QuadOut );
        var cry = S6Tween.MoveTo( girlUpBody , percPosition( 0.65, 0.10 ) , 1.0, EaseType.BackInOut, -1, true  );
        sceneTweens.push(cry);

        var seq = S6Tween.Sequence(
            S6Tween.Delay( 0.1 ),
            moveTween,
            cry
        );
        seq.start();

        var rotateTween = S6Tween.RotateTo(doctorForearm , -70 , 1.0, EaseType.QuadInOut);
        rotateTween.start(1.3);

        // s2HandTween = S6Tween.RotateTo( girlForearm , 200 , 1.0, EaseType.QuadInOut, -1 , true  );
        // s2HandTween.start(2.0);



        worldBG.addChild(girlLowBody);
        worldBG.addChild(doctorBody);
    };
    
    scene02.UpdateScene = function()
    {
    
    };

    scene03 = new S6Scene();
    
    scene03.InitializeScene = function( p_base )
    {
    
        S6Choice.setPosition( -1000 , 720*0.5 );
        S6Choice.setReturnPosition( -1000 , 720*0.5 );
        //S6Choice.setPressCallback( nextScene );
        //S6Choice.setChoices( "I'll never forget you", "" , "" );
        S6Choice.setDialogOnly(  "I'll never forget you" );
        S6Choice.setLeftSide(true);

        // var moveTween = S6Tween.MoveTo(S6Choice , percPosition( 0.5, 0.5 ) , 1.0, EaseType.QuadIn);
        // moveTween.setFinishCallback(s3ExitDialog);
        // moveTween.start(2.0);

        var seq = S6Tween.Sequence(
            S6Tween.Delay( 3.0 ),
            S6Tween.CallFunc(function(){
                S6Choice.setPosition( percPosition( 0.5, 0.5 ) );
            }),
            S6Tween.Delay( 2.0 ),
            S6Tween.CallFunc( s3ExitDialog ),
            S6Tween.Delay( 0.70 ),
            S6Tween.CallFunc( nextScene )
        );
        seq.start();

        
        var girlHeadBack = new S6Sprite('03_Girl_HeadBack');
        girlHeadBack.setAnchorPoint(0.5,0.5);
        girlHeadBack.setPercPosition(0.335,0.26);
        girlHeadBack.rotate(5);

        var girlBody = new S6Sprite('03_Girl');
        girlBody.setAnchorPoint(0.5,0);
        girlBody.setPercPosition(0.35,0.05);


        var girlHead = new S6Sprite('03_Girl_Head');
        girlHead.setAnchorPoint(0.6,0.6);
        girlHead.setPercPosition(0.4,0.26);
        //girlHead.rotate(-10);

        var girlArm = new S6Sprite('03_Girl_Hand', 'foreground');
        girlArm.setAnchorPoint(0.8,0.9);
        girlArm.setPercPosition(0.44,0.73);

        girlBody.addChild(girlHead);
        girlBody.addChild(girlHeadBack);
        girlBody.addChild(girlArm);

        var rotateG = S6Tween.RotateTo(girlArm ,  -50 , 1.75, EaseType.SineOut);
        rotateG.start(1.7);

        

        var doctorBody = new S6Sprite('03_Doctor');
        doctorBody.setAnchorPoint(0.5,0);
        doctorBody.setPercPosition(0.75,0.0);

        var doctorHead = new S6Sprite('03_Doctor_Head');
        doctorHead.setAnchorPoint(0.7,0.7);
        doctorHead.setPercPosition(0.77,0.25);
        doctorBody.addChild( doctorHead );
        doctorHead.rotate(5);

        var rotate = S6Tween.RotateTo(doctorHead ,  -5 , 1.0, EaseType.QuadIn);
        rotate.start(1.6);

        var rotTween = S6Tween.RotateTo(girlHead , -10 , 0.50, EaseType.SineOut);
        rotTween.start(1.2);

        var rotTween = S6Tween.RotateTo(girlHeadBack , 0 , 0.50, EaseType.SineOut);
        rotTween.start(1.2);
        //moveTween.start(1.6);
        

        

        girlBody.setPercPosition(1.45,0.05);

        moveTween = S6Tween.MoveTo(girlBody , percPosition( 0.35, 0.05 ) , 1.50, EaseType.SineOut);
        var cry = S6Tween.MoveTo( girlBody , percPosition( 0.35, 0.07 ) , 1.0, EaseType.BounceInOut, -1, true  );
        sceneTweens.push(cry);

        var seq = S6Tween.Sequence(
            S6Tween.Delay( 0.1 ),
            moveTween,
            cry
        );
        seq.start();

        doctorBody.setPercPosition(1.75,0.0);
        moveTween = S6Tween.MoveTo(doctorBody , percPosition( 0.65, 0.0 ) , 1.50, EaseType.QuadOut);
        moveTween.start(1.0);


        // var deadBody = new S6Sprite('S3/03_Guy.png');
        // deadBody.setAnchorPoint(0,1);
        // deadBody.setPercPosition(0.0,1.0);

        worldBG.addChild(girlBody);
        worldBG.addChild(doctorBody);
        //worldBG.addChild(deadBody);




    };

    function s3ExitDialog()
    {
        S6Choice.setPosition( -1000, -1000 );
        // var moveTween = S6Tween.MoveTo(S6Choice , percPosition( -0.5, 0.5 ) , 1.0, EaseType.QuadIn);
        // moveTween.setFinishCallback( nextScene );
        // moveTween.start(2);
    }
    
    scene03.UpdateScene = function()
    {
    
    };

    scene04 = new S6Scene();
    
    scene04.InitializeScene = function( p_base )
    {
    
        S6Choice.setPosition( -1000 , 720*0.5 );
        S6Choice.setReturnPosition( -1000 , 720*0.5 );
        S6Choice.setPressCallback( nextScene );
        S6Choice.setChoices( "For me?!", "I need more time." , "I thought you'd never ask." );

        var moveTween = S6Tween.MoveTo(S6Choice , percPosition( -0.5, 0.5 ) , 2.0, EaseType.QuadIn);
        moveTween.setFinishCallback( s4Exit );
        moveTween.start(0.1);

        var layer = document.getElementById("layer");

        var text = document.createTextNode( "6 months later..." );
        layer.appendChild(text);




    };

    function s4Exit()
    {
        var layer = document.getElementById("layer");
        layer.removeChild( layer.lastChild );
        nextScene();
    }
    
    scene04.UpdateScene = function()
    {
        // var layer = document.getElementById("layer");
        // layer.style.opacity -= 0.05;
    };

    scene05 = new S6Scene();
    
    scene05.InitializeScene = function( p_base )
    {
        
    
        S6Choice.setPosition( -1000 , 720*0.5 );
        S6Choice.setReturnPosition( -1000 , 720*0.5 );
        S6Choice.setPressCallback( nextScene );
        S6Choice.setChoices( "For me?!", "I need more time." , "I thought you'd never ask." );

        // var moveTween = S6Tween.MoveTo(S6Choice , percPosition( 0.45, 0.5 ) , 1.0, EaseType.QuadIn);
        // moveTween.setFinishCallback( ShowChoices );
        // moveTween.start(1.50);

        //showChoosingFinger( percPosition( 0.45, 0.5 ) , 2.7 );

        var seq = S6Tween.Sequence(
            S6Tween.Delay( 2.5 ),
            S6Tween.CallFunc(function(){
                S6Choice.setPosition( percPosition( 0.45, 0.5 ) );
            }),
            S6Tween.Delay( 0.250 ),
            S6Tween.CallFunc( ShowChoices )
        );
        seq.start();

        showChoosingFinger( percPosition( 0.45, 0.5 ) , 3.25 );


        // var girlArm = new S6Sprite('S4/04_Girl_ArmR_V2.png');
        // girlArm.setAnchorPoint(0.3, 0.1);
        // girlArm.setPercPosition(0.4,0.47);

        // var girlLowerBody = new S6Sprite('S4/04_Girl_LowerBody_V2.png');
        // girlLowerBody.setAnchorPoint(0.6, 0.1);
        // girlLowerBody.setPercPosition(0.372,0.775);

        // var girlBody = new S6Sprite('S4/04_Girl_UpperBody_V2.png');
        // girlBody.setAnchorPoint(0.6, 0.9);
        // girlBody.setPercPosition(0.35,0.775);

        // girlBody.addChild(girlLowerBody);
        // girlBody.addChild(girlArm);


        var doctorLowerBody = new S6Sprite('04_Doctor_LowerBody');
        doctorLowerBody.setAnchorPoint(0.4, 0.2);
        doctorLowerBody.setPercPosition(0.675,0.9);

        var doctorArmL = new S6Sprite('04_Doctor_ArmL');
        doctorArmL.setAnchorPoint(0, 0);
        doctorArmL.setPercPosition(0.45,0.32);

        var doctorForearmL = new S6Sprite('04_Doctor_ForearmL');
        doctorForearmL.setAnchorPoint(0.5, 0.9);
        doctorForearmL.setPercPosition(0.475,0.38);
        doctorForearmL.rotate( 45 );

        var doctorBody = new S6Sprite('04_Doctor_UpperBody');
        doctorBody.setAnchorPoint(0.6, 0.85);
        doctorBody.setPercPosition(0.7,0.9);

        var doctorForearmR = new S6Sprite('04_Doctor_ForearmR');
        doctorForearmR.setAnchorPoint(0.9, 0.5);
        doctorForearmR.setPercPosition(0.82,0.75);
        doctorForearmR.rotate( -55 );


        doctorBody.addChild(doctorArmL);
        doctorBody.addChild(doctorForearmL);
        doctorBody.addChild(doctorLowerBody);
        doctorBody.addChild(doctorForearmR);

        var rotate = S6Tween.RotateTo(doctorForearmR , -10 , 0.6, EaseType.QuadIn );
        rotate.start(1.5);
        sceneTweens.push( rotate );

        var rotate = S6Tween.RotateTo(doctorForearmL ,  50 , 0.6, EaseType.QuadIn, -1 , true );
        rotate.start(1.1);
        sceneTweens.push( rotate );

        doctorBody.setPercPosition(1.8, 0.85);
        moveTween = S6Tween.MoveTo( doctorBody , percPosition( 0.7,0.9 ) , 1.0, EaseType.QuadOut);
        moveTween.start(0.1);

        worldBG.addChild( doctorBody );
        //worldBG.addChild( girlBody );

        gameManager.AnimateGirl();



    };
    
scene05.UpdateScene = function()
{

};

scene06 = new S6Scene();

scene06.InitializeScene = function( p_base )
{
    //new S6Atlas( 'ui', {"x":0, "y":119, "w":404, "h":84} , 'button0' );
    var apple = new S6Atlas( 'ui', frames.apple , 'ui' );
    apple.setAnchorPoint(0, 0);
    apple.setPercPosition(0.47,0.7);

    var google = new S6Atlas( 'ui',frames.google , 'ui' );
    google.setAnchorPoint(0, 0);
    google.setPercPosition(0.71,0.7);

    apple.onClick(function()
    {
        console.log("APPLE CLICKED");
        //OpenExternalLink( linkApple );
        
    });

    google.onClick( function()
    {
        console.log("GOOGLE CLICKED");
        //OpenExternalLink( linkPlaystore );
        
    });
}


var ShowChoices = function()
{
    S6Choice.showChoices();
}

var choosingFinger;
var fingerTween; 


var showChoosingFinger = function( p_pos , p_delay = 0 )
{
    if( choosingFinger == undefined )
    {
        choosingFinger = new S6Atlas( 'ui', frames.finger , 'ui' );
        choosingFinger.setPosition(-500, -500);
    }
    var offset = { x:p_pos.x + 400 , y: p_pos.y + 160 };
    
    fingerTween = S6Tween.MoveTo( choosingFinger , {x: offset.x, y: offset.y + 80} , 0.650, EaseType.SineIn, -1 ,true);
    fingerTween.setOnLoopCallback( function(){ S6Choice.enableInput = true; } );

    var seq = S6Tween.Sequence(
        S6Tween.Delay( p_delay ),
        S6Tween.CallFunc(function(){
            choosingFinger.setPosition( offset.x, offset.y );
            //
        }),
        S6Tween.CallFunc(function(){
            S6Choice.startPulsating();
        }),
        fingerTween
    );
    seq.start();
    
}

var hideChoosingFinger = function()
{
    if( fingerTween != undefined )
    {
        S6Tween.CleanTween( fingerTween );
    }
    choosingFinger.setPosition( -1000, -1000 );
}
//---//
//This is where our ad interactivity code will live.

var winSize;
var worldScale;
var loading;
var worldBG;

function dlog(msg){
	console.log(msg);
}

var gameManager;
$(document).ready( function()
{

	winSize = {w:document.getElementById('base').clientWidth, h: document.getElementById('base').clientHeight};
	worldScale = winSize.h / 720;
	loading = 0;

	var layer = document.getElementById("layer");
	
	var text = document.createTextNode( "Loading..." );
	layer.appendChild(text);

	
	console.log( Preloader );
	Preloader.loadResources();
	Preloader.setDoneCallback(() => {
		var layer = document.getElementById("layer");
		layer.removeChild( layer.lastChild );

		S6Choice = new S6Choice();
		S6Choice.init();

		gameManager = new MyGame();
		gameManager.init();
	} );

	//gameManager = new MyGame();
    //gameManager.init();

});



var MyGame = function()
{

	var gameScene = [];
	var gameState = 0;

	var time = 0;

	var lastUpdate = Date.now();

	var beginTween = false;
	var beginDelay = 1;
	var beginTimer = 0;

	var transitionTween;

	function init(){
		
		var xbtn = new S6Atlas('ui', frames.close, 'ui');
		xbtn.onClick(function(){
    		// exitAd()
		});
    	xbtn.setAnchorPoint(1,0);
        xbtn.setPercPosition(0.98,0.03);
        xbtn.setScale(3,3);
		
		gameScene = [];
		gameScene.push( scene01 );
		gameScene.push( scene02 );
		gameScene.push( scene03 );
		gameScene.push( scene04 );
		gameScene.push( scene05 );
		gameScene.push( scene06 );

    	update();
    	gameState = 0;
		setupScene();

		// moveTween = S6Tween.MoveTo(drag1, {x:720, y:720}, 2, EaseType.Linear, -1);
		// moveTween.setOnLoopCallback(sampleCallback);
		// moveTween.start(1.5);

		
	}

	function update(){
		requestAnimationFrame( update );

		S6Tween.Update();
		S6Overlay.update();

		if( gameScene[gameState-1] != undefined )
		gameScene[gameState-1].UpdateScene();


		
   		var now = Date.now();
		var dt = (now - lastUpdate)/1000;
		lastUpdate = now;

		time += dt;

		if(time >= 100){
			time -=100;
		}
	
	}

	function setupScene(){

		// var buttonLayer = document.getElementById("button0");
		// var t = document.createTextNode("Hello World");
		// //t.textIndent = "50px";
		// buttonLayer.appendChild(t);
		// // buttonLayer.style.cursor = 'pointer';
		// buttonLayer.onclick = function()
		// {
		// 	console.log("DIV BUTTON IS PRESSED");
		// }
		//t.style.left = "360px";
		// t.style.marginTop = "360px";

		// while (scene.firstChild) {
		//     scene.removeChild(scene.firstChild);
		// }

		if( worldBG == undefined )
		{
			worldBG = new S6Sprite( '01_BG', 'base' );
			worldBG.setPercPosition( -0.5 , 0.5 );
			worldBG.setAnchorPoint(0.0,0.5);
			var temp = new S6Sprite( '02_BG', 'base' );
			temp.setPercPosition( 0.5 , 0.50 );
			temp.setAnchorPoint(0.0,0.5);
			worldBG.addChild(temp);
			temp = new S6Sprite( '03_BG', 'base' );
			temp.setPercPosition( 1.5, 0.50 );
			temp.setAnchorPoint(0.0,0.5);
			worldBG.addChild(temp);

			var deadBody = new S6Sprite('03_guy', 'foreground');
			deadBody.setAnchorPoint(0,1);
			deadBody.setPercPosition(2.0,1.0);
			worldBG.addChild(deadBody);

			temp = new S6Sprite( '04_BG', 'base' );
			temp.setPercPosition( 3.5, 0.50 );
			temp.setAnchorPoint(0.0,0.5);
			worldBG.addChild(temp);

			//
			initGirl();
			//
			temp = new S6Sprite( 'endcard', 'base' );
			temp.setPercPosition( 4.5, 0.50 );
			temp.setAnchorPoint(0.0,0.5);
            worldBG.addChild(temp);
            
            //worldBG.setPercPosition( 0 , 0.5 );
			
		} 
		else{
			transitionTween = S6Tween.MoveTo(worldBG, {x: -(gameState+1)*1280 + (1280/2) , y:360}, 0.25, EaseType.QuadOut);
			transitionTween.setFinishCallback(completeTransition);
			transitionTween.start();
		}
		if (gameState == 0 )
		{
			gameScene[0].InitializeScene();
			gameState++;
		}
		

		


	}

	function completeTransition()
	{
		var scene = document.getElementById("scene");
		while (scene.firstChild) {
		    scene.removeChild(scene.firstChild);
		}

		console.log("REMOVED ALL PREV SCENE ASSETS");

		if( gameScene[gameState] != undefined )
		{
			gameScene[gameState].InitializeScene();
			gameState++;
			console.log(scene);
		}

		

	}

	function setGameScene(){

	}

	function setEndScene(){

	}

	function sampleCallback()
	{
		console.log("Finiiiiished!");
	}

	var girlArm;
	var girlLowerBody;
	var girlBody;
	var girlHead;

	function initGirl()
	{
		girlArm = new S6Sprite('04_Girl_ArmR','foreground');
		girlArm.setAnchorPoint(0.3, 0.1);
		girlArm.setPercPosition(0.4,0.47);

		girlLowerBody = new S6Sprite('04_Girl_LowerBody','foreground');
		girlLowerBody.setAnchorPoint(0.6, 0.1);
		girlLowerBody.setPercPosition(0.372,0.775);

		girlHeadBack = new S6Sprite('04_Girl_BackHair','foreground');
		girlHeadBack.setAnchorPoint(0, 0);
		girlHeadBack.setPercPosition(0.35,0.13);

		girlBody = new S6Sprite('04_Girl_UpperBody','foreground');
		girlBody.setAnchorPoint(0.6, 0.9);
		girlBody.setPercPosition(0.37,0.8);

		girlHead = new S6Sprite('04_Girl_Head','foreground');
		girlHead.setAnchorPoint(0.4, 0.6);
		girlHead.setPercPosition(0.32,0.27);
		girlHead.rotate(5);

		//girlBody.rotate(5);

		//*++++++++++++++++++++++++++
		girlHand = new S6Sprite('04_Girl_HandL','foreground');
		girlHand.setAnchorPoint(0.5, 0);
		girlHand.setPercPosition(0.39,0.53 );
		girlHand.rotate(150);
	
		girlArmL = new S6Sprite('04_Girl_ArmL','foreground');
		girlArmL.setAnchorPoint(0.9, 0.1);
		girlArmL.setPercPosition(0.287,0.42);
		girlArmL.rotate(-10);

		girlForeArmL = new S6Sprite('04_Girl_ForearmL','foreground');
		girlForeArmL.setAnchorPoint(0.5, 0.1);
		girlForeArmL.setPercPosition(0.293,0.72);
		girlForeArmL.rotate(220);


		girlForeArmL.addChild(girlHand);
		girlArmL.addChild(girlForeArmL);
		girlBody.addChild(girlArmL);
		//--------------------------*/

		girlBody.addChild(girlArm);
		girlBody.addChild(girlHead);
		girlHead.addChild(girlHeadBack);
		worldBG.addChild(girlBody);
		worldBG.addChild(girlLowerBody);
		
		girlBody.setPercPosition(4.37,0.8);
		girlLowerBody.setPercPosition(4.372,0.775);
	}

	function AnimateGirl()
	{

		var delay = 1.7;
		var animTime = 0.25;
		var ease =  EaseType.SineInOut;

		var moveTween = S6Tween.MoveTo( girlHead , percPosition( 0.28, 0.28 ) , animTime, ease);
		moveTween.start(delay);

		var moveTween = S6Tween.MoveTo( girlArm , percPosition( 0.39, 0.47) , animTime, ease);
		moveTween.start(delay);

		var rotateTweenA = S6Tween.RotateTo( girlHead ,  10 , animTime , ease );
        rotateTweenA.start(delay);
		sceneTweens.push( rotateTweenA );
		
		var rotateTweenB = S6Tween.RotateTo( girlBody ,  -10 , animTime , ease );
        rotateTweenB.start(delay);
        sceneTweens.push( rotateTweenB );

        //*+++++++++++++++++++++++++++++++++++++++++++++

         S6Tween.MoveTo( girlArmL , percPosition( 0.24,0.47 ) , animTime, ease).start(delay);
         S6Tween.RotateTo( girlArmL ,  -50 , animTime , ease ).start(delay);

         S6Tween.MoveTo( girlForeArmL , percPosition( 0.35,0.7 ) , animTime, ease).start(delay);
         S6Tween.RotateTo( girlForeArmL ,  175 , animTime , ease ).start(delay);


         S6Tween.MoveTo( girlHand , percPosition( 0.32,0.43 ) , animTime, ease).start(delay);
         S6Tween.RotateTo( girlHand ,  220 , animTime , ease ).start(delay);

        //---------------------------------------------*/
		
		//head moves to 0.265,0.27
		//head rotates 5
		//body rotates -5

		//girlBody.rotate(-5);

	}
				
	function exitAd(){
		// alert("exit ad");
		// //ExitApi.exit();
		// gameState = 0;
		//setupScene();
		/*
		  var overlay = document.getElementById("overlay");
		  overlay.style.zIndex = 10;
		*/
		S6Overlay.fadeIn();
	}

	return {
		init:init,
		setupScene:setupScene,
		AnimateGirl:AnimateGirl
	};
}




/*
function animateUp( $element , duration , complete )
{
	$element.css({
		top:-200,
		opacity:0
	})

	$element.animate({
		top:0,
		opacity:1
	} , {
		duration : duration,
		complete : complete
	})
}
*/
//---//