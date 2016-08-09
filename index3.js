var Sibling = React.createClass({
  render: function () {
    var num = this.props.number;
    return (
      <div>
        <p>number of people: {num} </p>
      </div>
    );
  }
});

var Child = React.createClass({
  handleChange: function (e) {
    var number = e.target.value;
    this.props.onChange(number);
  },
  
  render: function () {
    return (
      <div>
        <select 
          id="numbers" 
          onChange={this.handleChange}>
          
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
    );
  }
});

var Parent = React.createClass({
  getInitialState: function () {
    return { number: 0 };
  },
  
  changeNum: function (newNum) {
    this.setState({
      number: newNum
    });
  },

  render: function () {
    return (
      <div>
        <Child onChange={this.changeNum} />
        <Sibling number={this.state.number} />
      </div>
    );
  }
});

ReactDOM.render(
  <Parent />,
  document.getElementById('app')
);