import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { translate, Interpolate } from 'react-i18next';

@translate()
class NotFound extends Component {
  render() {
    const { params, t } = this.props;

    const codePath = <code>/{params.wrongPath}</code>;

    return (
      <div>
        <Helmet
          title="404"
          meta={[
            { name: 'description', content: t('Stackup 404 page') },

            { property: 'og:title', content: t('Page not found') },
            { property: 'og:description', content: t('Stackup 404 page') },
            //{ property: 'og:image', content: '' },
            //{ property: 'og:url', content: '' },
          ]}
        />
        <h1>404</h1>
        <p><Interpolate i18nKey="The page {{codePath}} was not found." codePath={codePath} /></p>
      </div>
    );
  }
}

NotFound.propTypes = {
  t: PropTypes.func,
  params: PropTypes.object,
};

export default NotFound;
