import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { translate } from 'react-i18next';
import ProjectsList from '../../components/ProjectsList';
import NewProjectForm from '../../components/NewProjectForm';
import style from './style.css';


@translate()
class Dashboard extends Component {
  /** Render **/
  render() {
    const { t } = this.props;

    return (
      <div className={style.base}>
        <Helmet
          title={t('Dashboard')}
          meta={[
            { name: 'description', content: t('Stackup dashboard') },

            { property: 'og:title', content: t('Dashboard') },
            { property: 'og:description', content: t('Stackup dashboard') },
            //{ property: 'og:image', content: '' },
            //{ property: 'og:url', content: '' },
          ]}
        />
        <div className={style.content}>
          <h1 className={style.title}>{t('Stackup')}</h1>
          <ProjectsList showPinned />
          <ProjectsList showUnpinned />
        </div>

        <NewProjectForm />
      </div>
    );
  }
}


Dashboard.propTypes = {
  t: PropTypes.func,
  name: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  website: PropTypes.string,
  isUserFetching: PropTypes.bool,
  fetchUserById: PropTypes.func,
};


export default Dashboard;
