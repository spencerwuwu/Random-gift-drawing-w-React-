
var DisplayNum = React.createClass({
	render : function() {
		var number = this.props.number;
		return(
			<div>
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
var Child = React.createClass({
	handleChange: function(newNum){
		var number = newNum.target.value;
		this.props.onBlur(number);
	},
	render:function(){
		return (
			<input placeholder="number" onBlur={this.handleChange} />
		);
	}
});

var ParentNum = React.createClass({
	getInitialState: function() {
		return { number : 0 };
	},
	changeNum: function(newNum){
		this.setState({
			number: newNum
		});
	},

	render: function () {
		return(
			<div>
				
				<Child onBlur={this.changeNum} />
				<DisplayNum number={this.state.number} />

			</div>
		);
	}


});


ReactDOM.render(
  <ParentNum />,
  document.getElementById('app')
);


