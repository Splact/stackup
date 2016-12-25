import { handleActions } from 'redux-actions';
import {
    PROJECT_CREATE,
    PROJECT_UPDATE_INFO,
    PROJECT_START_TIMER,
    PROJECT_STOP_TIMER,
    PROJECT_CLEAR,
    PROJECT_DISCARD,
    PROJECT_PIN,
    PROJECT_UNPIN,
} from '../actions/project';

// define initial state
const defaultState = {
  list: [],

  isLoading: false,
  error: null,
};

const reducerMap = {
  [PROJECT_CREATE]: ({ list, ...state }, { payload }) => {
    const { id, label, color, initialTime } = payload;
    let streaks = [];

    if (initialTime > 0) {
      const now = new Date();
      streaks = [
        [new Date(now.getTime() - initialTime), now],
      ];
    }

    return {
      ...state,
      list: [
        ...list,
        {
          id,
          label,
          color,
          hotkey: null,
          streaks,
          currentTimer: null,
          isPinned: false,
        },
      ],
    };
  },
  [PROJECT_UPDATE_INFO]: ({ list, ...state }, { payload }) => {
    const { id, picture, color } = payload;

    return {
      ...state,
      list: list.map(p => {
        if (p.id === id) {
          return {
            ...p,
            picture,
            color,
          };
        }

        return { ...p };
      }),
    };
  },
  [PROJECT_START_TIMER]: ({ list, ...state }, { payload: id }) => {
    return {
      ...state,
      list: list.map(p => {
        if (p.id === id) {
          return {
            ...p,
            currentTimer: new Date(),
          };
        }

        return { ...p };
      }),
    };
  },
  [PROJECT_STOP_TIMER]: ({ list, ...state }, { payload: id }) => {
    return {
      ...state,
      list: list.map(p => {
        if (p.id === id) {
          return {
            ...p,
            streaks: [
              ...p.streaks,
              [p.currentTimer, new Date()],
            ],
            currentTimer: null,
          };
        }

        return { ...p };
      }),
    };
  },
  [PROJECT_CLEAR]: ({ list, ...state }, { payload: id }) => ({
    ...state,
    list: list.map(p => {
      if (p.id === id) {
        return {
          ...p,
          streaks: [],
          currentTimer: null,
        };
      }

      return { ...p };
    }),
  }),
  [PROJECT_DISCARD]: ({ list, ...state }, { payload: id }) => ({
    ...state,
    list: list.filter(p => p.id !== id),
  }),
  [PROJECT_PIN]: ({ list, ...state }, { payload: id }) => ({
    ...state,
    list: list.map(p => {
      if (p.id === id) {
        return {
          ...p,
          isPinned: true,
        };
      }

      return { ...p };
    }),
  }),
  [PROJECT_UNPIN]: ({ list, ...state }, { payload: id }) => ({
    ...state,
    list: list.map(p => {
      if (p.id === id) {
        return {
          ...p,
          isPinned: false,
        };
      }

      return { ...p };
    }),
  }),
};

export default handleActions(reducerMap, defaultState);
