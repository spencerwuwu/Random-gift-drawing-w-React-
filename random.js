
function doRand(maxNum, requireNum){
	var exportNum = [];
	var done = 0;
	if(requireNum > maxNum){
		requireNum = maxNum;
	}
	while(requireNum > 0){
		if(done == 0){
			exportNum.push(randomInt(1, maxNum));
			requireNum--;
			done++;
		}else{
			var i = randomInt(1, maxNum);
			while( exportNum.indexOf(i) >= 0){
				i = randomInt(1, maxNum);
			}
			exportNum.push(i);
			requireNum--;
			done++;
		}
	}
	return exportNum;
}

function randomInt(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}


