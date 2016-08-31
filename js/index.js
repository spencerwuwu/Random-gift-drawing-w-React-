"use strict";

var GiftBox = React.createClass({
	displayName: "GiftBox",

	getInitialState: function getInitialState() {
		return {
			data: [{ "id": "00001", "GiftName": "Gift1", "BackDoor": -1 }, { "id": "00002", "GiftName": "Gift2", "BackDoor": -1 }, { "id": "00003", "GiftName": "Gift3", "BackDoor": -1 }],
			backDoorList: [],
			PlayerNumber: 0,
			PlayerList: getPlayerList(0),
			leftColumn: "",
			rightColumn: "",
			BDstate: "invisable",
			RandomBoxState: "invisable",
			normalPlayer: "",
			excelPlayer: "invisable"
		};
	},
	generateId: function generateId() {
		return Math.floor(Math.random() * 90000) + 10000;
	},
	handleNodeRemoval: function handleNodeRemoval(nodeId) {
		var data = this.state.data;
		data = data.filter(function (el) {
			return el.id !== nodeId;
		});
		this.setState({ data: data });
		return;
	},
	handleSubmit: function handleSubmit(GiftName) {
		var data = this.state.data;
		var id = this.generateId().toString();
		var num = -1;
		data = data.concat([{ id: id, GiftName: GiftName, num: num }]);
		this.setState({ data: data });
	},
	directSubmit: function directSubmit(item) {
		this.setState({ data: item });
	},
	handleAddBackdoor: function handleAddBackdoor(backDoorData) {
		var targetId = backDoorData.id;
		var backDoorNum = backDoorData.number;
		var index = this.state.data.findIndex(function (data) {
			return data.id == targetId;
		});
		var data = this.state.data;
		data[index].BackDoor = backDoorNum;
		var backDoorList = data.map(function (item) {
			return item.BackDoor;
		});
		this.setState({
			data: data,
			backDoorList: backDoorList
		});
	},
	changeInput: function changeInput() {
		var normalPlayer = this.state.normalPlayer == "" ? "invisable" : "";
		var excelPlayer = this.state.excelPlayer == "" ? "invisable" : "";
		this.setState({
			normalPlayer: normalPlayer,
			excelPlayer: excelPlayer
		});
	},
	handlePlayerList: function handlePlayerList(newPlayerList) {
		this.setState({
			PlayerList: newPlayerList
		});
	},
	handlePlayerNum: function handlePlayerNum(newNumber) {
		this.setState({
			PlayerNumber: newNumber
		});
	},
	drawBegin: function drawBegin() {
		this.setState({
			leftColumn: "behind",
			rightColumn: ""
		});
	},
	activateBD: function activateBD() {
		var BDstate = this.state.BDstate == "invisable" ? "" : "invisable";
		this.setState({
			BDstate: BDstate
		});
	},
	setRandomBoxState: function setRandomBoxState(item) {
		this.setState({
			RandomBoxState: item
		});
	},
	handleRestart: function handleRestart(item) {
		this.setState({
			RandomBoxState: item
		});
	},
	render: function render() {
		console.log("Gift List:");
		console.log(this.state.data.map(function (item) {
			return item;
		}));
		console.log("dataList");
		console.log(this.state.data);
		var requireNumber = this.state.data.length;
		return React.createElement(
			"div",
			null,
			React.createElement(
				"div",
				{ className: "ui two column stackable grid" },
				React.createElement(
					"div",
					{ className: "column" },
					React.createElement(
						"div",
						{ className: this.state.leftColumn },
						React.createElement(
							"h2",
							{ className: "ui blue header huge dividing" },
							React.createElement(
								"div",
								{ className: "content" },
								React.createElement("i", { className: "gift icon", onClick: this.activateBD }),
								"Gifts"
							)
						),
						React.createElement(
							"div",
							null,
							React.createElement(
								"div",
								{ className: this.state.normalPlayer },
								React.createElement(
									"button",
									{ type: "button", className: "ui icon button", onClick: this.changeInput },
									"Paste from Excel ",
									React.createElement("i", { className: "file excel outline icon" })
								)
							),
							React.createElement(
								"div",
								{ className: this.state.excelPlayer },
								React.createElement(
									"button",
									{ type: "button", className: "ui icon button", onClick: this.changeInput },
									"Back to normal mode ",
									React.createElement(
										"i",
										{ className: "undo icon" },
										" "
									)
								)
							)
						),
						React.createElement(
							"p",
							null,
							" "
						),
						React.createElement(
							"div",
							{ className: this.state.normalPlayer },
							React.createElement(GiftForm, { onGiftNameSubmit: this.handleSubmit }),
							React.createElement(
								"p",
								null,
								" "
							),
							React.createElement(
								"div",
								{ className: "notclear" },
								" ",
								React.createElement(
									"p",
									null,
									" Press Enter to add new gift to list"
								),
								" "
							)
						),
						React.createElement(
							"div",
							{ className: this.state.excelPlayer },
							React.createElement(GiftExcel, { directGiftNameSubmit: this.directSubmit })
						),
						React.createElement(
							"p",
							null,
							" "
						),
						React.createElement("div", { className: "ui content" }),
						React.createElement("p", null),
						React.createElement(
							"div",
							{ className: "ui blue dividing header" },
							"Gift List"
						),
						React.createElement(GiftList, { data: this.state.data, normalPlayer: this.state.normalPlayer, removeNode: this.handleNodeRemoval, addBackdoor: this.handleAddBackdoor, BDstate: this.state.BDstate })
					)
				),
				React.createElement(
					"div",
					{ className: "column" },
					React.createElement(
						"div",
						{ className: this.state.rightColumn },
						React.createElement(PlayerBox, { require: requireNumber, data: this.state.data, RandomBoxState: this.setRandomBoxState, PlayerList: this.state.PlayerList, setPlayer: this.handlePlayerList, setPlayerNum: this.handlePlayerNum })
					)
				)
			),
			React.createElement(
				"div",
				{ className: this.state.RandomBoxState },
				React.createElement(
					"div",
					{ className: "ui raised  container segment" },
					React.createElement(RandomBox, { GiftList: this.state.data, handleRestart: this.handleRestart, PlayerList: this.state.PlayerList, PlayerNumber: this.state.PlayerNumber, BackDoorList: this.state.backDoorList })
				)
			)
		);
	}
});

