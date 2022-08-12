const accurateSetInterval = function (callback, delay) {
    let nextAt, timeout;

    nextAt = new Date().getTime() + delay;
    timeout = null;

    const wrapper = function () {
      nextAt += delay;
      timeout = setTimeout(wrapper, nextAt - new Date().getTime());
      return callback();
    };

    const cancel = function () {
      return clearTimeout(timeout);
    };

    timeout = setTimeout(wrapper, nextAt - new Date().getTime());

    return {
        cancel
    };
};

export default accurateSetInterval;