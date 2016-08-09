
var DisplayNum = React.createClass({
	getInitialState: function() {
		return { number : 10 };
	},
	handleChange : function(event){
		var newNumber = event.target.value;
		this.setState({number: newNumber});
	},
	changeNum : function (newNum) {
		this.setState({ 
			number: newNum
		});
	},
	render : function() {

		return(
			<div>
				<input type="text" onBlur={this.handleChange} />
				<p>number of people: {this.state.number} </p>
				<RandomNum number={this.state.number} />
			</div>
		);
	}
});

var RandomNum = React.createClass({
	getInitialState: function() {
		return { number : 10 };
	},
	render : function() {
		var numberR = doRand(this.props.number,4);
		var numberRList = numberR.map(function(numberR, i){
			return <p>{numberR}</p>;
		});
		return(
			<div> random: {numberRList} </div>
		);
	}
});

var ParentNum = React.createClass({
	getInitialState: function() {
		return { number : 10 };
	},
	changeNum: function (newNum) {
		this.setState({ 
			number: newNum
		});
	},

	render: function () {
		return(
			<div>
				<DisplayNum
				 number={this.state.number} 
				 onBlur={this.changeNum} />
			</div>
		);
	}


});


ReactDOM.render(
  <ParentNum />,
  document.getElementById('app')
);


