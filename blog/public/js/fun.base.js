/*
* function rand 锛� 浜х敓闅忔満鏁存暟 銆�
*/
function rand( minDit , maxDit ) {
	return Math.floor(Math.random() * (maxDit - minDit + 1)) + minDit;
};

/*
* function getViewSize 锛岃幏鍙栧睆骞曞彲瑙嗚寖鍥寸殑灏哄銆�
*/
function getViewSize(){
	var de=document.documentElement;
	var db=document.body;
	var viewW=de.clientWidth==0 ?  db.clientWidth : de.clientWidth;
	var viewH=de.clientHeight==0 ?  db.clientHeight : de.clientHeight;
	return Array(viewW ,viewH);
};