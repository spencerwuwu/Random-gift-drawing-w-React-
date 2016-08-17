var GiftBox = React.createClass({
	getInitialState: function (){
		return{
			data: [
				{"id":"00001","name":"Gift1", "backDoor":-1},
				{"id":"00002","name":"Gift2", "backDoor":-1},
        		{"id":"00003","name":"Gift3", "backDoor":-1}],
        	backDoor:[]

		}		
	},
	generateId: function(){
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
	handleSubmit: function (gift) {
		var data = this.state.data;
		var id = this.generateId().toString();
		var num = -1;
		data = data.concat([{id, gift, num}]);
		this.setState({data});
	},
	render: function() {

		var requireNumber = this.state.data.length;
		return (
			<div className="ui stackable grid" >
					<div >
						<h2 className="ui header huge dividing">
							<div className="content">
							<i className="gift icon"></i>Gifts</div>
						</h2>
						<GiftList data={this.state.data} removeNode={this.handleNodeRemoval} />
						<GiftForm onTaskSubmit={this.handleSubmit} />
						<p> </p>
						<div className="notclear"> <p> Press Enter to add new gift to list</p> </div>
						<p> </p>
						<div className="ui content">
							<button type="button" className="ui icon blue button " onClick={this.drawBegin}>
							Next
							</button>
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
	render: function() {
		var listNodes = this.props.data.map(function (listItem) {
			return (
				<GiftItem key={listItem.id} nodeId={listItem.id} name={listItem.name} removeNode={this.removeNode} />
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
				<div className="ui item"> {this.props.name} </div>
			</div>
		);
	}
});

var GiftForm = React.createClass({
	doSubmit: function (e) {
		e.preventDefault();
		var name = React.findDOMNode(this.refs.name).value.trim();
		if (!name) {
			return;
		}
		this.props.onTaskSubmit(name);
		React.findDOMNode(this.refs.name).value = '';
		return;
	},
	render: function() {
		return (
					<form onSubmit={this.doSubmit} className="ui item container" >
							<div htmlFor="name" className="ui header dividing" >Add New Gift</div>
							<div className="ui small icon input" >
								<input type="text" id="name" ref="name" className="" placeholder="New Gifts" />
  								<i className="plus icon"></i>
							</div>
					</form>
		);
	}
});

React.render(
	<GiftBox />,
	document.getElementById('todo')
);