var GiftList = React.createClass({
	displayName: "GiftList",

	removeNode: function removeNode(nodeId) {
		this.props.removeNode(nodeId);
		return;
	},
	addBackdoor: function addBackdoor(backDoorData) {

		this.props.addBackdoor(backDoorData);
		return;
	},
	render: function render() {
		var listNodes = this.props.data.map(function (listItem) {
			return React.createElement(GiftItem, { normalPlayer: this.props.normalPlayer, key: listItem.id, nodeId: listItem.id, GiftName: listItem.GiftName, removeNode: this.removeNode, addBackdoor: this.addBackdoor, BDstate: this.props.BDstate });
		}, this);
		return React.createElement(
			"div",
			{ className: "ui middle aligned list" },
			listNodes
		);
	}
});

var GiftItem = React.createClass({
	displayName: "GiftItem",

	removeNode: function removeNode(e) {
		e.preventDefault();
		this.props.removeNode(this.props.nodeId);
		return;
	},
	addBackdoor: function addBackdoor(event) {
		var backDoorNum = event.target.value;
		var backDoorData = { "id": this.props.nodeId, "number": backDoorNum };
		this.props.addBackdoor(backDoorData);
		console.log(backDoorData);
		return;
	},
	updateClass: function updateClass(event) {},
	render: function render() {
		return React.createElement(
			"div",
			{ className: "ui item" },
			React.createElement(
				"div",
				{ role: "group", className: "right floated content" },
				React.createElement(
					"div",
					{ className: this.props.normalPlayer },
					React.createElement(
						"button",
						{ type: "button", className: "ui icon button ", onClick: this.removeNode },
						React.createElement("i", { className: "remove icon" })
					)
				),
				React.createElement(
					"div",
					{ className: this.props.BDstate },
					React.createElement(
						"div",
						{ className: "ui transparent input" },
						React.createElement("input", { type: "text", onBlur: this.addBackdoor, placeholder: "Player no." })
					)
				)
			),
			React.createElement(
				"div",
				{ className: "ui item" },
				" ",
				this.props.GiftName,
				" "
			)
		);
	}
});

