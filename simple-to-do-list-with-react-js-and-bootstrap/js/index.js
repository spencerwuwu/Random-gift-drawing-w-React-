"use strict";

var TodoBox = React.createClass({
	displayName: "TodoBox",

	getInitialState: function getInitialState() {
		return {
			data: [{ "id": "00001", "task": "Wake up", "complete": "false" }, { "id": "00002", "task": "Eat breakfast", "complete": "false" }, { "id": "00003", "task": "Go to work", "complete": "false" }]
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
	handleSubmit: function handleSubmit(task) {
		var data = this.state.data;
		var id = this.generateId().toString();
		var complete = 'false';
		data = data.concat([{ id: id, task: task, complete: complete }]);
		this.setState({ data: data });
	},
	handleToggleComplete: function handleToggleComplete(nodeId) {
		var data = this.state.data;
		for (var i in data) {
			if (data[i].id == nodeId) {
				data[i].complete = data[i].complete === 'true' ? 'false' : 'true';
				break;
			}
		}
		this.setState({ data: data });
		return;
	},
	render: function render() {
		return React.createElement(
			"div",
			{ className: "well" },
			React.createElement(
				"h1",
				{ className: "vert-offset-top-0" },
				"To do:"
			),
			React.createElement(TodoList, { data: this.state.data, removeNode: this.handleNodeRemoval, toggleComplete: this.handleToggleComplete }),
			React.createElement(TodoForm, { onTaskSubmit: this.handleSubmit })
		);
	}
});

var TodoList = React.createClass({
	displayName: "TodoList",

	removeNode: function removeNode(nodeId) {
		this.props.removeNode(nodeId);
		return;
	},
	toggleComplete: function toggleComplete(nodeId) {
		this.props.toggleComplete(nodeId);
		return;
	},
	render: function render() {
		var listNodes = this.props.data.map(function (listItem) {
			return React.createElement(TodoItem, { key: listItem.id, nodeId: listItem.id, task: listItem.task, complete: listItem.complete, removeNode: this.removeNode, toggleComplete: this.toggleComplete });
		}, this);
		return React.createElement(
			"ul",
			{ className: "list-group" },
			listNodes
		);
	}
});

var TodoItem = React.createClass({
	displayName: "TodoItem",

	removeNode: function removeNode(e) {
		e.preventDefault();
		this.props.removeNode(this.props.nodeId);
		return;
	},
	toggleComplete: function toggleComplete(e) {
		e.preventDefault();
		this.props.toggleComplete(this.props.nodeId);
		return;
	},
	updateClass: function updateClass() {},
	render: function render() {
		var classes = 'list-group-item clearfix';
		if (this.props.complete === 'true') {
			classes = classes + ' list-group-item-success';
		}
		return React.createElement(
			"li",
			{ className: classes },
			this.props.task,
			React.createElement(
				"div",
				{ className: "pull-right", role: "group" },
				React.createElement(
					"button",
					{ type: "button", className: "btn btn-xs btn-success img-circle", onClick: this.toggleComplete },
					"✓"
				),
				" ",
				React.createElement(
					"button",
					{ type: "button", className: "btn btn-xs btn-danger img-circle", onClick: this.removeNode },
					"Ｘ"
				)
			)
		);
	}
});

var TodoForm = React.createClass({
	displayName: "TodoForm",

	doSubmit: function doSubmit(e) {
		e.preventDefault();
		var task = React.findDOMNode(this.refs.task).value.trim();
		if (!task) {
			return;
		}
		this.props.onTaskSubmit(task);
		React.findDOMNode(this.refs.task).value = '';
		return;
	},
	render: function render() {
		return React.createElement(
			"div",
			{ className: "commentForm vert-offset-top-2" },
			React.createElement("hr", null),
			React.createElement(
				"div",
				{ className: "clearfix" },
				React.createElement(
					"form",
					{ className: "todoForm form-horizontal", onSubmit: this.doSubmit },
					React.createElement(
						"div",
						{ className: "form-group" },
						React.createElement(
							"label",
							{ htmlFor: "task", className: "col-md-2 control-label" },
							"Task"
						),
						React.createElement(
							"div",
							{ className: "col-md-10" },
							React.createElement("input", { type: "text", id: "task", ref: "task", className: "form-control", placeholder: "What do you need to do?" })
						)
					),
					React.createElement(
						"div",
						{ className: "row" },
						React.createElement(
							"div",
							{ className: "col-md-10 col-md-offset-2 text-right" },
							React.createElement("input", { type: "submit", value: "Save Item", className: "btn btn-primary" })
						)
					)
				)
			)
		);
	}
});

React.render(React.createElement(TodoBox, null), document.getElementById('todoBox'));