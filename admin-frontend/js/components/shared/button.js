import React from 'react';
import Relay from 'react-relay';
import Radium from 'radium';

const themes = {
  default: {
    style: {
      backgroundColor: '#45879E',
      color: '#FFF',
      fontFamily: 'Avenir Next, sans-serif',
      fontSize: 14,
      borderRadius: 3,
      transform: 'scale(1.0)',
      marginLeft: 15,
      marginRight: 15,
    },
    disabledStyle: {
      opacity: 0.4,
      cursor: 'default',
    },
    hoverStyle: {
      backgroundColor: '#5FA8BF',
      cursor: 'pointer',
    },
    activeStyle: {
      transform: 'scale(0.98)',
    },
    focusStyle: {},
  }
};

const buttonFormat = {
  display: 'inline-flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 10,
}

@Radium
export default class TitleBar extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func,
    label: React.PropTypes.string,
    theme: React.PropTypes.string,
    disabled: React.PropTypes.bool,
  }

  static defaultProps = {
    onClick: () => {},
    label: '',
    theme: 'default',
    disabled: false,
  }

  prepareStyle = () => {
    const theme = themes[this.props.theme];
    const buttonStates = {
      ':hover' : theme.hoverStyle,
      ':active' : theme.activeStyle,
      ':focus': theme.focusStyle,
    };

    return Object.assign(
      theme.style,
      this.props.disabled ? theme.disabledStyle : buttonStates,
      buttonFormat,
    );
  }

  render() {
    const buttonStyle = this.prepareStyle();

    return (
      <span style={buttonStyle} onClick={this.props.onClick}>
        {this.props.label}
      </span>
    );
  }
}