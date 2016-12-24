import React, { PureComponent, PropTypes } from 'react';
import style from './style.css';


class NewProjectForm extends PureComponent {
  constructor(props) {
    super(props);

    // binding methods
    this.projectFieldChangeHandler = this.projectFieldChangeHandler.bind(this);
    this.createProjectHandler = this.createProjectHandler.bind(this);
  }

  /** Internal props **/
  state = {
    projectField: '',
  };

  /** Internal methods **/
  projectFieldChangeHandler(e) {
    this.setState({
      projectField: e.target.value,
    });
  }
  createProjectHandler(e) {
    const { create } = this.props;
    const { projectField } = this.state;

    e.preventDefault();

    if (!projectField) {
      return;
    }

    this.setState({
      projectField: '',
    });

    create({ label: projectField });
  }

  /** Render **/
  render() {
    const { projectField } = this.state;

    return (
      <form className={style.base}>
        <input
          type="text"
          placeholder="Insert a project name..."
          value={projectField}
          onChange={this.projectFieldChangeHandler}
        />
        <button
          type="submit"
          onClick={this.createProjectHandler}
        >Create project</button>
      </form>
    );
  }
}


NewProjectForm.propTypes = {
  create: PropTypes.func,
};


export default NewProjectForm;
