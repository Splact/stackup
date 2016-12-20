import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Sheet from '../Sheet';
import style from './style.css';

class App extends Component {
  render() {
    const { children, location } = this.props;
    const path = location.pathname;
    const segment = path.split('/')[1] || 'root';

    return (
      <div className={style.app}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          titleTemplate="%s | Stackup"
          defaultTitle="Stackup"
          meta={[
            { name: 'description', content: 'Stackup' },
            { name: 'twitter:card', value: 'summary' },
            { property: 'og:type', content: 'website' },
          ]}
        />
        <ReactCSSTransitionGroup
          component="div"
          className={style.pageSlider}
          transitionName={{
            enter: style.pageEnter,
            enterActive: style.pageEnterActive,
            leave: style.pageLeave,
            leaveActive: style.pageLeaveActive,
          }}
          transitionEnterTimeout={600}
          transitionLeaveTimeout={250}
        >
          <Sheet key={`page-${segment}`}>{children}</Sheet>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
};

export default App;
