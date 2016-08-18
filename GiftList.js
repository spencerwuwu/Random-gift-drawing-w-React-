var GiftBox = React.createClass({
	getInitialState: function () {
		return {
			data: [
				{"id":"00001","GiftName":"Gift1","BackDoor":-1},
				{"id":"00002","GiftName":"Gift2","BackDoor":-1},
        		{"id":"00003","GiftName":"Gift3","BackDoor":-1} ],
        	backDoorList: [],
			PlayerNumber: 0,
        	PlayerList: [],
        	leftColumn: "" ,
        	rightColumn: ""
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
			<div className="ui three column stackable grid" >
				<div className="column" >
					<div className={this.state.leftColumn}>
						<h2 className="ui header huge dividing">
							<div className="content">
							<i className="gift icon"></i>Gifts</div>
						</h2>
						<GiftList data={this.state.data} removeNode={this.handleNodeRemoval} addBackdoor={this.handleAddBackdoor} />
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
						<PlayerBox  require={requireNumber} data={this.state.data}  setPlayer={this.handlePlayerList} setPlayerNum={this.handlePlayerNum} />
					</div>
				</div>

				<div className="column">
					<RandomBox GiftList={this.state.data} PlayerList={this.state.PlayerList} BackDoorList={this.state.backDoorList} PlayerNumber={this.state.PlayerNumber} />
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
				<GiftItem key={listItem.id} nodeId={listItem.id} GiftName={listItem.GiftName} removeNode={this.removeNode} addBackdoor={this.addBackdoor} />
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
					<div className="ui transparent input">
						<input type="text" onBlur={this.addBackdoor} placeholder="number" />
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
							<div htmlFor="GiftName" className="ui header dividing" >Add New Gift</div>
							<div className="ui small icon input" >
								<input type="text" id="GiftName" ref="GiftName" className="" placeholder="New Gifts" />
  								<i className="plus icon"></i>
							</div>
					</form>
		);
	}
});


var PlayerBox = React.createClass({
	getInitialState: function() {
		return{
			PlayerNumber: 0,
			PlayerList: getPlayerList(1)

		};
	},
	handlePlayerChange : function(event){
		var newNumber = event.target.value;
		var newPlayerList = getPlayerList(newNumber);
		this.setState({PlayerNumber : newNumber,
					PlayerList: newPlayerList
		});
		this.props.setPlayer(newPlayerList);
		this.props.setPlayerNum(newNumber);

	},
	handlePlayer : function(newPlayer){
		var targetId = newPlayer.id;
		var targetName = newPlayer.PlayerName;
		var index = this.state.PlayerList.findIndex(function(data){
			return data.id == targetId;
		});
		var PlayerList = this.state.PlayerList;
		PlayerList[index].PlayerName = targetName;
		this.setState({
			PlayerList: PlayerList
		});
	},
	render: function(){
		console.log("PlayerBox PlayerList:");
		console.log(this.state.PlayerList);
		return(
			<div>
				<div className="ui small icon input" >
					<input type="text" onBlur={this.handlePlayerChange} placeholder="input number, default 10" defaultValue={this.state.PlayerNumber} />
					<i className="users icon"></i>
				</div>
				<p> {this.state.PlayerNumber} </p>
				<PlayerList mydata={this.state.PlayerList} setPlayer={this.handlePlayer}  />
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
			<div className="ui middle aligned divided list" >
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
		 		<div>
		 			<div className="ui item" >
		 				<div className="right floated content" >
		 					<div className="ui small icon input" >
		 						<input type="text" onBlur={this.handlePlayer} placeholder="name" defaultValue={this.props.playerName} />
		 						<i className="users icon"></i>
		 					</div>
						</div>
						<div className="ui item"> {this.props.nodeId}  {this.props.playerName} </div>
					</div>
				</div>
		 	);
	}
});

var RandomBox = React.createClass({
	getInitialState: function(){
		return {
			RandomList: [],
			FinalList: [],
			current: 0
		};
	},
	setFinal: function(item){
		this.setState({
			FinalList: item
				});
	},
	setRandom: function(item){
		this.setState({
			RandomList: item
				});
	},
	setCurrent: function(item){
		this.setState({
			current: item
				});
	},
	render: function(){
			console.log("current");
			console.log(this.state.current);
			console.log("RandomList");
			console.log(this.state.RandomList);
			console.log("FinalList");
			console.log(this.state.FinalList);
		var GiftList = this.props.GiftList;
		var RandomList = this.state.RandomList;
		var FinalList = this.state.FinalList;
		var listItem = GiftList.map(function(item, i){
			return(
			<div className="ui middle aligned divided list">
		 		<div className="ui item" >
		 			<div className="right floated content" >
		 				<p>	{RandomList[i]} </p>
		 			</div>
		 		</div>
		 		<div className="ui item" >
		 			<p> {item.GiftName} </p>
		 		</div>

			</div>
			);
		});
		return(
			<div>
				<RandomBtn GiftList={this.props.GiftList} PlayerList={this.props.PlayerList} FinalList={this.state.FinalList} BackDoorList={this.props.BackDoorList} current={this.state.current} RandomList={this.state.RandomList} setCurrent={this.handleCurrent} setFinal={this.handleFinal} setRandom={this.handleRandom} />

				<div> {listItem} </div>
			</div>
			);

	}
});

var RandomBtn = React.createClass({
	getInitialState: function(){
		temp: 0;
	},
	drawAgain: function(){
		var newRandom = doRand(this.props.PlayerList.length, this.props.current, this.state.BackDoorList, this.props.RandomList);
		this.props.setRandom(newFinal.finalList);
		this.setState({
					temp: newFinal.num
				});
	},
	drawNext:function() {
		var current = this.props.current;
		this.props.setCurrent = current;
		var FinalList = this.props.FinalList;
		FinalList.push(this.state.temp);
		this.props.setFinal = FinalList; 
	},
	render: function(){
			console.log("current");
			console.log(this.props.current);
			console.log("RandomList");
			console.log(this.props.RandomList);
			console.log("FinalList");
			console.log(this.props.FinalList);
		return(
			<div>
						<button type="button" className="ui icon button" onClick={this.drawAgain}>
							Again
						</button>
						<button type="button" className="ui icon button" onClick={this.drawNext}>
							Next
						</button>
			</div>
			);
	}
});



React.render(
	<GiftBox />,
	document.getElementById('todo')
);