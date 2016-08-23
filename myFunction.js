function doRand(maxNum, current, backDoorIn, finalListIn){
	var j = 0;
	var backDoor = [];
	var i = 0;
	while(j<=backDoorIn.length){
		backDoor.push((backDoorIn[j] != -1) ? parseInt(backDoorIn[j]) : -1);
		j++;
	}
	
	var finalList = finalListIn;
	if(finalList.length == 0){
		if(backDoor[current] > 0){
			finalList.push(backDoor[current]);
			i = backDoor[current];
		}else{
			i = randomInt(1, maxNum);
			while(backDoor.indexOf(i) >= 0){
				i = randomInt(1, maxNum);
			}
			finalList.push(i);
		}
	}
	else{
		if(backDoor[current] > 0){
			finalList.push(backDoor[current]);
			i = backDoor[current];
		}else{
			i = randomInt(1, maxNum);
			while(finalList.indexOf(i) >= 0 || backDoor.indexOf(i) >= 0){
				i = randomInt(1, maxNum);
			}
			finalList.push(i);
		}
	}
	return {"finalList": finalList, "num": i};
}

function randomInt(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function getPlayerList(num){
	var list = [];
	var index = 1;
	while (num != 0){
		list.push({"id":index, "PlayerName":"-"});
		index++;
		num--;
	}
	return list;
}



