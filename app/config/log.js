const config = ({ isProd }) => {
  let mergedConfig = {};

  if (!isProd) {
    mergedConfig = Object.assign({}, mergedConfig, {
      saga: {
        verbose: false,
      },
    });
  }

  return mergedConfig;
};

export default config;