var GiftForm = React.createClass({
	displayName: "GiftForm",

	doSubmit: function doSubmit(e) {
		e.preventDefault();
		var GiftName = React.findDOMNode(this.refs.GiftName).value.trim();
		if (!GiftName) {
			return;
		}
		this.props.onGiftNameSubmit(GiftName);
		React.findDOMNode(this.refs.GiftName).value = '';
		return;
	},
	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"form",
				{ onSubmit: this.doSubmit, className: "ui item container" },
				React.createElement(
					"div",
					{ htmlFor: "GiftName", className: "ui blue header" },
					"Add New Gift:"
				),
				React.createElement(
					"div",
					{ className: "ui small icon input" },
					React.createElement("input", { type: "text", id: "GiftName", ref: "GiftName", className: "", placeholder: "New Gifts" }),
					React.createElement("i", { className: "plus blue icon" })
				)
			)
		);
	}
});

var GiftExcel = React.createClass({
	displayName: "GiftExcel",

	getInitialState: function getInitialState() {
		return {
			List: []
		};
	},
	handleText: function handleText(event) {
		var input = event.target.value;
		var List = input.split('\n');
		console.log(List);
		var NewList = convertGift(List);
		this.setState({
			List: NewList
		});
	},
	submitList: function submitList() {
		if (this.state.List.length == 0) {
			alert("No Content submit!");
		} else {
			this.props.directGiftNameSubmit(this.state.List);
		}
	},
	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"form",
				{ className: "ui reply form" },
				React.createElement(
					"div",
					{ className: "field" },
					React.createElement("textarea", { onBlur: this.handleText, placeholder: "Paste a List from Excel" })
				),
				React.createElement(
					"div",
					{ className: "ui blue labeled submit icon button", onClick: this.submitList },
					React.createElement("i", { className: "icon edit" }),
					" Apply List"
				)
			)
		);
	}
});

