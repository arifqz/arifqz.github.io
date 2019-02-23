//	Inicializamos el array playfilm_scripts para determinar si el Playfilm cargado es el primero
if (typeof playfilm_scripts === "undefined") {
    var playfilm_scripts = [];
};

var playfilm_isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

// ObtenciÃ³n de los parÃ¡metros en url
function parseQuery(query){ 
    var Params=new Object(); 

    if (!query) return Params; // return empty object 
    var Pairs = query.split(/[;&]/); 
    
    for (var i=0;i<Pairs.length;i++){ 
        var KeyVal = Pairs[i].split('='); 

        if (!KeyVal || KeyVal.length!=2) continue; 
    
        var key = unescape( KeyVal[0] ); 
        var val = unescape( KeyVal[1] ); 
    
        val = val.replace(/\+/g, ' '); 
        Params[key] = val; 
    };
    return Params; 
};

var scripts = document.getElementsByTagName('script'); 
var myScript;
for (var i=0; i<scripts.length; i++) {
	var str = scripts[i].src;

	if (playfilm_isIE11) {
		if (str.indexOf("playfilm_embed") != -1 && str.indexOf("playfilm_linked") == -1) {
			myScript = scripts[i];
			break;
		}
	}
	else {
		if (str.includes('playfilm_embed') && !str.includes('playfilm_linked')) {
			myScript = scripts[i];
			break;
		};
	};
};
var queryString = myScript.src.replace(/^[^\?]+\??/,''); 
var script_params = parseQuery( queryString ); 

