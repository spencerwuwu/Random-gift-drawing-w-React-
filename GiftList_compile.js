'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var TodoBox = React.createClass({
	displayName: 'TodoBox',

	getInitialState: function getInitialState() {
		return {
			data: [{ "id": "00001", "task": "Din Din" }, { "id": "00002", "task": "Don Don" }, { "id": "00003", "task": "Din Don Din Don" }]

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
		data = data.concat([{ id: id, task: task }]);
		this.setState({ data: data });
	},
	render: function render() {

		var requireNumber = this.state.data.length;
		return React.createElement(
			'div',
			{ className: 'well' },
			React.createElement(
				'h1',
				{ className: 'vert-offset-top-0' },
				'Gifts:'
			),
			React.createElement(TodoList, { data: this.state.data, removeNode: this.handleNodeRemoval }),
			React.createElement(TodoForm, { onTaskSubmit: this.handleSubmit }),
			React.createElement(
				'p',
				null,
				' ',
				requireNumber,
				' '
			),
			React.createElement(DisplayNum, { require: requireNumber, data: this.state.data })
		);
	}
});

var TodoList = React.createClass({
	displayName: 'TodoList',

	removeNode: function removeNode(nodeId) {
		this.props.removeNode(nodeId);
		return;
	},
	render: function render() {
		var listNodes = this.props.data.map(function (listItem) {
			return React.createElement(TodoItem, { key: listItem.id, nodeId: listItem.id, task: listItem.task, removeNode: this.removeNode });
		}, this);
		return React.createElement(
			'ul',
			{ className: 'list-group' },
			listNodes
		);
	}
});

var TodoItem = React.createClass({
	displayName: 'TodoItem',

	removeNode: function removeNode(e) {
		e.preventDefault();
		this.props.removeNode(this.props.nodeId);
		return;
	},
	updateClass: function updateClass() {},
	render: function render() {
		var classes = 'list-group-item clearfix';
		return React.createElement(
			'li',
			{ className: classes },
			this.props.task,
			React.createElement(
				'div',
				{ className: 'pull-right', role: 'group' },
				React.createElement(
					'button',
					{ type: 'button', className: 'btn btn-xs btn-danger img-circle', onClick: this.removeNode },
					'Ｘ'
				)
			)
		);
	}
});

var TodoForm = React.createClass({
	displayName: 'TodoForm',

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
			'div',
			{ className: 'commentForm vert-offset-top-2' },
			React.createElement('hr', null),
			React.createElement(
				'div',
				{ className: 'clearfix' },
				React.createElement(
					'form',
					{ className: 'todoForm form-horizontal', onSubmit: this.doSubmit },
					React.createElement(
						'div',
						{ className: 'form-group' },
						React.createElement(
							'label',
							{ htmlFor: 'task', className: 'col-md-2 control-label' },
							'Next Gifts'
						),
						React.createElement(
							'div',
							{ className: 'col-md-10' },
							React.createElement('input', { type: 'text', id: 'task', ref: 'task', className: 'form-control', placeholder: 'New Gifts' })
						)
					),
					React.createElement(
						'div',
						{ className: 'row' },
						React.createElement(
							'div',
							{ className: 'col-md-10 col-md-offset-2 text-right' },
							React.createElement('input', { type: 'submit', value: 'Save Item', className: 'btn btn-primary' })
						)
					)
				)
			)
		);
	}
});

var DisplayNum = React.createClass({
	displayName: 'DisplayNum',

	getInitialState: function getInitialState() {
		return {
			maxNumber: 10,
			requireNumber: 4 };
	},
	handleMaxChange: function handleMaxChange(event) {
		var newNumber = event.target.value;
		this.setState({ maxNumber: newNumber });
	},
	render: function render() {
		var requireNumber = this.props.require;
		return React.createElement(
			'div',
			null,
			React.createElement('input', { type: 'text', onBlur: this.handleMaxChange }),
			React.createElement(
				'p',
				null,
				'number of people: ',
				this.state.maxNumber,
				' '
			),
			React.createElement(
				'p',
				null,
				'requirement of people: ',
				requireNumber,
				' '
			),
			React.createElement(RandomNum, { maxNumber: this.state.maxNumber, requireNumber: requireNumber, data: this.props.data })
		);
	}
});

var RandomNum = React.createClass({
	displayName: 'RandomNum',

	getInitialState: function getInitialState() {
		return {
			maxNumber: 10,
			requireNumber: 4 };
	},
	render: function render() {
		var numberR = doRand(this.props.maxNumber, this.props.requireNumber);
		var dataList = this.props.data;
		var numberRList = numberR.map(function (numberR, i) {
			return React.createElement(
				'div',
				{ className: 'row' },
				React.createElement(
					'div',
					{ className: 'col-xs-6' },
					' ',
					numberR,
					' '
				),
				React.createElement(
					'div',
					{ className: 'col-xs-6' },
					' ',
					dataList[i].task,
					' '
				)
			);
		});
		return React.createElement(
			'div',
			null,
			' random: ',
			numberRList,
			' '
		);
	}
});

React.render(React.createElement(TodoBox, null), document.getElementById('todo'));