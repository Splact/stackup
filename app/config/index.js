import api from './api';
import log from './log';
import storage from './storage';
import i18n from './i18n';
import pkg from '../../package.json';

const isProd = process.env.NODE_ENV === 'production';

const options = {
  pkg,
  isProd,
};

export default {
  isDev: !isProd,
  isProd,
  api: api(options),
  log: log(options),
  storage: storage(options),
  i18n: i18n(options),
};
