/** @jsx React.DOM */

var data = [
  {
    name: "Garage Door",
    url: "https://api.spark.io/v1/devices/48ff65065067555051332287/switchState/?access_token=aa6fcb98e87d7e79694f35d531738795758e7303",
    jsonNode: "result"
  }
];

var Indicator = React.createClass({

  getInitialState: function() {
    return {data: []};
  },

  componentWillMount: function() {

    console.log(this.props.url);

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(response) {
        // TODO allow jsonNode to be nested, e.g. coreInfo.result
        this.setState({data: response[this.props.jsonNode]});
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
        {this.state.data}
      </div>
    );
  }
});

var IndicatorList = React.createClass({
  render: function() {

    var indicatorNodes = this.props.data.map(function (indicator) {
      return (
        <Indicator name={indicator.name} url={indicator.url} jsonNode={indicator.jsonNode}>
          {indicator.text}
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
  render: function() {
    return (
      <div className="indicatorForm">
        Hello, world! I am a IndicatorForm.
      </div>
    );
  }
});


var ControlPanel = React.createClass({
  render: function() {
    return (
      <div className="controlPanel">
        <IndicatorList data={this.props.data} />
        <IndicatorForm />
      </div>
    );
  }
});
React.renderComponent(
  <ControlPanel data={data} />,
  document.getElementById('content')
);
