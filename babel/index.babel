var GiftBox = React.createClass({
	getInitialState: function () {
		return {
			data: [
				{"id":"00001","GiftName":"Gift1","BackDoor":-1},
				{"id":"00002","GiftName":"Gift2","BackDoor":-1},
        		{"id":"00003","GiftName":"Gift3","BackDoor":-1} ],
        	backDoorList: [],
			PlayerNumber: 0,
			PlayerList: getPlayerList(0),
        	leftColumn: "" ,
        	rightColumn: "",
        	BDstate: "invisable",
        	RandomBoxState: "invisable",
			normalPlayer: "",
			excelPlayer: "invisable",
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
	directSubmit: function(item){
		this.setState({data:item});
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
	changeInput: function(){
		var normalPlayer = (this.state.normalPlayer == "") ? "invisable" : "";
		var excelPlayer = (this.state.excelPlayer == "") ? "invisable" : "";
		this.setState({
			normalPlayer: normalPlayer,
			excelPlayer:  excelPlayer
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
	setRandomBoxState: function(item){
		this.setState({
			RandomBoxState: item
		})
	},
	handleRestart: function(item){
		this.setState({
			RandomBoxState: item
		})
	},
	render: function() {
		console.log("Gift List:");
		console.log(this.state.data.map(function(item){
			return item;
		}));
		console.log("dataList");
		console.log(this.state.data);
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
							<div>
								<div className={this.state.normalPlayer}>
									<button type="button" className="ui icon button" onClick={this.changeInput}>
										Paste from Excel <i className="file excel outline icon"></i>
									</button>
								</div>
								<div className={this.state.excelPlayer}>
									<button type="button" className="ui icon button" onClick={this.changeInput}>
										Back to normal mode <i className="undo icon"> </i>
									</button>
								</div>
								
							</div>
							<p> </p>
							<div className={this.state.normalPlayer}>
								<GiftForm onGiftNameSubmit={this.handleSubmit} />
								<p> </p>
								<div className="notclear"> <p> Press Enter to add new gift to list</p> </div>
							</div>
							<div className={this.state.excelPlayer} >
								<GiftExcel  directGiftNameSubmit={this.directSubmit} />
							</div>
							<p> </p>
							<div className="ui content">
							</div>							
							<p></p>
							<div className="ui blue dividing header" >Gift List</div>

							<GiftList data={this.state.data} normalPlayer={this.state.normalPlayer} removeNode={this.handleNodeRemoval} addBackdoor={this.handleAddBackdoor} BDstate={this.state.BDstate} />

						</div>
					</div>


					<div className="column" >
						<div className={this.state.rightColumn}>
							<PlayerBox  require={requireNumber} data={this.state.data} RandomBoxState={this.setRandomBoxState} PlayerList={this.state.PlayerList} setPlayer={this.handlePlayerList} setPlayerNum={this.handlePlayerNum} />
						</div>
					</div>

				</div>
				<div className={this.state.RandomBoxState}>
					<div className="ui raised  container segment">
						<RandomBox GiftList={this.state.data} handleRestart={this.handleRestart} PlayerList={this.state.PlayerList} PlayerNumber={this.state.PlayerNumber} BackDoorList={this.state.backDoorList} PlayerNumber={this.state.PlayerNumber} />
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
				<GiftItem normalPlayer={this.props.normalPlayer} key={listItem.id} nodeId={listItem.id} GiftName={listItem.GiftName} removeNode={this.removeNode} addBackdoor={this.addBackdoor} BDstate={this.props.BDstate} />
			);
		},this);
		return (
			<div className="ui middle aligned list" >
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
	updateClass: function (event) {
		
	},
	render: function() {
		return (
			<div className="ui item" >
				<div  role="group" className="right floated content" >
						<div className={this.props.normalPlayer}>
							<button type="button" className="ui icon button " onClick={this.removeNode}>
								<i className="remove icon"></i>
							</button>
						</div>
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
				<div>
						<form onSubmit={this.doSubmit} className="ui item container" >
							<div htmlFor="GiftName" className="ui blue header" >Add New Gift:</div>
							<div className="ui small icon input" >
								<input type="text" id="GiftName" ref="GiftName" className="" placeholder="New Gifts" />
  								<i className="plus blue icon"></i>
							</div>
					</form>
					
				</div>
		);
	}
});

var GiftExcel = React.createClass({
	getInitialState: function(){
		return{
			List: [],
		};
	},
	handleText: function(event){
		var input = event.target.value;
		var List = input.split('\n');
		console.log(List);
		var NewList = convertGift(List);
		this.setState({
			List: NewList
		});
	},
	submitList: function(){
		if(this.state.List.length == 0){
			alert("No Content submit!");
		}
		else{
		this.props.directGiftNameSubmit(this.state.List);
		}
	},
	render: function() {
		return(
		<div>

					<form className="ui reply form">
	   					<div className="field">
	   					   <textarea onBlur={this.handleText} placeholder="Paste a List from Excel" ></textarea>
	   					</div>
	    					<div className="ui blue labeled submit icon button" onClick={this.submitList} >
	   						   <i className="icon edit"></i> Apply List
	  					</div>
	  				</form>
		</div>
		);
	}
});


var PlayerBox = React.createClass({
	getInitialState:function(){
		return{
			ListState: "invisable",
			normalPlayer: "",
			excelPlayer: "invisable",
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
	directPlayer: function(item){
		this.props.setPlayer(item);
		this.props.setPlayerNum(item.length);
	},
	handleListstate : function(){
		var state = (this.state.ListState == "invisable") ? "" : "invisable";
		this.setState({
			ListState: state
		});
	},
	changeInput: function(){
		var normalPlayer = (this.state.normalPlayer == "") ? "invisable" : "";
		var excelPlayer = (this.state.excelPlayer == "") ? "invisable" : "";
		this.setState({
			normalPlayer: normalPlayer,
			excelPlayer:  excelPlayer
		});
	},
	startDrawing: function(){
		if(this.props.PlayerList.length == 0){
			alert("Number of Player is 0 !!");
		}
		else{
			if(this.props.data.length == 0){
					alert("Number of Gift is 0 !!");
			}
			else{
				this.props.RandomBoxState("finalPopout");
			}
		}
	},
	render: function(){
		return(
			<div>
				<h2 className="ui blue header huge dividing">
					<div className="content">
					<i className="users icon"></i>Players</div>
				</h2>
				<div className="ui two column grid">
					<div className="column">
						<div className={this.state.normalPlayer}>
							<button type="button" className="ui icon button" onClick={this.changeInput}>
								Paste from Excel <i className="file excel outline icon"></i>
							</button>
						</div>
						<div className={this.state.excelPlayer}>
							<button type="button" className="ui icon button" onClick={this.changeInput}>
								Back to normal mode <i className="undo icon"> </i>
							</button>
						</div>
					</div>
					<div className="column">
					<div className="ui item right floated">
						<button type="button" className="ui blue icon button" onClick={this.startDrawing}>
							Start Drawing <i className="chevron circle right icon"></i>
						</button>
					</div>
					</div>
				</div>
				<p> </p>
				<div className={this.state.normalPlayer}>
					<div className="ui blue header" >Number of player:</div>
					<div className="ui left icon input" >
						<input type="text" onBlur={this.handlePlayerChange} placeholder="Number of Player" defaultValue={this.props.PlayerNumber} />
						<i className="users blue icon"></i>
					</div>
					<p> {this.props.PlayerNumber} </p>
					<div className="ui two column grid">
						<div className="column">
							<div className="ui item">
											<button type="button" className="ui icon button" onClick={this.handleListstate}>
												Edit PlayerName <i className="edit icon"></i>
											</button>
							</div>
						</div>
						<div className="column">
						</div>
					</div>
					<div className={this.state.ListState}>
						<PlayerList mydata={this.props.PlayerList} setPlayer={this.handlePlayer}  />
					</div>

				</div>
				<div className={this.state.excelPlayer}>
					<PlayerExcel directPlayer={this.directPlayer} PlayerList={this.props.PlayerList} />
				</div>
			</div>

		);
	}
});

var PlayerExcel = React.createClass({
	getInitialState: function(){
		return{
			List: []
		}
	},
	handleText: function(e){
		var item = e.target.value;
		var List = item.split('\n');
		var NewList = convertPlayer(List);
		this.setState({
			List: NewList
		})
	},
	submitList: function(){
		if(this.state.List.length == 0 ){
			alert("No Content Submit !!");
		}
		else{
			this.props.directPlayer(this.state.List);
		}
	},
	render: function(){
		var PlayerList = this.props.PlayerList;
		var List = PlayerList.map(function(item){
			return(
				<div className="ui">
					<div className="ui"> {item.id} - {item.PlayerName} </div>
				</div>	
			      );
		});
		return(
			<div>
				<form className="ui reply form">
		   				<div className="field">
		   				   <textarea onBlur={this.handleText} placeholder="Paste a List from Excel" ></textarea>
		   				</div>
		    			<div className="ui blue labeled submit icon button" onClick={this.submitList} >
		   				   <i className="icon edit"></i> Add Player
		  				</div>
		  		</form>	
				<div className="ui header dividing">
					<div className="content">Plays:</div>
				</div>
				<div className="ui middle aligned divided list">
					{ List }
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
		console.log("newPlayer");
		console.log(newPlayer);
		return;

	},
	render: function(){
		 	return(
		 		<div className="ui item">
						<div className="ui item"><h5>No : {this.props.nodeId}</h5></div>
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
	handleRestart: function(){
		this.props.handleRestart("invisable");
		this.setState({
			current: 0,
			RandomList:[],
			FinalList:[],
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
		 		<div className="ui item three column grid" >
			 		<div className="column" >
			 			<h3> {GiftList[i].GiftName} </h3>
			 		</div>
		 			<div className="column" >
		 				<h3> {item.id} </h3>
		 			</div>
		 			<div className="column" >
		 				<h3> {item.PlayerName} </h3>
		 			</div>
		 		</div>

			);
		});
		return(	
			<div>
					<div className="ui two column grid">
						<div className="column"> <p> </p></div>
						<div className="column">
								<button className="ui basic right floated button" onClick={this.handleRestart}>
									<i className="remove icon"></i>
								</button>
						</div>
					</div>
					<div className="ui two column stackable grid">
						<div className="column">
							<RandomBtn RandomList={this.state.RandomList} GiftList={GiftList} FinalList={this.state.FinalList} current={this.state.current} BackDoorList={this.props.BackDoorList} PlayerList={this.props.PlayerList}  setCurrent={this.handleCurrent} setFinal={this.handleFinal} setRandom={this.handleRandom} />
						</div>
						<div className="column">
							<h1 className="ui blue header huge center aligned dividing"> Results </h1>
							<br />
							<div className="ui middle aligned divided list"> {listItem} </div>
						</div>
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
			finalAnimate: "finalAnimate elementFadeOut",
			displayState: "invisable"
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
					finalAnimate: finalAnimate,
					displayState: ""
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
			this.setState({
				AbtnState: "invisable",
				btnState: "invisable",
				displayState: "invisable"
			});
		}
		else{
			this.props.setCurrent(current+1);
			this.setState({
				btnState: "invisable",
				displayState: "invisable"
			});
		}
		

	},
	render: function(){
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
					<h1 className="ui header huge center aligned dividing">
						<div className={this.state.displayState}>
							<div className="ui two column grid">
								<div className="column">
								 {item.id}
								 </div>
								 <div className="column">
								 	{item.PlayerName}
								 </div>
							</div>
						</div>
					 </h1>

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
