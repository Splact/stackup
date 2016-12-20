const config = ({ pkg, isProd }) => {
  let mergedConfig = {
    options: {
      name: pkg.name,
      version: 1.0,
      storeName: `${pkg.name}-local`,
      description: `Persistent storage for ${pkg.name}`,
    },
    whitelist: [
      'projects',
      // You can also whitelist a nested key (example.foo)
      // [ 'example', 'foo' ]
    ],
    blacklist: [
      // Same as whitelist
    ],
    debounceTime: 2000,
  };

  if (isProd) {
    mergedConfig = Object.assign({}, mergedConfig, {
      key: 'C1DW90Q4L9T0FUoyD2p2SyBvC1746djt',
    });
  } else {
    mergedConfig = Object.assign({}, mergedConfig, {
      key: 'r8tubPFAi5OP33n4plJqUxp19KD1Tqbl',
    });
  }

  return mergedConfig;
};

export default config;
