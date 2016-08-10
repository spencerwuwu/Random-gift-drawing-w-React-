
var DisplayNum = React.createClass({
	getInitialState: function() {
		return { 
			maxNumber : 10,
			requireNumber : 4 };
	},
	handleMaxChange : function(event){
		var newNumber = event.target.value;
		this.setState({maxNumber : newNumber});
	},
	handleRequireChange : function(event){
		var newNumber = event.target.value;
		this.setState({requireNumber : newNumber});
	},
	render : function() {

		return(
			<div>
				<input type="text" onBlur={this.handleMaxChange} />
				<input type="text" onBlur={this.handleRequireChange} />
				<p>number of people: {this.state.maxNumber } </p>
				<p>number of people: {this.state.requireNumber } </p>
				<RandomNum maxNumber={this.state.maxNumber } requireNumber={this.state.requireNumber} />
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




