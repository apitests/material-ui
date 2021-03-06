'use strict';

var React = require('react');
var SvgIcon = require('../../svg-icon');

var ActionStars = React.createClass({
  displayName: 'ActionStars',

  render: function render() {
    return React.createElement(
      SvgIcon,
      this.props,
      React.createElement('path', { d: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z' })
    );
  }

});

module.exports = ActionStars;