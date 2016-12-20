import React, { PureComponent, PropTypes } from 'react';
import datePropType from '../../propTypes/date';
import style from './style.css';
import contrast from 'contrast';
import numeral from 'numeral';


class Project extends PureComponent {
  constructor(props) {
    super(props);

    // internal props
    this.clockCycleIteration = 0;
    this.timer = false;

    // initial state
    this.state = {
      stackedTime: this.getTime(),
    };

    // binding methods
    this.getTime = this.getTime.bind(this);
    this.clock = this.clock.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.timerToggleHandler = this.timerToggleHandler.bind(this);
  }

  /** React lifecycle **/
  componentWillMount() {
    if (this.props.currentTimer) {
      this.startTimer();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.currentTimer && nextProps.currentTimer) {
      // start timer
      this.startTimer();
    } else if (this.props.currentTimer && !nextProps.currentTimer) {
      // stop timer
      this.stopTimer();
    }
  }
  componentWillUnmount() {
    this.stopTimer();
  }

  /** Internal methods **/
  getTime() {
    const { streaks, currentTimer } = this.props;

    let stackedTime = streaks
      .map(s => s[1].getTime() - s[0].getTime())  // get time diffs
      .reduce((pv, cv) => pv + cv, 0);            // sum diffs

    if (currentTimer) {
      const now = new Date();
      stackedTime += now.getTime() - currentTimer.getTime();
    }

    return stackedTime;
  }
  clock() {
    // progressively sum 1s and sync every 60s
    if (this.clockCycleIteration++ < 60) {
      this.setState({ stackedTime: this.state.stackedTime + 1000 });
    } else {
      this.setState({ stackedTime: this.getTime() });
      this.clockCycleIteration = 0;
    }
  }
  startTimer() {
    if (!this.timer) {
      this.timer = setInterval(this.clock, 1000);
    }
  }
  stopTimer() {
    if (this.timer) {
      this.timer = clearInterval(this.timer);
    }
  }
  timerToggleHandler() {
    if (this.props.currentTimer) {
      this.props.stop(this.props.id);
    } else {
      this.props.start(this.props.id);
    }
  }

  /** Render **/
  render() {
    const { label, picture, color, hotkey } = this.props;
    const { stackedTime } = this.state;

    const inlineStyle = {
      background: 'black',
      // color: color && contrast(color) === 'light' ? '#000' : '#FFF',
      color: '#FFF',
    };
    const backgroundInlineStyle = {
      backgroundImage: `url(${picture})`,
    };
    const orbiterInlineStyle = { backgroundColor: color };

    return (
      <div className={style.base} style={inlineStyle} onClick={this.timerToggleHandler}>
        <div className={style.infoWrapper}>
          <div className={style.label}>{label[0]}</div>
          <div className={style.stackedTime}>{numeral(stackedTime / 1000).format('00:00:00')}</div>
          <div className={style.hotkey}>{hotkey}</div>
        </div>
        <div className={style.orbiter} style={orbiterInlineStyle}></div>
        <div className={style.background} style={backgroundInlineStyle} />
      </div>
    );
  }
}


Project.defaultProps = {
  streaks: [],
  currentTimer: null,
};
Project.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  picture: PropTypes.string,
  color: PropTypes.string,
  hotkey: PropTypes.string,
  streaks: PropTypes.arrayOf(
    PropTypes.arrayOf(datePropType)
  ),
  currentTimer: datePropType,
  start: PropTypes.func,
  stop: PropTypes.func,
  clear: PropTypes.func,
};


export default Project;
