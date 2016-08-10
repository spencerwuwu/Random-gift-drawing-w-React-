var TodoBox = React.createClass({
	getInitialState: function () {
		return {
			data: [
				{"id":"00001","task":"Din Din"},
				{"id":"00002","task":"Don Don"},
        		{"id":"00003","task":"Din Don Din Don"} ],

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
	render: function() {

		var requireNumber = this.state.data.length;
		return (
			<div className="well">
				<h1 className="vert-offset-top-0">Gifts:</h1>
				<TodoList data={this.state.data} removeNode={this.handleNodeRemoval} />
				<TodoForm onTaskSubmit={this.handleSubmit} />
				<p> {requireNumber} </p>
				<DisplayNum require={requireNumber} data={this.state.data} />
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
			<ul className="list-group">
				{listNodes}
			</ul>
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
		var classes = 'list-group-item clearfix';
		return (
			<li className={classes}>
				{this.props.task}
				<div className="pull-right" role="group">
					<button type="button" className="btn btn-xs btn-danger img-circle" onClick={this.removeNode}>&#xff38;</button>
				</div>
			</li>
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
			<div className="commentForm vert-offset-top-2">
				<hr />
				<div className="clearfix">
					<form className="todoForm form-horizontal" onSubmit={this.doSubmit}>
						<div className="form-group">
							<label htmlFor="task" className="col-md-2 control-label">Next Gifts</label>
							<div className="col-md-10">
								<input type="text" id="task" ref="task" className="form-control" placeholder="New Gifts" />
							</div>
						</div>
						<div className="row">
							<div className="col-md-10 col-md-offset-2 text-right">
								<input type="submit" value="Save Item" className="btn btn-primary" />
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
});


var DisplayNum = React.createClass({
	getInitialState: function() {
		return { 
			maxNumber : 10,
			requireNumber : 4,};
	},
	handleMaxChange : function(event){
		var newNumber = event.target.value;
		this.setState({maxNumber : newNumber});
	},
	render : function() {
		var requireNumber = this.props.require;
		return(
			<div>
				<input type="text" onBlur={this.handleMaxChange} />
				<p>number of people: {this.state.maxNumber } </p>
				<p>requirement of people: {requireNumber } </p>
				<RandomNum maxNumber={this.state.maxNumber } requireNumber={requireNumber} data={this.props.data} />
			</div>
		);
	}
});

var RandomNum = React.createClass({
	getInitialState: function() {
		return { 
			maxNumber : 10,
			requireNumber: 4 };
	},
	render : function() {
		var numberR = doRand(this.props.maxNumber ,this.props.requireNumber);
		var dataList = this.props.data;
		var numberRList = numberR.map(function(numberR, i){
			return( <div className="row"> 
						<div className="col-xs-6"> {numberR} </div>
					 	<div className="col-xs-6"> {dataList[i].task} </div>
					 </div>
			);
		});
		return(
			<div> random: {numberRList} </div>
		);
	}
});




React.render(
	<TodoBox />,
	document.getElementById('todo')
);