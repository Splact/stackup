import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import style from './style.css';

class Button extends Component {
  render() {
    const { children, onClick, color } = this.props;

    const classes = {
      button: classnames({
        [style.button]: true,
        [style.green]: color === 'green',
        [style.red]: color === 'red',
        [style.blue]: color === 'blue' || color === 'primary',
      }),
    };

    return (
      <a className={classes.button} href="#" onClick={onClick}>{children}</a>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  color: PropTypes.string,
};
Button.defaultProps = {
  onClick: f => f,
  children: 'push',
  color: 'primary',
};

export default Button;
