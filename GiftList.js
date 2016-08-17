var GiftBox = React.createClass({
	getInitialState: function () {
		return {
			data: [
				{"id":"00001","GiftName":"Gift1","BackDoor":-1},
				{"id":"00002","GiftName":"Gift2","BackDoor":-1},
        		{"id":"00003","GiftName":"Gift3","BackDoor":-1} ],
        	backDoorList: [],
        	RandomList: [],
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
	handlePlayerList: function(){

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
		var requireNumber = this.state.data.length;
		return (
			<div className="ui two column stackable grid" >
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
						<PlayerBox  require={requireNumber} data={this.state.data} setplayer={this.handlePlayerList} />
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
			PlayerList: []

		};
	},
	handlePlayerChange : function(event){
		var newNumber = event.target.value;
		this.setState({PlayerNumber : newNumber,
					PlayerList: getPlayerList(newNumber)
		});

	},
	render: function(){
		var Players = this.state.PlayerList.map(player, i){
			return(
				<div>
					<div className="ui item" >
						<div className="right floated content" >
							<div className="ui small icon input" >
								<input type="text" onBlur={this.handlePlayerName} placeholder="name" />
							<i className="users icon"></i>
							</div>

						</div>
						<div className="ui item"> {player.id}  {player.PlayerName} </div>
					</div>


		
				</div>
			);
		};
		return(
			<div>
				<div className="ui small icon input" >
					<input type="text" onBlur={this.handlePlayerChange} placeholder="input number, default 10" />
					<i className="users icon"></i>
				</div>
				<p> {this.state.PlayerNumber} </p>

			</div>

		);
	}
});

/*
var Player = React.createClass({
	getInitialState: function() {
		return { 
			PlayerNumber : 10,
			requireNumber : 4,
			PlayerList: [],
        	leftColumn: "" ,
        	rightColumn: ""};
	},
	handlePlayerChange : function(event){
		var newNumber = event.target.value;
		this.setState({PlayerNumber : newNumber});
	},
	drawBegin: function(){
		this.setState({
			leftColumn: "behind",
			rightColumn: ""
		});
	},
	render : function() {
		var requireNumber = this.props.require;
		return(
			<div>
				<div className={this.state.leftColumn}>
					<div className="ui small icon input" >
						<input type="text" onBlur={this.handlePlayerChange} placeholder="input number, default 10" />
						<i className="users icon"></i>
					</div>
					<p>number of people: {this.state.PlayerNumber } </p>
						<p> </p>
						<div className="ui content">
							<button type="button" className="ui icon button " onClick={this.drawBegin}>
							Finish setting
							</button>
						</div>
					</div>
			</div>
		);
	}
});

var RandomNum = React.createClass({
	getInitialState: function() {
		return { 
			current : 0,
			numberR : doRand(this.props.PlayerNumber),
			result : [],
			startClass : "",
			btnClass : "invisable ",
			currentGift: 0
			 };
	},
	drawAgain: function(){
		if(this.state.current >= this.props.PlayerNumber-1){
			alert('no more people to draw!');
		}else {
			this.setState({current : this.state.current+1});
		}
	},
	drawNext: function(){	
		if(this.state.currentGift < this.props.data.length - 1){
				var temp = this.state.result;
				temp.push(this.state.numberR[this.state.current]);

				this.setState({
					current : this.state.current+1,
					result: temp,
					currentGift: this.state.currentGift+1
				});

			
		}else{
				alert('End of drawing!');
				var temp = this.state.result;
				temp.push(this.state.numberR[this.state.current]);

				this.setState({
					result: temp
				});
		}
			
	},
	drawReset: function(){
		this.setState({
			current : 0,
			numberR : doRand(this.props.PlayerNumber),
			result : [],
			currentGift: 0 });
	},
	drawStart:function() {

		var temp1 = this.state.startClass;
		var temp2 = this.state.btnClass;
		this.setState({
			numberR : doRand(this.props.PlayerNumber),
			startClass : temp2,
			btnClass : "finalPopout"
		})
	},
	render : function() {
		var dataList = this.props.data;
		var resultList = this.state.result;
		var dataPrintList = dataList.map(function(dataList, i){
			return( 
						<div className="ui two column grid item"> 
							<div className="ui item column">
								<div className="content"> {dataList.GiftName} </div> 
							</div>
							<div className="ui item column">
								<div className="float right content"> {resultList[i]} </div> 
							</div>
						</div>
			);
		});
		return(
			<div className="ui item">
				<div className={this.state.startClass}>
						<button type="button" className="ui icon button" onClick={this.drawStart}>
							Start
						</button>
				</div>
				<div className={this.state.btnClass}>
					<div className="ui raised very padded text container segment">
						<div className="ui raised segment">
							<h2 className="ui header ">{dataList[this.state.currentGift].GiftName}</h2>
							<h1 className="ui header huge center aligned dividing"> {this.state.numberR[this.state.current]} </h1>
							<p>
								<button type="button" className="ui icon button" onClick={this.drawAgain}>
									Again
								</button>
								<button type="button" className="ui icon button" onClick={this.drawNext}>
									Next
								</button>
								<button type="button" className="ui icon button" onClick={this.drawReset}>
									Reset
								</button>
							</p>
							<p className="notclear">To restart from the beginning, refresh the page </p> 
						</div>
					

						<h2 className="ui header"> Results </h2>

						<div className="ui middle aligned divided list">
							{dataPrintList}

						</div>
					</div>
				</div>
			</div>
		);
	}
});

*/

React.render(
	<GiftBox />,
	document.getElementById('todo')
);