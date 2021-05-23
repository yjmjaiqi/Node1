function zk(){
	var join_zp_c = document.querySelectorAll(".join_zp_c");
	var join_zp_n = document.querySelectorAll(".join_zp_n");
	var join_zp_length = join_zp_c.length;
	for(var i=0;i<join_zp_length;i++){
		join_zp_c[i].index = i;
		join_zp_c[i].onclick = function(){
			var isf = join_zp_n[this.index].className;
			if(isf == 'join_zp_n join_active'){
				join_zp_n[this.index].className = 'join_zp_n';
			}else{
				for(var i=0;i<join_zp_length;i++){
					join_zp_n[i].className = 'join_zp_n';
				}
				join_zp_n[this.index].className = 'join_zp_n join_active';
			}
		}
	}
}
zk();