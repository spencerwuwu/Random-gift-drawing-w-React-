var RandomNum = React.creatClass({
	render: function(){
		var maxNum = this.props.number;
		var exportNum = [];
		var done = 0;
		var requireNum = 3;

		while(requireNum > 0){
			if(done == 0){
				exportNum.push(Math.floor(Math.random()*maxNum+1);
				requireNum--;
				done++;
			}else{
				var i = Math.floor(Math.random()*maxNum+1;
				while( exportNum.indexOf(i) >= 0){
					i = randomInt(1, maxNum);
				}
				exportNum.push(i);
				requireNum--;
				done++;
			}
		}

	}
});