import axios from 'axios';
// import config from '../../config';

class WebApi {
  constructor(axiosConfig) {
    this.$ = axios.create(axiosConfig);
    this.authToken = null;

    // bind methods
    this.responseHandler = this.responseHandler.bind(this);
    this.errorHandler = this.errorHandler.bind(this);
    this.updateAuthToken = this.updateAuthToken.bind(this);
    this.call = this.call.bind(this);
  }

  responseHandler(response) {
    return response.data;
  }
  errorHandler(response) {
    let error;

    if (response instanceof Error) {
      error = {
        status: 500,
        message: response.message,
      };
    } else if (!response) {
      error = {
        status: 500,
        message: 'No response received.',
      };
    } else if (response.status >= 400) {
      error = {
        status: response.status,
        message: response.data.message,
      };
    }

    throw error;
  }

  updateAuthToken({ data }) {
    const { token } = data;

    return new Promise((resolve, reject) => {
      try {
        // Alter defaults after instance has been created
        this.$.defaults = Object.assign(this.$.defaults, {
          headers: {
            common: {
              Authorization: `Bearer ${token}`,
            },
          },
        });

        this.authToken = token;

        resolve({ token });
      } catch (e) {
        reject(e);
      }
    });
  }

  call(request, isAuthenticationRequired = false) {
    // init a mock promise providing common "then" and "catch" methods
    let callPromise = new Promise(resolve => resolve());

    // require authentication if needed
    if (isAuthenticationRequired) {
      callPromise = callPromise.then(this.authenticate);
    }

    // INFO: other pre-request promises can be appended here

    // add "request" as core functionality into promise
    callPromise = callPromise.then(request);

    // INFO: other post-request promises can be appended here

    // end promise with response and error handlers
    callPromise = callPromise
      .then(this.responseHandler)
      .catch(this.errorHandler);

    return callPromise;
  }

  // public methods

  // make a Facebook connection with accessToken provided by Facebook API
  // facebookLogin({ accessToken }) {
  //   const request = () => this.$.request({
  //     url: '/login/facebook',
  //     method: 'post',
  //     data: {
  //       access_token: accessToken,
  //     },
  //   }).then(this.updateAuthToken);

  //   return this.call(request, true);
  // }

  fetchUser({ id }) {
    const request = () => this.$.request({
      url: `http://jsonplaceholder.typicode.com/users/${id}`,
      method: 'get',
    });

    return this.call.bind(null, request, false);
  }
}

export default new WebApi({
  // baseUrl: config.api.baseURL,
});
