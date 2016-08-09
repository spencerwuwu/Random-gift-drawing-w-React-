
var DisplayNum = React.createClass({
	getInitialState: function() {
		return { number : 0 };
	},
	handleChange : function(event){
		var newNumber = event.target.value;
		this.setState({number: newNumber});
	},
	render : function() {

		return(
			<div>
				<input type="text" onBlur={this.handleChange} />
				<p>number of people: {this.state.number} </p>
			</div>
		);
	}
});

/*
var RandomNum = React.createClass({
	render: function(){
		var maxNum = this.props.number;
		var exportNum = doRand(maxNum, 3);
		var myRandomList = exportNum.map(function(exportNum, i){
			return <p>{exportNum} </p>
		});
		return(
			<div> 
				<p>random numbers: </p>
				{myRandomList}
			</div>
		);
	}
});
*/

var ParentNum = React.createClass({
	getInitialState: function() {
		return { number : 0 };
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


