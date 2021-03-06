import React, { PureComponent, PropTypes } from 'react';
import projectPropType from '../../propTypes/project';
import Project from '../Project';
import style from './style.css';


class ProjectsList extends PureComponent {
  render() {
    const { projects, start, stop, clear, discard, pin, unpin, changePicture } = this.props;

    return (
      <div className={style.base}>
        {projects.map(p => (
          <Project
            key={`project--${p.id}`}
            start={start}
            stop={stop}
            clear={clear}
            discard={discard}
            pin={pin}
            unpin={unpin}
            changePicture={changePicture}
            {...p}
          />
        ))}
      </div>
    );
  }
}


ProjectsList.propTypes = {
  projects: PropTypes.arrayOf(projectPropType),
  start: PropTypes.func,
  stop: PropTypes.func,
  clear: PropTypes.func,
};


export default ProjectsList;
