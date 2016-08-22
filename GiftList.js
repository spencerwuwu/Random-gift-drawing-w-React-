var GiftBox = React.createClass({
	getInitialState: function () {
		return {
			data: [
				{"id":"00001","GiftName":"Gift1","BackDoor":-1},
				{"id":"00002","GiftName":"Gift2","BackDoor":-1},
        		{"id":"00003","GiftName":"Gift3","BackDoor":-1} ],
        	backDoorList: [],
			PlayerNumber: 3,
			PlayerList: getPlayerList(3),
        	leftColumn: "" ,
        	rightColumn: "",
        	BDstate: "invisable",
        	finalState: "finalPopout invisable"
		};
	},
	generateId: function () {
		return Math.floor(Math.random()*90000) + 10000;
	},
	handleNodeRemoval: function (nodeId) {
		var data = this.state.data;
		data = data.filter(function (el) {
			return el.id !== nodeId;
		});
		this.setState({data});
		return;
	},
	handleSubmit: function (GiftName) {
		var data = this.state.data;
		var id = this.generateId().toString();
		var num = -1;
		data = data.concat([{id, GiftName, num}]);
		this.setState({data});
	},
	handleAddBackdoor: function(backDoorData){
		var targetId = backDoorData.id;
		var backDoorNum = backDoorData.number;
		var index = this.state.data.findIndex(function(data){
			return data.id == targetId;
		});
		var data = this.state.data;
		data[index].BackDoor = backDoorNum;
		var backDoorList = data.map(function(item){
			return item.BackDoor;
		});
		this.setState({
			data: data,
			backDoorList: backDoorList
		});
	},
	handlePlayerList: function(newPlayerList){
		this.setState({
			PlayerList: newPlayerList
		});
	},
	handlePlayerNum: function(newNumber){
		this.setState({
			PlayerNumber: newNumber
		})
	},
	drawBegin: function(){
		this.setState({
			leftColumn: "behind",
			rightColumn: ""
		});
	},
	activateBD: function(){
		var BDstate = (this.state.BDstate == "invisable") ? "" : "invisable";
		this.setState({
			BDstate: BDstate
		});

	},
	render: function() {
		console.log("Gift List:");
		console.log(this.state.data.map(function(item){
			return item;
		}));
		console.log("BackDoor List:");
		console.log(this.state.backDoorList);
		console.log("Giftbox Playerlist");
		console.log(this.state.PlayerList);
		var requireNumber = this.state.data.length;
		return (
			<div>
				<div className="ui two column stackable grid" >
					<div className="column" >
						<div className={this.state.leftColumn}>
							<h2 className="ui blue header huge dividing">
								<div className="content">
								<i className="gift icon" onClick={this.activateBD} ></i>Gifts</div>
							</h2>
							<GiftList data={this.state.data} removeNode={this.handleNodeRemoval} addBackdoor={this.handleAddBackdoor} BDstate={this.state.BDstate} />
							<GiftForm onGiftNameSubmit={this.handleSubmit} />
							<p> </p>
							<div className="notclear"> <p> Press Enter to add new gift to list</p> </div>
							<p> </p>
							<div className="ui content">
							</div>
						</div>
					</div>


					<div className="column" >
						<div className={this.state.rightColumn}>
							<PlayerBox  require={requireNumber} data={this.state.data} PlayerList={this.state.PlayerList} setPlayer={this.handlePlayerList} setPlayerNum={this.handlePlayerNum} />
						</div>
					</div>

				</div>
				<div className="finalPopout">
					<div className="ui raised  container segment">
						<RandomBox GiftList={this.state.data} PlayerList={this.state.PlayerList} PlayerNumber={this.state.PlayerNumber} BackDoorList={this.state.backDoorList} PlayerNumber={this.state.PlayerNumber} />
					</div>
				</div>
			</div>
		);
	}
});

var GiftList = React.createClass({
	removeNode: function (nodeId) {
		this.props.removeNode(nodeId);
		return;
	},
	addBackdoor: function (backDoorData){

		this.props.addBackdoor(backDoorData);
		return;
	},
	render: function() {
		var listNodes = this.props.data.map(function (listItem) {
			return (
				<GiftItem key={listItem.id} nodeId={listItem.id} GiftName={listItem.GiftName} removeNode={this.removeNode} addBackdoor={this.addBackdoor} BDstate={this.props.BDstate} />
			);
		},this);
		return (
			<div className="ui middle aligned divided list" >
				{listNodes}
			</div>
		);
	}
});

