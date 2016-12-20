import React, { Component, PropTypes } from 'react';
import style from './style.css';

class Sheet extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className={style.sheet}>
        {children}
      </div>
    );
  }
}

Sheet.propTypes = {
  children: PropTypes.node,
};

export default Sheet;
