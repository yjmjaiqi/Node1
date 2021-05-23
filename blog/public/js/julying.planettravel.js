/**
 * jQuery planet Travel (Julying) Plug-in v1.0
 *
 * Home : http://julying.com/lab/gridmenu/
 * Mail : i@julying.com
 * created : 2012-00-10 18:30:26
 * last update : 2012-10-22 14:30:00
 * QQ 锛� 316970111 
 * Address : China shenzhen
 *
 * Copyright 2012 | julying.com
 * MIT銆丟PL2銆丟NU.
 * http://julying.com/code/license
 *
 ***************************
 */
 ;(function($){
	/*椋炶鍔ㄧ敾锛屽厛鎱㈠悗蹇�*/
	$.extend( jQuery.easing ,{
		starFly: function (x, t, b, c, d) {
			return c*(t/=d)*t*t*t + b;
		}
	});
	
	$.fn.planetTravel = function( option ){
		var $obj = $(this);
		var opts = $.extend({},$.fn.planetTravel.defaults,option);		
		var viewSize ,maxWidth ,maxHeight  ;			
		checkSize();
		
		$obj.addClass( opts.bgCss[ rand(0,opts.bgCss.length - 1 )] );
		/*缁� window 缁戝畾缂╂斁銆佹粴鍔ㄤ簨浠�*/
		$(window).bind('resize.julying scroll.julying',function(e){
           checkSize(); 
        });
		flash();
		fly() ;
		setInterval(function(){
			fly();
		}, opts.flyMakeStarTime );
		return this ;
		
		function checkSize(){
			viewSize = getViewSize();
			maxWidth = viewSize[0];
			maxHeight = viewSize[1];
		};	
		
		function flash(){
			var docHeight = getViewSize()[1];
			var scale , imageIndex , html = '' , widh  , height , leftArea , imageIndex ;
			var starsArea = maxWidth * 0.2 * 2 *  docHeight ;
			var starsNum = starsArea / ( 100 * 100 ) * opts.flashStarDensity ;
			
			var imagesNum = opts.flashStarImage.length ;
			for(var i=0 ; i < starsNum ; i++){
				imageIndex = rand(0 , imagesNum -1) ;				
				scale = opts.flashStarImage[imageIndex][1] / opts.flashStarImage[imageIndex][2] ;
				widh 	= rand( opts.flashStarImage[imageIndex][1] * 0.2 , opts.flashStarImage[imageIndex][2] );
				height = widh / scale;
				/*绛夋瘮渚嬬缉鏀�*/ 
				leftArea  = Array( rand( 10, maxWidth * 0.2 ) , rand( maxWidth * 0.8 , maxWidth - widh - 20 )) ;
				html += '<img src="'+ opts.flashStarImage[imageIndex][0] +'" style="width:'+ widh +'px;height:'+height+'px;left:'+ leftArea[ rand( 0 ,leftArea.length - 1) ] +'px;top:'+ rand(10,docHeight - 30)  +'px;" class="planetTravelFlash" name="planetTravelFlash" />';
			}
			$obj.append(html);
			/*IE8鍙婁互涓嬬増鏈笉闂儊(IE8 鍙婁互涓嬬増鏈敼鍙橀€忔槑搴︽湁涓ラ噸bug)*/
			if( '\v' != 'v'  ){
				$obj.append(html).find('img[name=planetTravelFlash]').each(function(){
					glint($(this));
				});
			}
			function glint($star){
				$star.animate({ opacity : rand(2,10) * 0.1 } , rand( 100, 500 ),function(){
					setTimeout(function(){
						glint($star);
					},rand(100,300));
				});
			}
		}
		
		function fly(){
			var html = '' , imageIndex , xPos;
			var imagesNum = opts.flyStarImage.length ;
			for(var i=0 ; i < opts.flyMakestarNum ; i++){
				imageIndex = rand(0 , imagesNum -1) ;
				xPos = [ - opts.flyStarImage[imageIndex][1] , maxWidth - opts.flyStarImage[imageIndex][1] - 20  ];			
				html += '<img src="'+ opts.flyStarImage[imageIndex][0] +'" status="start" index="'+imageIndex+'" xpos="'+ xPos.join(',') +'" class="planetTravelFly" style="left:'+ (maxWidth * 0.5) +'px;top:'+ (maxHeight * 0.35) +'px;"/>';
			}
			$obj.append(html).find('img[status=start]').each(function(){
				html = null ;
				var $this = $(this);
				var index = $this.attr('index');
				xPos = $this.attr('xpos').split(',');
				$this.attr('status','run').css({opacity : rand(opts.flyStartBright[0] * 10 , opts.flyStartBright[1] * 10 ) * 0.1 }).animate({
					top: 	rand( - Math.max( 200 , maxHeight * 0.2 ) , maxHeight - 10 ) ,
					left:	xPos[rand(0,1)] ,
					width: 	rand(opts.flyStarImage[index][1] / 4 ,opts.flyStarImage[index][1]),
					height: rand( opts.flyStarImage[index][2] / 4 , opts.flyStarImage[index][2] )
				} , rand( opts.flyDuration * 0.5 , opts.flyDuration * 4 ) , 'starFly' ,function(){
					$this.remove();
				});
			});
		}
	};
	$.fn.planetTravel.defaults = {
		bgCss				: ['planetTravelBg_1' ,'planetTravelBg_2' ,'planetTravelBg_3' ],
		flyStarImage		: [ ['images/star-fly-1.png' , 23 ,23 ] ],/*鏄熸槦鍥剧墖鍦板潃.鍦板潃锛屽搴︼紝楂樺害*/	
		flyStartBright	 	: Array( 0.6 , 1 ) ,  /*star 浜害鑼冨洿*/ 
		flyDuration			: 15000 , /*鏄熸槦椋炶鐨勬椂闂�,鍗曚綅 ms 銆傦紙鍐冲畾鏄熸槦椋炶閫熷害鐨勫揩鎱級*/
		flyMakeStarTime		: 5000 , /*鍒堕€爏tar鏃堕棿闂撮殧,鍗曚綅 ms.*/
		flyMakestarNum		: 2 ,  /*姣忔浜х敓澶氬皯涓猻tar,鍗曚綅 ms.*/
		
		flashStarImage		: [ ['images/star-flash-1.png' , 30 ,27 ] , [ 'images/star-flash-2.png' , 40 ,40 ], [ 'images/star-flash-2.png' , 40 ,40 ] ],/*鏄熸槦鍥剧墖鍦板潃 銆傚湴鍧€锛屽搴︼紝楂樺害  */
		flashStarDensity	: 0.3 /* 闂儊鏄熸槦鐨勫瘑搴︺€� 鍗曚綅锛氫釜銆傚嵆 姣�100骞虫柟鍍忕礌 闈㈢Н鍐� 闂儊鏄熸槦鐨勫钩鍧囨暟閲忥紙鍗筹細100px * 100px 闈㈢Н鍐咃級*/
	};	
})(jQuery);