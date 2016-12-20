import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { start, stop, clear } from '../../actions/project'
import ProjectsList from './ProjectsList';


function mapStateToProps({ projects }) {
  return {
    projects: projects.list,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ start, stop, clear }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
