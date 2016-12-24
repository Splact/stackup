import React, { PureComponent, PropTypes } from 'react';
import contrast from 'contrast';
import numeral from 'numeral';
import classnames from 'classnames';
import datePropType from '../../propTypes/date';
import style from './style.css';


class Project extends PureComponent {
  constructor(props) {
    super(props);

    // binding methods
    this.clock = this.clock.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.timerToggleHandler = this.timerToggleHandler.bind(this);
    this.pointerDownHandler = this.pointerDownHandler.bind(this);
    this.pointerUpHandler = this.pointerUpHandler.bind(this);
    this.longPressHandler = this.longPressHandler.bind(this);
  }

  /** Internal props **/
  state = {
    stackedTime: this.getTime(this.props.streaks, this.props.currentTimer),
    initials: '',
    isOptionsPanelOpen: false,
  }
  clockCycleIteration = Math.round((this.state.stackedTime / 1000) % 60);
  orbiterRotation = 0;
  timer = false;
  longPressTimeout = null;
  isTimerToggleDisabled = false;

  /** React lifecycle **/
  componentWillMount() {
    if (this.props.currentTimer) {
      this.startTimer();
    }

    this.updateOrbiterRotation();

    this.setState({
      initials: this.getInitials(),
    });
  }
  componentDidMount() {
    this.ref.addEventListener('click', this.timerToggleHandler);
    this.ref.addEventListener('mousedown', this.pointerDownHandler);
    this.ref.addEventListener('touchstart', this.pointerDownHandler);
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.currentTimer && nextProps.currentTimer) {
      // start timer
      this.startTimer();
    } else if (this.props.currentTimer && !nextProps.currentTimer) {
      // stop timer
      this.stopTimer();
    }

    if (!nextProps.streaks.length && !nextProps.currentTimer) {
      this.orbiterRotation = this.clockCycleIteration = 0;
      this.setState({ stackedTime: 0 });
    }
  }
  componentWillUnmount() {
    this.stopTimer();
    this.ref.removeEventListener('click', this.timerToggleHandler);
    this.ref.removeEventListener('mousedown', this.pointerDownHandler);
    this.ref.removeEventListener('touchstart', this.pointerDownHandler);
  }

  /** Internal methods **/
  getInitials() {
    const words = this.props.label.split(/[\s,]+/);
    return words.slice(0, 3).map(w => w[0].toUpperCase()).reduce((f, s) => f + s);
  }
  getTime(streaks, currentTimer) {
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
    if (this.clockCycleIteration++ < 59) {
      this.updateOrbiterRotation();
      this.setState({ stackedTime: this.state.stackedTime + 1000 });
    } else {
      this.clockCycleIteration = 0;
      this.updateOrbiterRotation();
      this.setState({ stackedTime: this.getTime(this.props.streaks, this.props.currentTimer) });
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
    if (this.isTimerToggleDisabled) {
      return;
    }

    if (this.props.currentTimer) {
      this.props.stop(this.props.id);
    } else {
      this.props.start(this.props.id);
    }
  }
  updateOrbiterRotation() {
    this.orbiterRotation = this.orbiterRotation || 0; // first time starts from 0
    // new rotation
    const nR = this.clockCycleIteration * 6;          // 360° / 60s = 6°/s
    // current apparent rotation
    let aR = this.orbiterRotation % 360;

    if (aR < 0) {
      aR += 360;
    }
    if (aR < 180 && nR > (aR + 180)) {
      this.orbiterRotation -= 360;
    }
    if (aR >= 180 && nR <= (aR - 180)) {
      this.orbiterRotation += 360;
    }
    this.orbiterRotation += (nR - aR);

    return this.orbiterRotation;
  }
  pointerDownHandler() {
    this.longPressTimeout = setTimeout(this.longPressHandler, 750);

    window.addEventListener('mouseup', this.pointerUpHandler);
    window.addEventListener('touchend', this.pointerUpHandler);
  }
  pointerUpHandler(e) {
    this.longPressTimeout = clearTimeout(this.longPressTimeout);
    window.removeEventListener('mouseup', this.pointerUpHandler);
    window.removeEventListener('touchend', this.pointerUpHandler);

    if (this.state.isOptionsPanelOpen) {
      // get coordinates relative to timer center
      const bb = this.ref.getBoundingClientRect();
      const { top, left, height, width } = bb;
      let x = -(left + (width / 2));
      let y = -(top + (height / 2));
      if (e.type === 'mouseup') {
        x += e.pageX;
        y += e.pageY;
      } else {
        if (e.touches.length > 0) {
          x += e.touches[0].x;
          y += e.touches[0].y;
        } else {
          x += e.changedTouches[0].x;
          y += e.changedTouches[0].y;
        }
      }

      // execute corner action
      if (x < -width / 3 && y < -height / 3) {
        console.log(`[${this.state.initials}] TOP LEFT CORNER ACTION (not defined yet)`);
      } else if (x > width / 3 && y < -height / 3) {
        console.log(`[${this.state.initials}] TOP RIGHT CORNER ACTION (not defined yet)`);
      } else if (x > width / 3 && y > height / 3) {
        console.log(`[${this.state.initials}] BOTTOM RIGHT CORNER ACTION (clear)`);
        this.props.clear(this.props.id);
      } else if (x < -width / 3 && y > height / 3) {
        console.log(`[${this.state.initials}] BOTTOM LEFT CORNER ACTION (not defined yet)`);
      } else {
        console.log(`[${this.state.initials}] NO ACTION`);
      }

      this.setState({
        isOptionsPanelOpen: false,
      });

      setTimeout(() => {
        this.isTimerToggleDisabled = false;
      }, 400);
    }
  }
  longPressHandler() {
    this.isTimerToggleDisabled = true;
    this.setState({
      isOptionsPanelOpen: true,
    });
  }

  /** Render **/
  render() {
    const { label, picture, color, hotkey, currentTimer } = this.props;
    const { stackedTime, initials, isOptionsPanelOpen } = this.state;

    const classes = {
      base: classnames(style.base, {
        [style.running]: !!currentTimer,
        [style.panelOpen]: isOptionsPanelOpen,
      }),
      clearAction: classnames(style.action, style.clear),
    };

    const inlineStyles = {
      base: {
        color,
      },
      infoWrapper: {
        color: color && contrast(color) === 'light' ? '#000' : '#FFF',
      },
      orbiter: {
        backgroundColor: color,
        transform: `rotate(${this.orbiterRotation}deg)`,
      },
      background: {
        backgroundImage: `url(${picture})`,
      },
    };

    return (
      <div
        className={classes.base}
        style={inlineStyles.base}
        title={label}
        ref={r => { this.ref = r; }}
      >
        <div className={style.infoWrapper} style={inlineStyles.infoWrapper}>
          <div className={style.label}>{initials}</div>
          <div className={style.stackedTime}>{numeral(stackedTime / 1000).format('00:00:00')}</div>
          <div className={style.hotkey}>{hotkey}</div>
        </div>
        <div className={style.actionsWrapper}>
          <div className={classes.clearAction}></div>
        </div>
        <div className={style.orbiter} style={inlineStyles.orbiter}></div>
        <div className={style.background} style={inlineStyles.background} />
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
