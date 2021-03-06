'use strict';

var React = require('react');
var SvgIcon = require('../../svg-icon');

var NavigationArrowDropDown = React.createClass({
  displayName: 'NavigationArrowDropDown',

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M7 10l5 5 5-5z' })
    );
  }

});

module.exports = NavigationArrowDropDown;