var GiftItem = React.createClass({
	removeNode: function (e) {
		e.preventDefault();
		this.props.removeNode(this.props.nodeId);
		return;
	},
	addBackdoor:function (event){
		var backDoorNum = event.target.value;
		var backDoorData = {"id":this.props.nodeId,"number":backDoorNum};
		this.props.addBackdoor(backDoorData);
		console.log(backDoorData);
		return;

	},
	updateClass: function () {
		
	},
	render: function() {
		return (
			<div className="ui item" >
				<div  role="group" className="right floated content" >
					<button type="button" className="ui icon button " onClick={this.removeNode}>
						<i className="remove icon"></i>
					</button>
					<div className={this.props.BDstate}>
						<div className="ui transparent input">
							<input type="text" onBlur={this.addBackdoor} placeholder="Player no." />
						</div>
					</div>
				</div>
				<div className="ui item"> {this.props.GiftName} </div>
			</div>
		);
	}
});

var GiftForm = React.createClass({
	doSubmit: function (e) {
		e.preventDefault();
		var GiftName = React.findDOMNode(this.refs.GiftName).value.trim();
		if (!GiftName) {
			return;
		}
		this.props.onGiftNameSubmit(GiftName);
		React.findDOMNode(this.refs.GiftName).value = '';
		return;
	},
	render: function() {
		return (
					<form onSubmit={this.doSubmit} className="ui item container" >
							<div htmlFor="GiftName" className="ui blue header" >Add New Gift:</div>
							<div className="ui small icon input" >
								<input type="text" id="GiftName" ref="GiftName" className="" placeholder="New Gifts" />
  								<i className="plus blue icon"></i>
							</div>
					</form>
		);
	}
});


var PlayerBox = React.createClass({
	getInitialState:function(){
		return{
			ListState: "invisable"
		};
	},
	handlePlayerChange : function(event){
		var newNumber = event.target.value;
		var newPlayerList = getPlayerList(newNumber);
		this.props.setPlayer(newPlayerList);
		this.props.setPlayerNum(newNumber);

	},
	handlePlayer : function(newPlayer){
		var targetId = newPlayer.id;
		var targetName = newPlayer.PlayerName;
		var index = this.props.PlayerList.findIndex(function(data){
			return data.id == targetId;
		});
		var PlayerList = this.props.PlayerList;
		PlayerList[index].PlayerName = targetName;
		this.props.setPlayer = PlayerList;
	},
	handleListstate : function(){
		var state = (this.state.ListState == "invisable") ? "" : "invisable";
		this.setState({
			ListState: state
		});
	},
	render: function(){
		return(
			<div>
						<h2 className="ui blue header huge dividing">
							<div className="content">
							<i className="users icon"></i>Players</div>
						</h2>
				<div className="ui left icon input" >
					<input type="text" onBlur={this.handlePlayerChange} placeholder="Player number, default 10" defaultValue={this.props.PlayerNumber} />
					<i className="users blue icon"></i>
				</div>
				<p> {this.props.PlayerNumber} </p>
				<div className="ui item">
								<button type="button" className="ui icon button" onClick={this.handleListstate}>
									Edit PlayerName
								</button>
				</div>
				<div className={this.state.ListState}>
					<PlayerList mydata={this.props.PlayerList} setPlayer={this.handlePlayer}  />
				</div>
			</div>

		);
	}
});

var PlayerList = React.createClass({
	handlePlayer: function (newPlayer){

		this.props.setPlayer(newPlayer);
		return;
	},
	render: function() {
		var listNodes = this.props.mydata.map(function (player) {
			return (
				<Player key={player.id} nodeId={player.id} playerName={player.PlayerName} handlePlayer={this.handlePlayer} />
			);
		},this);
		return (
			<div className="ui middle aligned list" >
				{listNodes}
			</div>
		);
	}
});

var Player = React.createClass({
	handlePlayer:function (event){
		var newPlayerName = event.target.value;
		var newPlayer = {"id":this.props.nodeId,"PlayerName":newPlayerName};
		this.props.handlePlayer(newPlayer);
		console.log(newPlayer);
		return;

	},
	render: function(){
		 	return(
		 		<div className="ui item">
						<div className="ui item"><h5>No : {this.props.nodeId}  -  {this.props.playerName} </h5></div>
		 				<div className="ui left icon input" >
		 					<input type="text" onBlur={this.handlePlayer} placeholder="name" defaultValue={this.props.playerName} />
		 					<i className="user icon"></i>
		 				</div>
				</div>
		 	);
	}
});

