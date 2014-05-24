/** @jsx React.DOM */

// var data = [
//   {
//     name: "Garage Door",
//     url: "https://api.spark.io/v1/devices/48ff65065067555051332287/switchState/?access_token=aa6fcb98e87d7e79694f35d531738795758e7303",
//     jsonNode: "result"
//   }
// ];

var Indicator = React.createClass({

  getInitialState: function() {
    return {response: ""};
  },

  componentWillMount: function() {

      $.ajax({
        url: this.props.url,
        dataType: 'json',
        success: function(response) {
          // TODO allow jsonNode to be nested, e.g. coreInfo.result
          this.setState({result: response[this.props.jsonNode]});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });

  },

  render: function() {
    return (
      <div className="indicator">
        <h2 className="indicatorName">
        {this.props.name}
        </h2>
        {this.state.result}
      </div>
    );
  }
});

var IndicatorList = React.createClass({

  render: function() {

    var indicatorNodes = this.props.data.map(function (indicator, index) {
      return (
        <Indicator key={index} name={indicator.name} url={indicator.url} jsonNode={indicator.jsonNode}>
        </Indicator>
      );
    });

    return (
      <div className="indicatorList">
        {indicatorNodes}
      </div>
    );
  }
});

var IndicatorForm = React.createClass({
  handleSubmit: function() {
    var name = this.refs.name.getDOMNode().value.trim();
    var url = this.refs.url.getDOMNode().value.trim();
    var jsonNode = this.refs.jsonNode.getDOMNode().value.trim();

    this.props.onIndicatorSubmit({name: name, url: url, jsonNode: jsonNode});
    this.refs.name.getDOMNode().value = '';
    this.refs.url.getDOMNode().value = '';
    this.refs.jsonNode.getDOMNode().value = '';
    return false;
  },

  render: function() {
    return (
        <form className="indicatorForm" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Indicator name" ref="name" />
          <input type="text" placeholder="http://..." ref="url" />
          <input type="text" placeholder="JSON node" ref="jsonNode" />
          <input type="submit" value="Post" />
        </form>
    );
  }
});


var ControlPanel = React.createClass({
  mixins: [ReactFireMixin],

  handleIndicatorSubmit: function(indicator) {
    var indicators = this.state.data;
    indicators.push(indicator);
    this.setState({data: indicators});
    this.firebaseRefs["data"].push(indicator);
  },

  getInitialState: function() {
    return {data: []};
  },
  componentWillMount: function() {
    this.bindAsArray(new Firebase("https://flickering-fire-6695.firebaseio.com/whatcha1"), "data");
  },

  render: function() {
    return (
      <div className="controlPanel">
        <IndicatorList data={this.state.data} />
        <IndicatorForm onIndicatorSubmit={this.handleIndicatorSubmit}/>
      </div>
    );
  }
});
React.renderComponent(
  <ControlPanel />,
  document.getElementById('content')
);
