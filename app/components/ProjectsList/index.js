import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { start, stop, clear, discard, pin, unpin } from '../../actions/project';
import ProjectsList from './ProjectsList';


function mapStateToProps({ projects }, { showPinned, showUnpinned }) {
  return {
    projects: projects.list.filter(
      p => (p.isPinned && showPinned) || (!p.isPinned && showUnpinned)
    ),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ start, stop, clear, discard, pin, unpin }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
