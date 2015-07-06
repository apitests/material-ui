'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var React = require('react/addons');
var ClickAwayable = require('../mixins/click-awayable');
var StylePropable = require('../mixins/style-propable');
var KeyCode = require('../utils/key-code');
var Menu = require('../menus/menu');

var IconMenu = React.createClass({
  displayName: 'IconMenu',

  mixins: [StylePropable, ClickAwayable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    desktop: React.PropTypes.bool,
    iconButtonElement: React.PropTypes.element.isRequired,
    multiple: React.PropTypes.bool,
    openDirection: React.PropTypes.oneOf(['bottom-left', 'bottom-right', 'top-left', 'top-right']),
    onItemKeyboardActivate: React.PropTypes.func,
    onItemTouchTap: React.PropTypes.func,
    maxHeight: React.PropTypes.number,
    menuStyle: React.PropTypes.object,
    menuListStyle: React.PropTypes.object,
    onKeyDown: React.PropTypes.func,
    width: React.PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      openDirection: 'bottom-left',
      onKeyDown: function onKeyDown() {},
      onItemKeyboardActivate: function onItemKeyboardActivate() {},
      onItemTouchTap: function onItemTouchTap() {}
    };
  },

  getInitialState: function getInitialState() {
    return {
      iconButtonRef: this.props.iconButtonElement.props.ref || 'iconButton',
      open: false
    };
  },

  componentClickAway: function componentClickAway() {
    this.close();
  },

  render: function render() {
    var _this = this;

    var _props = this.props;
    var desktop = _props.desktop;
    var iconButtonElement = _props.iconButtonElement;
    var multiple = _props.multiple;
    var openDirection = _props.openDirection;
    var onChange = _props.onChange;
    var onKeyDown = _props.onKeyDown;
    var onItemTouchTap = _props.onItemTouchTap;
    var maxHeight = _props.maxHeight;
    var menuStyle = _props.menuStyle;
    var menuListStyle = _props.menuListStyle;
    var style = _props.style;
    var value = _props.value;
    var valueLink = _props.valueLink;
    var width = _props.width;

    var other = _objectWithoutProperties(_props, ['desktop', 'iconButtonElement', 'multiple', 'openDirection', 'onChange', 'onKeyDown', 'onItemTouchTap', 'maxHeight', 'menuStyle', 'menuListStyle', 'style', 'value', 'valueLink', 'width']);

    var open = this.state.open;
    var openDown = openDirection.split('-')[0] === 'bottom';
    var openLeft = openDirection.split('-')[1] === 'left';

    var styles = {
      root: {
        display: 'inline-block',
        position: 'relative'
      },

      menu: {
        top: openDown ? 12 : null,
        bottom: !openDown ? 12 : null,
        left: !openLeft ? 12 : null,
        right: openLeft ? 12 : null
      }
    };

    var mergedRootStyles = this.mergeAndPrefix(styles.root, style);
    var mergedMenuStyles = this.mergeStyles(styles.menu, menuStyle);

    var iconButton = React.cloneElement(iconButtonElement, {
      onKeyboardActivate: this._handleIconButtonKeyboardActivate,
      onTouchTap: (function (e) {
        _this.open();
        if (iconButtonElement.props.onTouchTap) iconButtonElement.props.onTouchTap(e);
      }).bind(this),
      ref: this.state.iconButtonRef
    });

    return React.createElement(
      'div',
      _extends({}, other, {
        style: mergedRootStyles,
        onKeyDown: this._handleKeyDown }),
      iconButton,
      React.createElement(
        Menu,
        {
          desktop: desktop,
          listStyle: menuListStyle,
          maxHeight: maxHeight,
          multiple: multiple,
          onItemTouchTap: this._handleItemTouchTap,
          onItemKeyboardActivate: this._handleItemKeyboardActivate,
          onChange: onChange,
          open: open,
          openDirection: openDirection,
          ref: 'menu',
          style: mergedMenuStyles,
          value: value,
          valueLink: valueLink,
          width: width },
        this.props.children
      )
    );
  },

  close: function close() {
    if (this.state.open) {
      this.setState({
        open: false
      });
      //Set focus on the icon button when the menu closes
      React.findDOMNode(this.refs[this.state.iconButtonRef]).focus();
    }
  },

  open: function open() {
    if (!this.state.open) {
      this.setState({
        open: true
      });
    }
  },

  _handleIconButtonKeyboardActivate: function _handleIconButtonKeyboardActivate() {
    this.refs.menu.setKeyboardFocused(true);
  },

  _handleKeyDown: function _handleKeyDown(e) {
    switch (e.keyCode) {
      case KeyCode.ESC:
        this.close();
        break;
    }
    this.props.onKeyDown(e);
  },

  _handleItemKeyboardActivate: function _handleItemKeyboardActivate() {
    //The icon button receives keyboard focus when a
    //menu item is keyboard activated
    this.refs[this.state.iconButtonRef].setKeyboardFocus();
  },

  _handleItemTouchTap: function _handleItemTouchTap(e, child) {
    var _this2 = this;

    setTimeout(function () {
      _this2.close();
      _this2.props.onItemTouchTap(e, child);
    }, 150);
  }
});

module.exports = IconMenu;