var PlayerBox = React.createClass({
	displayName: "PlayerBox",

	getInitialState: function getInitialState() {
		return {
			ListState: "invisable",
			ListState2: "",
			normalPlayer: "",
			excelPlayer: "invisable"
		};
	},
	handlePlayerChange: function handlePlayerChange(event) {
		var newNumber = event.target.value;
		var newPlayerList = getPlayerList(newNumber);
		this.props.setPlayer(newPlayerList);
		this.props.setPlayerNum(newNumber);
	},
	handlePlayer: function handlePlayer(newPlayer) {
		var targetId = newPlayer.id;
		var targetName = newPlayer.PlayerName;
		var index = this.props.PlayerList.findIndex(function (data) {
			return data.id == targetId;
		});
		var PlayerList = this.props.PlayerList;
		PlayerList[index].PlayerName = targetName;
		this.props.setPlayer = PlayerList;
	},
	directPlayer: function directPlayer(item) {
		this.props.setPlayer(item);
		this.props.setPlayerNum(item.length);
	},
	handleListstate: function handleListstate() {
		var state = this.state.ListState == "invisable" ? "" : "invisable";
		var state2 = this.state.ListState2 == "invisable" ? "" : "invisable";
		this.setState({
			ListState: state,
			ListState2: state2
		});
	},
	changeInput: function changeInput() {
		var normalPlayer = this.state.normalPlayer == "" ? "invisable" : "";
		var excelPlayer = this.state.excelPlayer == "" ? "invisable" : "";
		this.setState({
			normalPlayer: normalPlayer,
			excelPlayer: excelPlayer
		});
	},
	startDrawing: function startDrawing() {
		if (this.props.PlayerList.length == 0) {
			alert("Number of Player is 0 !!");
		} else {
			if (this.props.data.length == 0) {
				alert("Number of Gift is 0 !!");
			} else {
				this.props.RandomBoxState("finalPopout");
			}
		}
	},
	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"h2",
				{ className: "ui blue header huge dividing" },
				React.createElement(
					"div",
					{ className: "content" },
					React.createElement("i", { className: "users icon" }),
					"Players"
				)
			),
			React.createElement(
				"div",
				{ className: "ui two column grid" },
				React.createElement(
					"div",
					{ className: "column" },
					React.createElement(
						"div",
						{ className: this.state.normalPlayer },
						React.createElement(
							"button",
							{ type: "button", className: "ui icon button", onClick: this.changeInput },
							"Paste from Excel ",
							React.createElement("i", { className: "file excel outline icon" })
						)
					),
					React.createElement(
						"div",
						{ className: this.state.excelPlayer },
						React.createElement(
							"button",
							{ type: "button", className: "ui icon button", onClick: this.changeInput },
							"Back to normal mode ",
							React.createElement(
								"i",
								{ className: "undo icon" },
								" "
							)
						)
					)
				),
				React.createElement(
					"div",
					{ className: "column" },
					React.createElement(
						"div",
						{ className: "ui item right floated" },
						React.createElement(
							"button",
							{ type: "button", className: "ui blue icon button", onClick: this.startDrawing },
							"Start Drawing ",
							React.createElement("i", { className: "chevron circle right icon" })
						)
					)
				)
			),
			React.createElement(
				"p",
				null,
				" "
			),
			React.createElement(
				"div",
				{ className: this.state.normalPlayer },
				React.createElement(
					"div",
					{ className: "ui blue header" },
					"Number of player:"
				),
				React.createElement(
					"div",
					{ className: "ui left icon input" },
					React.createElement("input", { type: "text", onBlur: this.handlePlayerChange, placeholder: "Number of Player", defaultValue: this.props.PlayerNumber }),
					React.createElement("i", { className: "users blue icon" })
				),
				React.createElement(
					"p",
					null,
					" ",
					this.props.PlayerNumber,
					" "
				),
				React.createElement(
					"div",
					{ className: "ui two column grid" },
					React.createElement(
						"div",
						{ className: "column" },
						React.createElement(
							"div",
							{ className: "ui item" },
							React.createElement(
								"button",
								{ type: "button", className: "ui icon button", onClick: this.handleListstate },
								"Edit PlayerName ",
								React.createElement("i", { className: "edit icon" })
							)
						)
					),
					React.createElement("div", { className: "column" })
				)
			),
			React.createElement(
				"div",
				{ className: this.state.excelPlayer },
				React.createElement(PlayerExcel, { directPlayer: this.directPlayer, PlayerList: this.props.PlayerList })
			),
			React.createElement("p", null),
			React.createElement(
				"div",
				{ className: "ui header dividing" },
				React.createElement(
					"div",
					{ className: "content" },
					"Players:"
				)
			),
			React.createElement(
				"div",
				{ className: this.state.ListState },
				React.createElement(PlayerList, { mydata: this.props.PlayerList, setPlayer: this.handlePlayer })
			),
			React.createElement(
				"div",
				{ className: this.state.ListState2 },
				React.createElement(DisplayName, { PlayerList: this.props.PlayerList })
			)
		);
	}
});

var PlayerExcel = React.createClass({
	displayName: "PlayerExcel",

	getInitialState: function getInitialState() {
		return {
			List: []
		};
	},
	handleText: function handleText(e) {
		var item = e.target.value;
		var List = item.split('\n');
		var NewList = convertPlayer(List);
		this.setState({
			List: NewList
		});
	},
	submitList: function submitList() {
		if (this.state.List.length == 0) {
			alert("No Content Submit !!");
		} else {
			this.props.directPlayer(this.state.List);
		}
	},
	render: function render() {
		return React.createElement(
			"div",
			null,
			React.createElement(
				"form",
				{ className: "ui reply form" },
				React.createElement(
					"div",
					{ className: "field" },
					React.createElement("textarea", { onBlur: this.handleText, placeholder: "Paste a List from Excel" })
				),
				React.createElement(
					"div",
					{ className: "ui blue labeled submit icon button", onClick: this.submitList },
					React.createElement("i", { className: "icon edit" }),
					" Add Player"
				)
			)
		);
	}
});
var DisplayName = React.createClass({
	displayName: "DisplayName",

	render: function render() {
		var PlayerList = this.props.PlayerList;
		var List = PlayerList.map(function (item) {
			return React.createElement(
				"div",
				{ className: "ui" },
				React.createElement(
					"div",
					{ className: "ui" },
					" ",
					item.id,
					".  ",
					item.PlayerName,
					" "
				)
			);
		});
		return React.createElement(
			"div",
			null,
			React.createElement(
				"div",
				{ className: "ui middle aligned divided list" },
				List
			)
		);
	}

});

