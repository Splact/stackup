import { PropTypes } from 'react';
import datePropType from './date';

export default PropTypes.shape({
  id: PropTypes.string,
  label: PropTypes.string,
  color: PropTypes.string,
  hotkey: PropTypes.string,
  streaks: PropTypes.arrayOf(
    PropTypes.arrayOf(datePropType)
  ),
  currentTimer: datePropType,
});
