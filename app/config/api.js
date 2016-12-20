const config = ({ isProd }) => {
  let mergedConfig = {};

  if (isProd) {
    mergedConfig = Object.assign({}, mergedConfig, {
      baseURL: 'http://path-to-api.com',
    });
  } else {
    mergedConfig = Object.assign({}, mergedConfig, {
      baseURL: 'http://dev.path-to-api.com',
    });
  }

  return mergedConfig;
};

export default config;
