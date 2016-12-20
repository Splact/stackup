import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { translate } from 'react-i18next';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { create } from '../../actions/project';
import ProjectsList from '../../components/ProjectsList';
import style from './style.css';


function mapStateToProps() {
  return {};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    create,
  }, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
@translate()
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectField: '',
    };

    this.projectFieldChangeHandler = this.projectFieldChangeHandler.bind(this);
  }

  projectFieldChangeHandler(e) {
    this.setState({
      projectField: e.target.value,
    });
  }

  render() {
    const { t } = this.props;
    const { projectField } = this.state;

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
          <ProjectsList />
        </div>

        <div className={style.form}>
          <input
            type="text"
            placeholder="Project name"
            value={projectField}
            onChange={this.projectFieldChangeHandler}
          />
          <button
            onClick={() => {
              this.props.create({ label: projectField });
            }}
          >Create Project</button>
        </div>
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
