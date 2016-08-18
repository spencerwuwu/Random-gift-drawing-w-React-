
function doRand(maxNum, backDoor){
	var exportNum = [];
	var done = 0;
	
	var requireNum = maxNum;
	
	while(requireNum > 0){
		if(done < backDoor.length && backDoor[done] > 0){
			exportNum.push(backDoor[done]);
		}else{
			var i = randomInt(1, maxNum);
			while( exportNum.indexOf(i) >= 0 || backDoor.indexOf(i) >=0){
				i = randomInt(1, maxNum);
			}
			exportNum.push(i);
		}
		done++;
		requireNum--;

	}
	return exportNum;
}

function randomInt(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getPlayerList(num){
	var list = [];
	var index = 1;
	while (num != 0){
		list.push({"id":index, "PlayerName":""});
		index++;
		num--;
	}
	return list;
}