var PlayerList = React.createClass({
	displayName: "PlayerList",

	handlePlayer: function handlePlayer(newPlayer) {

		this.props.setPlayer(newPlayer);
		return;
	},
	render: function render() {
		var listNodes = this.props.mydata.map(function (player) {
			return React.createElement(Player, { key: player.id, nodeId: player.id, playerName: player.PlayerName, handlePlayer: this.handlePlayer });
		}, this);
		return React.createElement(
			"div",
			{ className: "ui middle aligned list" },
			listNodes
		);
	}
});

var Player = React.createClass({
	displayName: "Player",

	handlePlayer: function handlePlayer(event) {
		var newPlayerName = event.target.value;
		var newPlayer = { "id": this.props.nodeId, "PlayerName": newPlayerName };
		this.props.handlePlayer(newPlayer);
		console.log("newPlayer");
		console.log(newPlayer);
		return;
	},
	render: function render() {
		return React.createElement(
			"div",
			{ className: "ui item" },
			React.createElement(
				"div",
				{ className: "ui item" },
				React.createElement(
					"h5",
					null,
					"No : ",
					this.props.nodeId
				)
			),
			React.createElement(
				"div",
				{ className: "ui left icon input" },
				React.createElement("input", { type: "text", onBlur: this.handlePlayer, placeholder: "name", defaultValue: this.props.playerName }),
				React.createElement("i", { className: "user icon" })
			)
		);
	}
});

var RandomBox = React.createClass({
	displayName: "RandomBox",

	getInitialState: function getInitialState() {
		return {
			RandomList: [],
			FinalList: [],
			current: 0
		};
	},
	handleFinal: function handleFinal(item) {
		this.setState({
			FinalList: item
		});
	},
	handleRandom: function handleRandom(item) {
		this.setState({
			RandomList: item
		});
	},
	handleCurrent: function handleCurrent(item) {
		this.setState({
			current: item
		});
	},
	handleRestart: function handleRestart() {
		this.props.handleRestart("invisable");
		this.setState({
			current: 0,
			RandomList: [],
			FinalList: []
		});
	},
	render: function render() {
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
		var listItem = FinalList.map(function (item, i) {
			return React.createElement(
				"div",
				{ className: "ui item three column grid" },
				React.createElement(
					"div",
					{ className: "column" },
					React.createElement(
						"h3",
						null,
						" ",
						GiftList[i].GiftName,
						" "
					)
				),
				React.createElement(
					"div",
					{ className: "column" },
					React.createElement(
						"h3",
						null,
						" ",
						item.id,
						" "
					)
				),
				React.createElement(
					"div",
					{ className: "column" },
					React.createElement(
						"h3",
						null,
						" ",
						item.PlayerName,
						" "
					)
				)
			);
		});
		return React.createElement(
			"div",
			null,
			React.createElement(
				"div",
				{ className: "ui two column grid" },
				React.createElement(
					"div",
					{ className: "column" },
					" ",
					React.createElement(
						"p",
						null,
						" "
					)
				),
				React.createElement(
					"div",
					{ className: "column" },
					React.createElement(
						"button",
						{ className: "ui basic right floated button", onClick: this.handleRestart },
						React.createElement("i", { className: "remove icon" })
					)
				)
			),
			React.createElement(
				"div",
				{ className: "ui two column stackable grid" },
				React.createElement(
					"div",
					{ className: "column" },
					React.createElement(RandomBtn, { RandomList: this.state.RandomList, GiftList: GiftList, FinalList: this.state.FinalList, current: this.state.current, BackDoorList: this.props.BackDoorList, PlayerList: this.props.PlayerList, setCurrent: this.handleCurrent, setFinal: this.handleFinal, setRandom: this.handleRandom })
				),
				React.createElement(
					"div",
					{ className: "column" },
					React.createElement(
						"h1",
						{ className: "ui blue header huge center aligned dividing" },
						" Results "
					),
					React.createElement("br", null),
					React.createElement(
						"div",
						{ className: "ui middle aligned divided list" },
						" ",
						listItem,
						" "
					)
				)
			)
		);
	}
});

