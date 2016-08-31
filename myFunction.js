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

var convertGift = function(List){
	var index = 0;
	var output = [];
	if(List[List.length - 1] == ""){
		List.pop();
	}
	while(index < List.length){
		var id = generatedId().toString();
		var item = {"id":id, "GiftName": List[index], "BackDoor": -1};
		output.push(item);
		index++;
	}
	return output;
}

var convertPlayer = function(List){
	var index = 0;
	var output = [];
	if(List[List.length - 1] == ""){
		List.pop();
	}
	while(index < List.length){
		var id = index + 1;
		var item = {"id":id, "PlayerName": List[index]};
		output.push(item);
		index++;
	}
	return output;	
}

var generatedId = function(){
	return Math.floor(Math.random()*90000) + 10000;
}