var RandomBox = React.createClass({
	getInitialState: function(){
		return {
				RandomList:[],
				FinalList:[],
				current:0,
		};
	},
	handleFinal: function(item){
		this.setState({
			FinalList: item
				});
	},
	handleRandom: function(item){
		this.setState({
			RandomList: item
				});
	},
	handleCurrent: function(item){
		this.setState({
			current: item
				});
	},
	render: function(){
			console.log("RandomBox current");
			console.log(this.state.current);
			console.log("RandomBox RandomList");
			console.log(this.state.RandomList);
			console.log("RandomBox FinalList");
			console.log(this.state.FinalList);
			console.log("RandomBox PlayerList");
			console.log(this.props.PlayerList);
		var GiftList = this.props.GiftList;
		var RandomList = this.state.RandomList;
		var FinalList = this.state.FinalList;
		var PlayerList = this.props.PlayerList;
		var listItem = FinalList.map(function(item, i){
			return(
		 		<div className="ui item two column grid" >
			 		<div className="column" >
			 			<h2> {GiftList[i].GiftName} </h2>
			 		</div>
		 			<div className="column" >
		 				<h2> {item.id} {item.PlayerName} </h2>
		 			</div>
		 		</div>

			);
		});
		return(
			<div className="ui two column stackable grid">
				<div className="column">
					<RandomBtn RandomList={this.state.RandomList} GiftList={GiftList} FinalList={this.state.FinalList} current={this.state.current} BackDoorList={this.props.BackDoorList} PlayerList={this.props.PlayerList} setCurrent={this.handleCurrent} setFinal={this.handleFinal} setRandom={this.handleRandom} />
				</div>
				<div className="column">
					<h1 className="ui blue header huge center aligned dividing"> Final List </h1>
					<br />
					<div className="ui middle aligned divided list"> {listItem} </div>
				</div>
			</div>
			);

	}
});

var RandomBtn = React.createClass({
	getInitialState: function(){
		return{
			btnState: "invisable" ,
			AbtnState: "",
			temp: 0,
			item: {},
			finalAnimate: "finalAnimate elementFadeOut"
		};
	},
	drawAgain: function(){
		var newRandom = doRand(this.props.PlayerList.length, this.props.current, this.props.BackDoorList, this.props.RandomList);
		this.props.setRandom(newRandom.finalList);
		var index = newRandom.num - 1;
		var item = this.props.PlayerList[index];
		var finalAnimate = (this.state.finalAnimate == "finalAnimate elementFadeOut") ? "finalAnimate elementFadeOut1" : "finalAnimate elementFadeOut"
		this.setState({
					btnState: "",
					temp: newRandom.num,
					item: item,
					finalAnimate: finalAnimate
				});
	},
	drawNext:function() {
		var current = this.props.current;
		var FinalList = this.props.FinalList;
		var index = this.state.temp - 1;
		console.log("this.props.PlayerList[index]");
		console.log(this.props.PlayerList[index]);
		var item = this.props.PlayerList[index];
		FinalList.push(item);
		this.props.setFinal(FinalList); 

		if(current == this.props.GiftList.length - 1){
			alert("End of Draw!!");
			this.setState({
				AbtnState: "invisable",
				btnState: "invisable"
			});
		}
		else{
			this.props.setCurrent(current+1);
			this.setState({
				btnState: "invisable"
			});
		}
		

	},
	render: function(){
			console.log("RandomBtn BackDoorList");
			console.log(this.props.BackDoorList);
			console.log("RandomBtn current");
			console.log(this.props.current);
			console.log("RandomBtn RandomList");
			console.log(this.props.RandomList);
			console.log("RandomBtn FinalList");
			console.log(this.props.FinalList);
			var item = this.state.item;
		return(
			<div>
				<div className="ui raised container segment">
				<br />
					<h1 className="ui blue header ">{this.props.GiftList[this.props.current].GiftName}</h1>
					<br />
					<div className={this.state.finalAnimate} >
							<div className="spinner spinner-1"></div>
					</div>
					<h1 className="ui header huge center aligned dividing"> {item.id} {item.PlayerName} </h1>

					<div className="ui two column grid">
						<div className="column">
							<div  className={this.state.AbtnState}>
								<button type="button" className="ui icon button right floated" onClick={this.drawAgain}>
									Draw!
								</button>
							</div>
						</div>	
						<div className="column">
							<div className={this.state.btnState}>
								<button type="button" className=" ui icon button" onClick={this.drawNext}>
									Next
								</button>
							</div>
						</div>
					</div>	
				</div> 
			</div>
			);
	}
});



React.render(
	<GiftBox />,
	document.getElementById('todo')
);