var RandomBtn = React.createClass({
	displayName: "RandomBtn",

	getInitialState: function getInitialState() {
		return {
			btnState: "invisable",
			AbtnState: "",
			temp: 0,
			item: {},
			finalAnimate: "finalAnimate elementFadeOut",
			displayState: "invisable"
		};
	},
	drawAgain: function drawAgain() {
		var newRandom = doRand(this.props.PlayerList.length, this.props.current, this.props.BackDoorList, this.props.RandomList);
		this.props.setRandom(newRandom.finalList);
		var index = newRandom.num - 1;
		var item = this.props.PlayerList[index];
		var finalAnimate = this.state.finalAnimate == "finalAnimate elementFadeOut" ? "finalAnimate elementFadeOut1" : "finalAnimate elementFadeOut";
		this.setState({
			btnState: "",
			temp: newRandom.num,
			item: item,
			finalAnimate: finalAnimate,
			displayState: ""
		});
	},
	drawNext: function drawNext() {
		var current = this.props.current;
		var FinalList = this.props.FinalList;
		var index = this.state.temp - 1;
		console.log("this.props.PlayerList[index]");
		console.log(this.props.PlayerList[index]);
		var item = this.props.PlayerList[index];
		FinalList.push(item);
		this.props.setFinal(FinalList);
		if (current == this.props.GiftList.length - 1) {
			this.setState({
				AbtnState: "invisable",
				btnState: "invisable",
				displayState: "invisable"
			});
		} else {
			this.props.setCurrent(current + 1);
			this.setState({
				btnState: "invisable",
				displayState: "invisable"
			});
		}
	},
	render: function render() {
		var item = this.state.item;
		return React.createElement(
			"div",
			null,
			React.createElement(
				"div",
				{ className: "ui raised container segment" },
				React.createElement("br", null),
				React.createElement(
					"h1",
					{ className: "ui blue header " },
					this.props.GiftList[this.props.current].GiftName
				),
				React.createElement("br", null),
				React.createElement(
					"div",
					{ className: this.state.finalAnimate },
					React.createElement("div", { className: "spinner spinner-1" })
				),
				React.createElement(
					"h1",
					{ className: "ui header huge center aligned dividing" },
					React.createElement(
						"div",
						{ className: this.state.displayState },
						React.createElement(
							"div",
							{ className: "ui two column grid" },
							React.createElement(
								"div",
								{ className: "column" },
								item.id
							),
							React.createElement(
								"div",
								{ className: "column" },
								item.PlayerName
							)
						)
					)
				),
				React.createElement(
					"div",
					{ className: "ui two column grid" },
					React.createElement(
						"div",
						{ className: "column" },
						React.createElement(
							"div",
							{ className: this.state.AbtnState },
							React.createElement(
								"button",
								{ type: "button", className: "ui icon button right floated", onClick: this.drawAgain },
								"Draw!"
							)
						)
					),
					React.createElement(
						"div",
						{ className: "column" },
						React.createElement(
							"div",
							{ className: this.state.btnState },
							React.createElement(
								"button",
								{ type: "button", className: " ui icon button", onClick: this.drawNext },
								"Next"
							)
						)
					)
				)
			)
		);
	}
});

React.render(React.createElement(GiftBox, null), document.getElementById('todo'));