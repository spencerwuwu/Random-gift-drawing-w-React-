var TodoBox = React.createClass({
	getInitialState: function () {
		return {
			data: [
				{"id":"00001","task":"Gift1"},
				{"id":"00002","task":"Gift2"},
        		{"id":"00003","task":"Gift3"} ],
        	leftColumn: "" ,
        	rightColumn: "behind"
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
	handleSubmit: function (task) {
		var data = this.state.data;
		var id = this.generateId().toString();
		data = data.concat([{id, task}]);
		this.setState({data});
	},
	drawBegin: function(){
		this.setState({
			leftColumn: "behind",
			rightColumn: ""
		});
	},
	render: function() {

		var requireNumber = this.state.data.length;
		return (
			<div className="ui two column stackable grid" >
				<div className="column" >
					<div className={this.state.leftColumn}>
						<h2 className="ui header huge dividing">
							<div className="content">
							<i className="gift icon"></i>Gifts</div>
						</h2>
						<TodoList  data={this.state.data} removeNode={this.handleNodeRemoval} />
						<TodoForm onTaskSubmit={this.handleSubmit} />
						<p> </p>
						<div className="ui content">
							<button type="button" className="ui icon button " onClick={this.drawBegin}>
							Next
							</button>
						</div>
					</div>
				</div>

				<div className="ui vertical divider"></div>

				<div className="column" >
					<div className={this.state.rightColumn}>
						<DisplayNum  require={requireNumber} data={this.state.data} />
					</div>
				</div>
			</div>
		);
	}
});

var TodoList = React.createClass({
	removeNode: function (nodeId) {
		this.props.removeNode(nodeId);
		return;
	},
	render: function() {
		var listNodes = this.props.data.map(function (listItem) {
			return (
				<TodoItem key={listItem.id} nodeId={listItem.id} task={listItem.task} removeNode={this.removeNode} />
			);
		},this);
		return (
			<div className="ui middle aligned divided list" >
				{listNodes}
			</div>
		);
	}
});

var TodoItem = React.createClass({
	removeNode: function (e) {
		e.preventDefault();
		this.props.removeNode(this.props.nodeId);
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
				</div>
				<div className="ui item"> {this.props.task} </div>
			</div>
		);
	}
});

var TodoForm = React.createClass({
	doSubmit: function (e) {
		e.preventDefault();
		var task = React.findDOMNode(this.refs.task).value.trim();
		if (!task) {
			return;
		}
		this.props.onTaskSubmit(task);
		React.findDOMNode(this.refs.task).value = '';
		return;
	},
	render: function() {
		return (
					<form onSubmit={this.doSubmit} className="ui item container" >
							<div htmlFor="task" className="ui header dividing" >Add New Gift</div>
							<div className="ui small icon input" >
								<input type="text" id="task" ref="task" className="" placeholder="New Gifts" />
  								<i className="plus icon"></i>
							</div>
					</form>
		);
	}
});


var DisplayNum = React.createClass({
	getInitialState: function() {
		return { 
			maxNumber : 10,
			requireNumber : 4,
        	leftColumn: "" ,
        	rightColumn: "behind"};
	},
	handleMaxChange : function(event){
		var newNumber = event.target.value;
		this.setState({maxNumber : newNumber});
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
						<input type="text" onBlur={this.handleMaxChange} placeholder="input number, default 10" />
						<i className="users icon"></i>
					</div>
					<p>number of people: {this.state.maxNumber } </p>
						<p> </p>
						<div className="ui content">
							<button type="button" className="ui icon button " onClick={this.drawBegin}>
							Finish setting
							</button>
						</div>
					</div>
				<div className={this.state.rightColumn}>	
					<RandomNum maxNumber={this.state.maxNumber } requireNumber={requireNumber} data={this.props.data} />
				</div>
			</div>
		);
	}
});

var RandomNum = React.createClass({
	getInitialState: function() {
		return { 
			current : 0,
			numberR : doRand(this.props.maxNumber),
			result : [],
			startClass : "",
			btnClass : "invisable ",
			currentGift: 0
			 };
	},
	drawAgain: function(){
		if(this.state.current >= this.props.maxNumber-1){
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
			numberR : doRand(this.props.maxNumber),
			result : [],
			currentGift: 0 });
	},
	drawStart:function() {

		var temp1 = this.state.startClass;
		var temp2 = this.state.btnClass;
		this.setState({
			numberR : doRand(this.props.maxNumber),
			startClass : temp2,
			btnClass : temp1
		})
	},
	render : function() {
		var dataList = this.props.data;
		var resultList = this.state.result;
		var dataPrintList = dataList.map(function(dataList, i){
			return( 
						<div className="ui two column grid item"> 
							<div className="ui item column">
								<div className="content"> {dataList.task} </div> 
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
				<div className="ui raised segment">
					<h2 className="ui header ">{dataList[this.state.currentGift].task}</h2>
					<h1 className="ui header huge center aligned dividing"> {this.state.numberR[this.state.current]} </h1>

					<button type="button" className="ui icon button" onClick={this.drawAgain}>
						Again
					</button>
					<button type="button" className="ui icon button" onClick={this.drawNext}>
						Next
					</button>
					<button type="button" className="ui icon button" onClick={this.drawReset}>
						Reset
					</button>
				</div>
			</div>

			<h2 className="ui header"> Results </h2>

			<div className="ui middle aligned divided list">
				{dataPrintList}

			</div>
			</div>
		);
	}
});



React.render(
	<TodoBox />,
	document.getElementById('todo')
);