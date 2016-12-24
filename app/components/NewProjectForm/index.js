import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { create } from '../../actions/project';
import NewProjectForm from './NewProjectForm';


function mapStateToProps() {
  return {};
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    create,
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(NewProjectForm);