var playfilm_embed = {
	/*	VARIABLES	*/
    adserver: "",
    analytics: "2",
    analytics_id: "UA-134822972-1",
    google_tag_manager_id: "",
    google_analytics_player_ua: "UA-53395256-2",
	autoplay: false,
	cdn_url: "https://d1qr95rey7gro4.cloudfront.net/",
	cdn_query_string: "?seq=10",
    compatibility_check: true,
    comscore_analytics_loaded: false,
    cover_animation: "1",    
    cover_int: "",
    cti_button_text: "",
    description: "",
	embed_type: 1, // (0: inline; 1: popup)
	close_at_end: false,
	close_at_end_div: "",
	has_cti_cover_resource: "True",
	height: 720,
	ident: "bca051db-5b0e-41a2-ab74-95686455b1c6",	//project.id,
    image_cover: "True",
    image_cover_name: "https://s3-eu-west-1.amazonaws.com/storage-playfilm-public/media/3/team/113/resources/Dyson_Multiscreen_Tiled.mp4_poster_S1REkx8.jpg?seq=10",
    image_cover_mobile: "",
    image_cover_name_mobile: "?seq=10",
    image_cti_name: "https://d1qr95rey7gro4.cloudfront.net/media/3/published/bca051db-5b0e-41a2-ab74-95686455b1c6/image_cti.svg?seq=10",
    image_cti_name_mobile: "?seq=10",
    iphone_autoplay: true,          
	isIphone: false,
	isMobile: false,
	isPopup: false,
    last_modified: "Feb. 20, 2019, 10 p.m.",
    main_div: "",
	mainFilesToLoad: [],
	media_before_path: "",
	media_cdn_url: "https://d1qr95rey7gro4.cloudfront.net/media/3/published/bca051db-5b0e-41a2-ab74-95686455b1c6/",
	monitor: "",
    name: "Dyson_Multivideo_Feb6",
    new_load: false,
	num: -1,
	pf_content: "",
    pf_player: undefined,
	pf_popup: "",
	photo_blend: false,
    photo_blend_resource: "False",
	photo_blend_server: '',
    playfilm_first: true,
    rel_ini: 0,
    resume: true,
	script_params: script_params,
	secFilesToLoad: [],
	server_url: "https://app.playfilm.tv",
	azure_func_url: "https://pfservicesPublic.azurewebsites.net/api/",
    shake_interaction: "False",
    subtitles_resource: "False",
	target_device: 0,
    userDevice: undefined,
    version: "Project v5",
    video_cover: "False",
    video_cover_name: "?seq=10",
    video_cover_mobile: "",
    video_cover_name_mobile: "?seq=10",   
    vpaid: "", 
	width: 1280,
    webgl_resource: "False",
	webgl_video: false,
	thumbnail: "",
	thumbnailWidth: "100%",
	thumbnailHeight: "100%",
	keepEmbedContent: false,
	checkWebview: false,
	launched: false,

	/*	FUNCIONES	*/
	initPlayfilm: function () {
		this.launched = true;
		var ua = navigator.userAgent;

        if (ua.match(/iPhone/i)) {
            this.isIphone = true;
        }

		if (this.script_params['autoplay'] == "true")
			this.autoplay = true;

		if (this.script_params['embed_type'] == "0") 
			this.embed_type = 0;

		if (this.script_params['close_at_end'] == "true") {
			this.close_at_end = true;
			this.close_at_end_div = this.script_params['close_at_end_div'];
		};

        if (this.script_params['resume'] == "false")
            this.resume = false;

        if (this.script_params['vpaid'])
        	this.vpaid = this.script_params['vpaid'];

        if (this.script_params['compatibility_check'])
        	this.compatibility_check = this.script_params['compatibility_check'] == "false" ? false : true;


        if (this.script_params['thumbnail']){
        	this.thumbnail = this.script_params['thumbnail'];
        };

        if (this.script_params['thumbnail_width']){
        	this.thumbnailWidth = this.script_params['thumbnail_width'];
        };

        if (this.script_params['thumbnail_height']){
        	this.thumbnailHeight = this.script_params['thumbnail_height'];
        };

        if (this.script_params['keep_embed_content'] == "true" ){
        	this.keepEmbedContent = true;
        };

        if (this.script_params['check_webview'] == "true" ){
        	this.checkWebview = true;
        };

		if (this.analytics == 1 && !this.p_analytics_loaded) {
			this.p_analytics_loaded = true;
			playfilm_initializeAnalytics (1);
		}
		else if (this.analytics == 3 && !this.comscore_analytics_loaded) {
			this.comscore_analytics_loaded = true;
			playfilm_initializeAnalytics (3);
		};

		if (jQuery ('.playfilm_content').length > 1 && this.isiPhone || this.script_params['iphone_autoplay'] == "false")
			this.iphone_autoplay = false;

		

		if (this.isMobile) {
			var browser = (function(){
			    var ua= navigator.userAgent, tem, 
			    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
			    if(/trident/i.test(M[1])){
			        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
			        return 'IE '+(tem[1] || '');
			    }
			    if(M[1]=== 'Chrome'){
			        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
			        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
			    }
			    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
			    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
			    return M.join(' ');
			})();

			var browser_data = browser.split(" ");

			if (this.isiPhone && this.webgl_resource != "False") {
				this.num = 999;
				this.autoplay = false;
			};

			if (browser_data[0] == "Chrome" && Number(browser_data[1] > 54)) {
				console.log ('is chrome plus 54')
			}
			else {
				this.isPopup = true;
			};

			if (this.isiPhone || this.isPopup || this.num != 1) {
				this.initPopupEmbed ();
			}
			else {
				this.initInlineEmbed ();
			};
		}	
		else {
			if (this.embed_type == 0) {
				this.initInlineEmbed ();
			}
			else if (this.embed_type == 1) {
				this.autoplay = true;
				this.initPopupEmbed ();
			};
		};
	},

	//	INLINE	//
	initInlineEmbed: function () {
		var padding_b = this.height * 100 / this.width;

		//	Si hay load new url, cambiamos la id de la capa principal y la vacÃ­amos
		if (this.pf_content != "") {
			this.new_load = true;
			this.pf_content.innerHTML = "";
			this.pf_content.setAttribute("id", "playfilm_content_" + this.ident);
		}
		else {
			this.new_load = false;
			this.pf_content = document.getElementById("playfilm_content_" + this.ident);
		};

        if (this.num == 0) {
        	if (!this.keepEmbedContent && this.thumbnail == ""){
        		this.pf_content.setAttribute("style", "position: relative; width: 100%; padding-bottom: " + padding_b + "%; background-color: #000; background-repeat: no-repeat; background-position: center center; background-size: cover;  background-image: url('" + this.media_cdn_url + "poster.jpg');")
			};

        	this.pf_content.setAttribute("style", "position: relative; width: 100%; padding-bottom: " + padding_b + "%; background-color: #000; background-repeat: no-repeat; background-position: center center; background-size: cover;  background-image: url('" + this.media_cdn_url + "poster.jpg');")
			this.initJsEmbed ();        	
        }
        else {
	        this.pf_content.setAttribute("style", "position: relative; width: 100%; padding-bottom: " + padding_b + "%; background-color: #000;");
	        //this.pf_player.setUrlParams(this.script_params);

	        var params = "";
	        if (this.script_params){
                for (var key in script_params) {
                    if (key!="autoplay") {
                        params += "&" + key + "=" + script_params[key];
                    // dict[key] = script_params[key];
                    }
                };
            };          

			var html_pf = '<iframe id="playfilm_iframe_' + this.ident + '" frameborder="0" allowfullscreen scrolling="no" width="100%" height="100%" style="position: absolute; top: 0; left: 0; width: 1px; min-width: 100%; *width: 100%;" src="' + this.media_cdn_url + 'index.html?autoplay=' + this.autoplay
			 + params +'"></iframe>';

			this.pf_content.innerHTML = html_pf;			
        };
	},

	//	POPUP
	initPopupEmbed: function () {
		var elem = this;
		var new_load = false;

		//	THUMBNAIL
		if (this.pf_content != "") {
			this.new_load = true;
			this.pf_content.innerHTML = "";
			this.pf_content.setAttribute("id", "playfilm_content_" + this.ident);
		}
		else {
			this.new_load = false;
			this.pf_content = document.getElementById("playfilm_content_" + this.ident);
			this.pf_content.setAttribute("style", "position: relative; cursor: pointer;");
		};

		var ima_cover;
		var ima_cti;
        var vid_cover;

		if (this.target_device == 3) {
			ima_cover = this.image_cover_name_mobile;
			ima_cti = this.image_cti_name_mobile;
			vid_cover = this.video_cover_name_mobile;
		}
		else {
			ima_cover = this.image_cover_name;
			ima_cti = this.image_cti_name;
			vid_cover = this.video_cover_name;
		};

		if (!this.keepEmbedContent){
			var padding_b = this.height * 100 / this.width;
			var padding_bottom = this.video_cover == "True" ? padding_b + "%" : "0";
			var html_pf = "";

			if (this.thumbnail != ""){
				html_pf = '<div id="playfilm_thumbnail_' + this.ident + '" style="cursor:pointer; position: relative; width: '+this.thumbnailWidth+'; height: '+this.thumbnailHeight+'; overflow: hidden;">';
			
					html_pf += '<div>';
						html_pf += '<img src="' + this.thumbnail + '" style="position: relative; width: 100%; height: auto; display: block;" />';
					html_pf += '</div>';
					html_pf += '<div id="playfilm_cti_' + this.ident + '" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: none;">';
					html_pf += '</div>';
					
					this.pf_content.setAttribute("style", "position: relative; width:"+this.thumbnailWidth+"; height:"+this.thumbnailHeight+"; background-color: transparent;");
			}
			else {
				html_pf = '<div id="playfilm_thumbnail_' + this.ident + '" style="position: relative; width: 100%; height: auto; overflow: hidden; padding-bottom: ' + padding_bottom + '">';
					if (this.image_cover == "True") {
						html_pf += '<div style="animation: fadeInOut 10s infinite; -webkit-animation: fadeInOut 10s infinite;">';
							html_pf += '<img src="' + ima_cover + '" style="position: relative; width: 100%; height: auto; display: block;" />';
						html_pf += '</div>';
					};

		            if (this.video_cover == "True") {
		            	/*if (this.isiPhone) {
							html_pf += '<div style="animation: fadeInOut 10s infinite; -webkit-animation: fadeInOut 10s infinite;">';
								html_pf += '<img src="' + this.media_cdn_url + 'poster.jpg" style="position: relative; width: 100%; height: auto; display: block;" />';
							html_pf += '</div>';
		            	}
		            	else {*/
			                html_pf += '<video id="player_videocustom_cover" crossorigin="" src="'+vid_cover+'" loop autoplay muted playsinline style="position: absolute; top: 0; left: 0; object-fit: cover; width: 100%; height: 100%;"></video>';
		            	//};
		            };

		            var has_cti = false;

		            //if (this.cti_text != "") has_cti = true;
		            

		            

		            if (this.cti_button_text != "") has_cti = true;

					html_pf += '<div id="playfilm_cti_' + this.ident + '" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: none;';
						 if (has_cti) html_pf += ' background-color: rgba(0,0,0,0.1);';
					html_pf += '"></div>';

		            if (has_cti) {
                    	html_pf += '<div id="playfilm_cover_cti_text" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; align-content: center; color: #FFF;text-shadow: 1px 1px rgba(0,0,0,0.6); font-family: Arial, sans-serif; pointer-events: none; letter-spacing: 1px; z-index: 100000; text-align: center; padding: 0px; white-space: pre;">';
						
							

							

							if (this.cti_button_text != "") {
	                            html_pf += '<div class="playfilm_cti_button_text" style="position: relative; font-size: 1.5vw; background-color: #FFF; color: #313131; padding: 2vw 3.1vw; height: auto; line-height: 100%; margin-top: 4vw; text-shadow: none; font-weight: bold;">' + this.cti_button_text + '</div>';
							};

						html_pf += '</div>';
		            };
			};
			
			html_pf += '</div>';

	        if (this.cover_animation == "1") {
	            html_pf += '<style type="text/css">';
	                html_pf += '@keyframes fadeInOut {';
	                    html_pf += '0% { transform: scale(1.0); }';
	                    html_pf += '50% { transform: scale(1.1); }';
	                    html_pf += '100% { transform: scale(1.0); }';
	                html_pf += '}';
	            html_pf += '</style>';
	        };

			this.pf_content.innerHTML = html_pf;
		};	// not keepEmbedContent

		//	POPUP
		if (this.new_load) {
			this.pf_popup.innerHTML = "";
		}
		else {
			if (document.getElementById("playfilm_popup_" + this.ident) == null) {
				this.pf_popup = document.createElement("div");
				this.pf_popup.setAttribute("style", "position: fixed; top: 0; left: -99999999px; width: 100%; height: 100%; background-color: rgba(0,0,0,0.8); display: none; z-index: 99999999998;");
				document.getElementsByTagName('body')[0].appendChild(this.pf_popup);
			}
			else {
				this.pf_popup = document.getElementById("playfilm_popup_" + this.ident);
			};
		};
	
		this.pf_popup.id = "playfilm_popup_" + this.ident;

		if (this.num == 0) {
			this.initPopupJS ();
		};

		if (this.num != 0 || !this.isMobile) {
			jQuery ('#playfilm_cti_' + this.ident)
				.stop ()
				.fadeTo (500, 1);
		};

		this.resizeCover ();

		jQuery (window)
			.resize (function () {
				elem.resizeCover ();
			});

		if (this.isiPhone && this.iphone_autoplay)
			this.showPopup ();

		//	EVENTOS
		if (!this.new_load) {
			if (this.isMobile) {
				var but_content = document.getElementById("playfilm_content_" + this.ident);
				but_content.addEventListener("touchstart", function () {
					jQuery ('#playfilm_popup_' + elem.ident).css('z-index', '99999999999');
					if (elem.num == 0) {
						if (elem.playfilm_first) {
							var video_player = document.getElementById('player_video');
							video_player.play ();
						}
						else if (!elem.isiPhone) {
							elem.pf_player.call_player_showFloating ();
						};
					};
					elem.showPopup ();
				});
			}
			else {
				jQuery ('#playfilm_content_' + this.ident)
					.bind ('click', function () {
						jQuery ('#playfilm_popup_' + elem.ident).css('z-index', '99999999999');
						elem.showPopup ();
					});
			};
		};
	},
	initPopupJS: function () {
		var elem = this;
		var padding_b = this.height * 100 / this.width;

		if (this.isMobile) {
			var video_int = setInterval (function () {
				if (jQuery ('#player_video').length > 0) {
					clearInterval (video_int);
					
					jQuery ('#playfilm_cti_' + elem.ident)
						.stop ()
						.fadeTo (500, 1);
				};
			}, 100);
		};

		//	POPUP
		var html_popup = '<div id="playfilm_bg_' + this.ident + '" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">';
		html_popup += '</div>';
		html_popup += '<div id="playfilm_iframe_' + this.ident + '" style="position: absolute;">';
			html_popup += '<div id="playfilm_iframe_content_' + this.ident + '" style="position: relative; padding-bottom: ' + padding_b + '%">';
			html_popup += '</div>';
		html_popup += '</div>';
		html_popup += '<div id="playfilm_close_' + this.ident + '" style="position: absolute; width: 24px; height: 24px; top: 24px; right: 24px; cursor: pointer;">';
			html_popup += '<img src="' + this.media_cdn_url + 'img/x_close_popup.svg" style="position: relative; display: block; width: 100%; height: 100%;" />';
		html_popup += '</div>';

		this.pf_popup.innerHTML = html_popup;
		this.initJsEmbed ();
	},
    showPopup: function () {
        var elem = this;
        var padding_b = this.height * 100 / this.width;
        var params = "";
        if (this.script_params){
            for (var key in this.script_params) {
                if (key != "autoplay") {
                    params += "&" + key + "=" + this.script_params[key];
                }
            };
        };

		if (this.num != 0) {
			//	POPUP
			var html_popup = '<div id="playfilm_bg_' + this.ident + '" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">';
			html_popup += '</div>';
			html_popup += '<div id="playfilm_iframe_' + this.ident + '" style="position: absolute;">';
				html_popup += '<div id="playfilm_iframe_content_' + this.ident + '" style="position: relative; padding-bottom: ' + padding_b + '%">';
					html_popup += '<iframe id="playfilm_iframe_embebbed_' + this.ident + '" frameborder="0" allowfullscreen scrolling="no" width="100%" height="100%" style="position: absolute; top: 0; left: 0; width: 1px; min-width: 100%; *width: 100%;" src="' + this.media_cdn_url + 'index.html?autoplay=' + this.autoplay + '&from_embed=true' + params +'"></iframe>';
				html_popup += '</div>';
			html_popup += '</div>';
			html_popup += '<div id="playfilm_close_' + this.ident + '" style="position: absolute; width: 24px; height: 24px; top: 24px; right: 24px; cursor: pointer;">';
				html_popup += '<img src="' + this.media_cdn_url + 'img/x_close_popup.svg" style="position: relative; display: block; width: 100%; height: 100%;" />';
			html_popup += '</div>';

			this.pf_popup.innerHTML = html_popup;
		};

		if (this.num == 0 && !this.new_load) {
			playfilm_player[this.ident].call_player_resizeBlock();
		};

		//	EVENTOS
		jQuery ('#playfilm_popup_' + this.ident)
			.css ({
				left: 0
			});

		if (this.isiPhone && this.iphone_autoplay) {
			jQuery ('#playfilm_popup_' + this.ident)
				.css ({
					opacity: 0
				})
				.show ();

			this.monitor = setInterval (function () {
			    var activeElem = document.activeElement;

			    if (activeElem && activeElem.id == 'playfilm_iframe_embebbed_' + elem.ident) {
			        clearInterval(elem.monitor);
					elem.iphone_autoplay = false;
					elem.resizeWindow ();		        
			    }
			}, 100);
		}
		else {
			jQuery ('#playfilm_popup_' + this.ident)
				.stop ()
				.fadeTo (500, 1);
		};

		this.resizeWindow ();

		if (this.num == 0 && !this.new_load) {
			if (this.playfilm_first) {
				this.playfilm_first = false;

				if (this.isMobile) {
					setTimeout (function () {
						elem.pf_player.call_video_cover_play(true);				
					}, 1000);
				};
			}
			else {
				elem.pf_player.setPlayAfterFloating (true);
			};
		};	

		if (this.isMobile) {
			var but_bg = document.getElementById("playfilm_bg_" + this.ident);
			var but_close = document.getElementById("playfilm_close_" + this.ident);

			// remove this option for unwanted clicks problem
			// but_bg.addEventListener("touchstart", function () {
			// 	elem.hidePopup ();
			// });

			but_close.addEventListener("touchstart", function () {
				elem.hidePopup ();
			});
		}
		else {
			jQuery ('#playfilm_bg_' + this.ident)
				.bind ('click', function () {
					elem.hidePopup ();
				});

			jQuery ('#playfilm_close_' + this.ident)
				.bind ('click', function () {
					elem.hidePopup ();
				});
		};

		if (this.isMobile) {
			if (this.isiPhone) {
				jQuery (document)
					.scroll (function () {
						elem.resizeWindow ();
					});
			};

            jQuery (window).on ("orientationchange", function(event) {      //  Only mobile
				setTimeout(function () {
					console.log ('resize wwww');
					elem.resizeWindow ();
				},500);       
            });
		}
		else {
			if (this.num==0){
				jQuery ('#playfilm_iframe_' + this.ident)
					.resize (function () {
						setTimeout(function () {
							elem.resizeWindow ();
						},500);       
					});
			}
			else {
				jQuery (window)
					.resize (function () {
						setTimeout(function () {
							console.log ('resize wwindoooooow');
							elem.resizeWindow ();
						},500);       
					});
			};
		};
	},
	hidePopup: function () {
		var elem = this;

		jQuery ('#playfilm_popup_' + this.ident)
			.fadeTo (500, 0, function () {
				jQuery (this)
					.css ({
						left: -99999999
					})
					.hide ();

				if (elem.num == 0) {
					elem.pf_player.call_player_pauseVideo (false);
				}
				else {
					elem.pf_popup.innerHTML = '';
				};

				if (elem.isiPhone && jQuery ('.playfilm_content').length < 2) {
					elem.iphone_autoplay = true;
					elem.showPopup ();
				};
			});
		jQuery ('#playfilm_popup_' + this.ident).css('z-index', 99999999998);
	},
	//	JS
	initJsEmbed: function () {
		var elem = this;

		if (!this.isiPhone && (this.isMobile || this.embed_type == 0)) {
			this.main_div = this.pf_content;
		}
		else {
			this.main_div = document.getElementById("playfilm_iframe_content_" + this.ident);
		};

	    if (this.webgl_resource != "False") {
	       this.webgl_video = true;
	    };

	    if (this.photo_blend_resource != "False") {
	       this.photo_blend = true;
	       this.photo_blend_server = "None";
	    };

        //  ANALYTICS
        if (this.analytics == "2"){
        	if (this.analytics_id != "") {
	            ga('create', this.analytics_id, 'auto', 'usertracker');
	            ga('usertracker.send', 'pageview', this.name);
        	}
        	else if (this.google_tag_manager_id != "") {
        		(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        		new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        		j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        		'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        		})(window,document,'script','dataLayer', elem.google_tag_manager_id);
        	};
        };

        //	Cargamos CSS
        this.loadjscssfile(this.media_cdn_url + "css/tooltipster.css" + this.cdn_query_string, "css");
        this.loadjscssfile(this.media_cdn_url + "css/playfilm_player.css" + this.cdn_query_string, "css");

        if (this.new_load && this.embed_type == 1 && (!this.isMobile || this.isiPhone)) {
        	this.showPopup ();
        };

        //	Cargamos load.js
        jQuery.getScript(elem.media_cdn_url + "js/load.js" + elem.cdn_query_string, function () {
            elem.pf_player = pf_new_object (elem.ident);
            elem.loadFiles ();
            elem.playfilm_render ();
        });        
	},
	loadFiles: function () {
        var elem = this;

        this.mainFilesToLoad.push (this.media_cdn_url + "js/jquery-ui.min.js" + this.cdn_query_string);
		this.secFilesToLoad.push (this.media_cdn_url + "js/jquery.ui.touch-punch.min.js" + this.cdn_query_string);
		this.secFilesToLoad.push (this.media_cdn_url + "js/dash/dash.all.min.js" + this.cdn_query_string);
		this.secFilesToLoad.push (this.media_cdn_url + "js/jquery.tooltipster.min.js" + this.cdn_query_string);

        if (this.webgl_resource != "False") {
            this.mainFilesToLoad.push (this.media_cdn_url + "js/webgl/three.min.js" + this.cdn_query_string);
            this.secFilesToLoad.push (this.media_cdn_url + "js/webgl/fulltilt.js" + this.cdn_query_string);
            this.secFilesToLoad.push (this.media_cdn_url + "js/webgl/common.js" + this.cdn_query_string);
            this.secFilesToLoad.push (this.media_cdn_url + "js/webgl/DeviceOrientationControls.js" + this.cdn_query_string);
            this.secFilesToLoad.push (this.media_cdn_url + "js/webgl/StereoEffect.js" + this.cdn_query_string);
            this.secFilesToLoad.push (this.media_cdn_url + "js/webgl/video_360.js" + this.cdn_query_string);
        };
    
        if (this.photo_blend_resource != "False") {
            this.secFilesToLoad.push (this.media_cdn_url + "js/snap.svg-min.js" + this.cdn_query_string);
        };

        if (this.subtitles_resource != "False") {
            this.secFilesToLoad.push (this.media_cdn_url + "js/subtitles.parser.min.js" + this.cdn_query_string);
        };

        if (this.adserver != "" && this.adserver != "0") {
            components = [
                'VideoStats'
            ];

            document.write('<script src="'+ (window.API_URL || 'https://s1.adform.net/banners/scripts/rmb/Adform.DHTML.js?bv='+ Math.random()) +'"><\/script>');
        };

        if (this.shake_interaction != "False") {
            this.secFilesToLoad.push (this.media_cdn_url + "js/shake.js/shake.js" + this.cdn_query_string);
        };

        jQuery.getMultiScripts(this.mainFilesToLoad).done (function () {
	        jQuery.getMultiScripts(elem.secFilesToLoad).done (function () {
            	elem.initializeObject ();	
            });
        });
	},
	loadjscssfile: function (filename, filetype) {
        if (filetype == "js") { //if filename is a external JavaScript file
            var fileref = document.createElement('script');
            fileref.type = 'text/javascript';
            fileref.src = filename;
        }
        else if (filetype == "css") { //if filename is an external CSS file
            var fileref=document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
        };

        if (typeof fileref != "undefined") {
            document.getElementsByTagName("head")[0].appendChild(fileref);
        };
	},
    playfilm_render: function () {
        var elem = this;
        var html_pf = '';

        var ima_cover = this.image_cover_name;
        var vid_cover = this.video_cover_name;
        var ima_cti = this.image_cti_name;
        var ima_cover_mob = this.image_cover_name_mobile;
        var vid_cover_mob = this.video_cover_name_mobile;
        var ima_cti_mob = this.image_cti_name_mobile;

        html_pf += '<div id="playfilm_jsembed_' + this.ident + '" itemprop="video" itemscope itemtype="http://schema.org/VideoObject" class="playfilm_jsembed" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: 9999999999999; background-color: transparent;" class="overfl_hidden">';

            html_pf += '<meta itemprop="name" content="' + this.name + '" />';
            html_pf += '<meta itemprop="description" content="' + this.description + '" />';
            html_pf += '<meta itemprop="thumbnailURL" content="' + this.media_cdn_url + 'poster.jpg"' + this.cdn_query_string + '" />';
            html_pf += '<meta itemprop="embedURL" content="' + this.media_cdn_url + 'index.html"'  + this.cdn_query_string + '"/>';
            html_pf += '<meta itemprop="uploadDate" content="' + this.last_modified + '" />';
            html_pf += '<meta itemprop="width" content="' + this.width + '" />';
            html_pf += '<meta itemprop="height" content="' + this.height + '" />';

		    if (this.photo_blend_resource != "False") {
                html_pf += '<div id="facebook_iframe"> </div>';
            };

            html_pf += '<div id="player_preload">';
                html_pf += '<div id="player_preload_circular">';
                    html_pf += '<div class="player_preload_text">Loading project settings...</div>';
                    html_pf += '<div class="player_preload_circular"></div>';
                html_pf += '</div>';
                html_pf += '<div id="player_preload_second">';
                    html_pf += '<div id="player_preload_second_custom" class="player_preload_second_content"></div>';
                    html_pf += '<div id="player_preload_second_sprite" class="player_preload_second_content"></div>';       
                html_pf += '</div>';
            html_pf += '</div>';

            html_pf += '<div id="player_Block1">';
            html_pf += '</div>';

	        if (this.num != 0 || this.embed_type == 0 ||Â (this.isMobile && !this.isIphone)) {
	            html_pf += '<div id="custom_cover" style="z-index:99000;width:100%;height:100%;top:0px;left:50%;position:absolute;background-color:transparent;cursor:pointer;overflow:hidden; opacity: 0;">';
		            html_pf += '<div id="custom_cover_desktop_multi">';
		                if (this.image_cover == "True") {
		                    html_pf += '<div id="image_custom_cover" style="position: absolute; animation: fadeInOut 10s infinite; -webkit-animation: fadeInOut 10s infinite;">';
		                        html_pf += '<img style="position: relative; width: 100%; height: 100%; display: block;" src="'+ima_cover+'" />';
		                    html_pf += '</div>';
		                };

		                html_pf += '<div id="video_custom_cover" class="player_video_player player_video_player_mobile" >';
		                    if (this.video_cover == "True") {
		                        html_pf += '<video id="player_videocustom_cover" crossorigin="" src="'+vid_cover+'" loop autoplay muted playsinline style="object-fit: cover; width: 100%; height: 100%;"></video>';
		                    };

		                    html_pf += '<div id="player_spinner_cti" style="display:block;position:absolute;width:40px;height:40px;z-index:10000;top:50%;left:50%;margin-top:-20px;margin-left:-20px">';
		                    	html_pf += '<svg class="circle-bg" width="40" height="40" version="1.1" xmlns="http://www.w3.org/2000/svg">';
		                    		html_pf += '<circle cx="20" cy="20" r="15">';
		                    	html_pf += '</svg>';
		                    	html_pf += '<svg class="circle-loader" width="40" height="40" version="1.1" xmlns="http://www.w3.org/2000/svg">';
		                    		html_pf += '<circle cx="20" cy="20" r="15">';
		                    	html_pf += '</svg>';
		                    html_pf += '</div>';
		                    html_pf += '<div id="playfilm_image_cti_action" style="z-index:99001; top:0px;left:0px;position:absolute;width:100%;height:100%;background-image:url(\''+ima_cti+ '\');background-size:contain;background-repeat:no-repeat; display: none;" onclick="playfilm_player[\''+this.ident+'\'].call_video_cover_play(true);"></div>';
		                html_pf += '</div>';
		            html_pf += '</div>';

	            if (this.target_device == 3) {
	                html_pf += '<div id="custom_cover_mobile">';
	                if (this.image_cover_mobile == "True" ){
	                     html_pf += '<div id="image_custom_cover_mobile" style="position: absolute; animation: fadeInOut 10s infinite; -webkit-animation: fadeInOut 10s infinite;">';
	                        html_pf += '<img style="position: relative; width: 100%; height: 100%; display: block;" src="'+ima_cover_mob+'" />';
	                    html_pf += '</div>';
	                };
	                html_pf += '<div id="video_custom_cover_mobile" class="player_video_player player_video_player_mobile" >';
		                if (this.video_cover_mobile == "True") {
                            html_pf += '<video id="player_videocustom_cover_mobile" crossorigin="" src="'+vid_cover_mob+'" loop autoplay muted playsinline style="object-fit: cover; width: 100%; height: 100%;"></video>';
                        };
	                        html_pf += '<div id="playfilm_image_cti_action_mobile" style="z-index:99001; top:0px;left:0px;position:absolute;width:100%;height:100%;background-image:url(\''+ima_cti_mob+'\');background-size:contain;background-repeat:no-repeat; display: none;" onclick="playfilm_player[\''+this.ident+'\'].call_video_cover_play(true);"></div>';
	                    html_pf += '</div>';
	                html_pf += '</div>';
	            };
            };
            
            html_pf += '</div>';

            if (this.cover_animation == "1") {
                html_pf += '<style type="text/css">';
                    html_pf += '@keyframes fadeInOut {';
                        html_pf += '0% { transform: scale(1.0); }';
                        html_pf += '50% { transform: scale(1.1); }';
                        html_pf += '100% { transform: scale(1.0); }';
                    html_pf += '}';
                html_pf += '</style>';
            };
        html_pf += '</div>';

        this.main_div.innerHTML = html_pf;

        var playfilm_project_version = this.version;
        playfilm_project_version = playfilm_project_version.replace ("Project v", "");
        playfilm_project_version = parseInt (playfilm_project_version);

        if (this.num != 0 || this.embed_type == 0 ||Â (this.isMobile && !this.isIphone)) {
	        if (!this.isMobile && (this.autoplay || playfilm_project_version <= 3)) {
	            jQuery ('#custom_cover')
	                .remove ();
                this.pf_player.setIn_autoplay_muted(true);
	            this.pf_player.call_video_cover_play(true);
	        }
	        else {
	            this.cover_int = setInterval (function () {
                	var cover_layer = elem.isMobile ? jQuery ('#custom_cover') : jQuery ('#custom_cover_mobile');

	                if (jQuery ('#custom_cover').width () != 0) {
	                    clearInterval (elem.cover_int);

	                    if (elem.isMobile) {
	                        elem.rel_ini = jQuery ('#image_custom_cover_mobile').width () / jQuery ('#image_custom_cover_mobile').height ();
	                    }
	                    else {
		                    elem.rel_ini = jQuery ('#image_custom_cover').width () / jQuery ('#image_custom_cover').height ();
	                    };

	                    elem.resizeCover ();

	                    jQuery (window)
	                        .resize (function () {
	                            elem.resizeCover ();
	                        });
	                };
	            }, 100);
	        };
        };
    },
    initializeObject: function () {
        var arr = [this.photo_blend, this.ident, this.media_before_path, this.server_url, this.webgl_video,
        this.photo_blend_server, this.media_cdn_url, this.cdn_url, this.compatibility_check, this.name,
        this.embed_type, this.cdn_query_string, this.azure_func_url, this.close_at_end];
        this.pf_player.initializeConstants (arr, false, this.num);
        this.pf_player.setUrlParams(this.script_params);
        this.userDevice = this.pf_player.getUserDevice ();
        this.pf_player.call_video_cover_play (false);

        if (this.new_load && !this.isMobile) {
            this.pf_player.call_video_cover_play(true);
        };
    },
    resizeCover: function () {
    	console.log ('resizeCover');
    	var elem = this;
    	
        var p_w = this.width;
        var p_h = this.height;
        var p_rel = p_w / p_h;
        var w_w = jQuery ('#playfilm_content_' + this.ident).width ();
        var w_h = jQuery ('#playfilm_content_' + this.ident).height ();
        var w_rel = w_w / w_h;
        var w, h;

        console.log (w_w);
        console.log (jQuery ('#playfilm_content_' + this.ident));

        if (w_w != undefined &&Â w_w > 0) {
	        if (w_rel >= p_rel) {
	            h = w_h;
	            w = h * p_rel;
	        }
	        else {
	            w = w_w;
	            h = w / p_rel;
	        };

	        if (this.embed_type == 0 ||Â (this.isMobile && !this.isIphone)) {
		        jQuery ('#custom_cover')
		            .width (w)
		            .height (h)
		            .css ({
		                marginLeft: -w/2,
		                opacity: 1
		            });

		        var c_w, c_h;
		        var rel = w / h;

		        if (rel <= p_rel) {
		            c_h = h;
		            c_w = h * p_rel;
		        }
		        else {
		            c_w = w;
		            c_h = w / p_rel;
		        };

		        jQuery ('#image_custom_cover')
		            .width (c_w)
		            .height (c_h)
		            .css ({
		                left: (w - c_w) / 2,
		                top: (h - c_h) / 2
		            });

		        jQuery ('#image_custom_cover_mobile')
		            .width (c_w)
		            .height (c_h)
		            .css ({
		                left: (w - c_w) / 2,
		                top: (h - c_h) / 2
		            });
	        };

	        var cover_width = jQuery ('#playfilm_content_' + this.ident).find ('#playfilm_cover_cti_text').width ();
	        var cti_title_font = Math.round(cover_width * 0.04);
	        var cti_title_margin = Math.round(cover_width * 0.023);
	        var cti_text_font = Math.round(cover_width * 0.023);
	        var cti_button_font = Math.round(cover_width * 0.015);
	        var cti_button_margin = Math.round(cover_width * 0.04);
	        var cti_button_paddingv = Math.round(cover_width * 0.02);
	        var cti_button_paddingh = Math.round(cover_width * 0.031);

	        jQuery ('#playfilm_content_' + this.ident)
	        	.find ('.playfilm_cti_title')
		        	.css ({
		        		fontSize: cti_title_font,
		        		marginBottom: cti_title_margin
		        	})
		        .end ()
		        .find ('.playfilm_cti_text')
	        		.css ({
	        			fontSize: cti_text_font
	        		})
	        	.end ()
	        	.find ('.playfilm_cti_button_text')
		        	.css ({
		        		fontSize: cti_button_font,
		        		marginTop: cti_button_margin,
		        		paddingTop: cti_button_paddingv,
		        		paddingBottom: cti_button_paddingv,
		        		paddingLeft: cti_button_paddingh,
		        		paddingRight: cti_button_paddingh
		        	});

	        if (this.target_device == 3) {
	            if (this.isMobile) {
	                jQuery ('#custom_cover_desktop_multi').hide();
	            }
	            else {
	                jQuery ('#custom_cover_mobile').hide();
	            };
	        }
	        else {
	            jQuery ('#custom_cover_mobile').hide();
	        }
        }
        else {
        	console.log ("timeout");

        	setTimeout (function () {
        		console.log ("timeout done");
        		elem.resizeCover ();
        	}, 500);
        };
    },
	resizeWindow: function () {
        var this_res = this;

        if (this.isiPhone && this.iphone_autoplay) {
        	var thumbnailDiv = this.keepEmbedContent ? jQuery ('#playfilm_content_' + this.ident) : jQuery ('#playfilm_thumbnail_' + this.ident);
        	var p_w = thumbnailDiv.width ();
        	var p_h = p_w * this.height / this.width;
        	var p_x = thumbnailDiv.offset().left;
        	var p_y = thumbnailDiv.offset().top - jQuery(document).scrollTop();

        	jQuery ('#playfilm_bg_' + this.ident)
        		.hide ();

        	jQuery ('#playfilm_close_' + this.ident)
        		.hide ();

        	jQuery ('#playfilm_popup_' + this.ident)
	            .width (p_w)
	            .height (p_h)
	            .css ({
	                left: p_x,
	                top: p_y
	            });

        	jQuery ('#playfilm_iframe_' + this.ident)
        		.css ({
        			width: "100%",
        			height: "100%"
        		})
        }
        else {
	        var anchoStage = jQuery (window).width ();
	        var altoStage = this_res.isMobile ? window.innerHeight : jQuery (window).height ();
	        var rel = anchoStage / altoStage;
	        var p_rel = this_res.width / this_res.height;
	        var p_w, p_h, p_x, p_y;
	        var close_x, close_y;

	        var bodyHeight = document.body.offsetHeight;
	        var windowHeight = window.innerHeight;
	        var isLandscape = Math.abs(window.orientation) === 90;
	        var navBarsGap = 0;

	        console.log ("isLandscape");
	        console.log (isLandscape);
	        console.log (Math.abs(window.orientation));
	        console.log (this_res.isMobile);

	        jQuery ('#playfilm_popup_' + this.ident)
	        	.css ({
	        		top: 0,
	        		left: 0,
	        		width: "100%",
	        		height: "100%",
	        		opacity: 1,
	        		zIndex: 99999999999
	        	});

        	jQuery ('#playfilm_bg_' + this.ident)
        		.show ();

        	jQuery ('#playfilm_close_' + this.ident)
        		.show ();

        	jQuery ('#playfilm_content_' + this.ident)
        		.css ({
        			opacity: 1
        		});

	        if (rel >= p_rel) {
	            if (this_res.isMobile) {
	                p_h = altoStage;
	            }
	            else {
	                p_h = altoStage * 0.8;
	            };

	            p_w = p_h * p_rel;
	        }
	        else {
	            if (this_res.isMobile) {
	                p_w = anchoStage;
	            }
	            else {
	                p_w = anchoStage * 0.8;
	            };

	            p_h = p_w / p_rel;
	        };

        	if (isLandscape && this_res.isMobile) {
                jQuery ('#playfilm_close_' + this_res.ident)
                    .hide ();
            }
            else if (this_res.isMobile) {
                jQuery ('#playfilm_close_' + this_res.ident)
                    .show ();
            };

	        if (p_w > this_res.width) {
	            p_w = this_res.width;
	            p_h = this_res.height;
	        };

	        p_x = Math.ceil (anchoStage / 2 - p_w / 2);
	        p_y = Math.ceil (altoStage / 2 - p_h / 2);

	        if (navBarsGap > 0){
	            console.log("NAVBARS GLAP " + navBarsGap);
	            if (altoStage > 320){
	            	p_y += navBarsGap;
	            }

	        }

	        jQuery ('#playfilm_iframe_' + this_res.ident)
	            .width (p_w)
	            .height (p_h)
	            .css ({
	                left: p_x,
	                top: p_y
	            });

	        if (this_res.num == 0) {
	            this_res.resizeCover ();
	        };
        };
	},
    playfilm_load_new_url: function (url) {
        var elem = this;
        var arr = url.split ("/");

        elem.cdn_url = arr[0] + '//' + arr[2] + '/';
        elem.media_cdn_url = url;
        var project_id = arr[arr.length-2];
        var urlJSON;

        elem.media_cdn_url = elem.media_cdn_url.replace ("/index.html", "/");

        switch (this.userDevice) {
            case"Desktop":
                urlJSON = this.media_cdn_url + 'project_desktop.json' + this.cdn_query_string;
                break;

            case"Android":
                /*urlJSON = this.media_cdn_url + 'project_mobile_browser_android.json';
                break;*/

            case"iPad":
                /*urlJSON = this.media_cdn_url + 'project_mobile_browser_ipad.json';
                break;*/

            case"iPhone":
                urlJSON = this.media_cdn_url + 'project_mobile.json' + this.cdn_query_string;
                break;
        };

        //playfilm_scripts[playfilm_current_script].playfilm_thumbnail ();

        jQuery.ajax({
            dataType: "json",
            url: urlJSON,
            success: function(data) {
                elem.width = data.width;
                elem.height = data.height;
                elem.script_rel = data.height / data.width;
                elem.name = data.name;
                elem.description = data.description;
                elem.last_modified = data.last_updated;
                elem.analytics = data.pro_parameters.analytics.toString ();
                elem.analytics_id = data.pro_parameters.analytics_id.toString ();
                elem.ident = project_id;

                
                	elem.p_analytics_id = data.piwik_id.toString ();
                
                elem.autoplay = this.isMobile ? false : true;

                elem.webgl_resource = data.webgl_resource == true ? "True" : "False";
                elem.photo_blend_resource = data.photo_blend_resource == true ? "True" : "False";
                elem.subtitles_resource = data.subtitles_resource == true ? "True" : "False";
                elem.adserver = data.pro_parameters.adserver.toString ();
                elem.shake_interaction = data.shake_interaction == true ? "True" : "False";

                elem.image_cover = data.image_cover;
                elem.image_cover_name = data.image_cover_name;
                elem.video_cover = data.video_cover;
                elem.video_cover_name = data.video_cover_name;
                elem.image_cti_name = data.image_cti_name;
                elem.image_cti_name_mobile = data.image_cti_name_mobile;
                elem.image_cover_mobile = data.image_cover_mobile;
                elem.image_cover_name_mobile = data.image_name_cover_mobile;
                elem.video_cover_mobile = data.video_cover_mobile;
                elem.video_cover_name_mobile = data.video_cover_name_mobile;

                elem.initPlayfilm ();
            },
            error: function() {
                console.log ('error');
            }
        });
    },
    pf_closeInteractiveVideo: function (project_id) {
		if (this.close_at_end_div != "") {
			var divToRemove = jQuery ('#' + this.close_at_end_div);

			console.log (divToRemove);
			
			divToRemove
				.remove ();
		}
		else {
		    jQuery('#playfilm_content_'+project_id).remove();
		};
    }
};


playfilm_embed.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
playfilm_embed.isiPhone = /iPhone/i.test(navigator.userAgent);

var num = playfilm_scripts.length;
playfilm_embed.num = num;

if (script_params["close_at_end"] == "true") {
	num = 0;
	playfilm_embed.num = 0;
	playfilm_scripts[0] = playfilm_embed;
}
else {
    console.log("inside close at end");
    playfilm_embed.num = num + 1;
	playfilm_scripts.push (playfilm_embed);
};


//	Si es el primer Playfilm de la pÃ¡gina cargamos el embed javascript
if (num == 0) {
	//  ANALYTICS
	var _paq;

	

	

	//	FACEBOOK IFRAME (REVISAR SI TIENE QUE SALIR SIEMPRE)
    function playfilm_on_load_iframe(iframe) {
        try {
            jQuery ('#player_preload').hide();
            playfilm_iFrame = iframe;
        } catch (e) {
          // This can happen if the src of the iframe is
          // on another domain
          console.log('iFrame Facebook exception: ' + e);
        }
     };

    //  Google Fonts
    WebFontConfig = {
        google: { families: [ 'Raleway::latin', 'Fira Sans:regular,bold' ] }
    };

    (function() {
        var wf = document.createElement('script');
        wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        wf.type = 'text/javascript';
        wf.async = 'true';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(wf, s);
    })();

    //  QoE
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', this.google_analytics_player_ua, 'auto', 'qoetracker');
    ga('qoetracker.send', 'pageview', 'Dyson_Multivideo_Feb6');

	if (!window.jQuery) {
	   var script = document.createElement('script');
	   script.type = "text/javascript";
	   script.src = "https://code.jquery.com/jquery-latest.min.js";
	   document.getElementsByTagName('head')[0].appendChild(script);

	   	var get_jquery = setInterval(function () {
	   		console.log ('interval');

	   		if (window.jQuery) {
	   			clearInterval (get_jquery);

	   			pf_jQueryLoaded ()
	   		};
	   	}, 200);
	}
	else {
		pf_jQueryLoaded ();
	};
}
else if (window.jQuery){
	for (var i=1; i<playfilm_scripts.length; i++) {
		if (!playfilm_scripts[i].launched) playfilm_scripts[i].initPlayfilm ();
	};
};

function pf_jQueryLoaded () {
	setMultiScripts ();

	for (var i=0; i<playfilm_scripts.length; i++) {
		playfilm_scripts[i].initPlayfilm ();
	};
};

function pf_new_object (id) {
    var pf_player = playfilm_new_object (id);

    return (pf_player);
};

function pf_closeInteractiveVideo (project_id) {
	if (script_params['close_at_end_div'] != "") {
		var divToRemove = jQuery ('#' + script_params['close_at_end']);
		
		divToRemove
			.remove ();
	}
	else {
	    jQuery('#playfilm_content_'+project_id).remove();
	};
};

function playfilm_initializeAnalytics (num) {
	if (num == 3) {
        var varSegmentation = 0;
        var varClickTracking = 1;
        var varCustomerTracking = 1;
        var varAutoFirePV = 1;
        var Route = "UA-134822972-1";
        var Ctrl = "";
        document.write("<script type='text/javascript' src='" + (window.location.protocol) + "//c.microsoft.com/ms.js'" + "'><\/script>");
	};
};

function setMultiScripts () {
	jQuery.getMultiScripts = function(arr, path) {
	    var _arr = jQuery.map(arr, function(scr) {
	        return jQuery.getScript( (path||"") + scr );
	    });

	    _arr.push(jQuery.Deferred(function( deferred ){
	        jQuery( deferred.resolve );
	    }));

	    return jQuery.when.apply(jQuery, _arr);
	};
};