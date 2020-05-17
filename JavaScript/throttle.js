//throttle.js

var debounce = require('./debounce'), //debounce方法
  isObject = require('./isObject'); //判断是否为对象

var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * 函数节流
 *
 * @param {Function} func 需要处理的函数.
 * @param {number} [wait=0] 执行间隔.
 * @param {Object} [options={}] 选项对象.
 * @param {boolean} [options.leading=false] 指定是否在超时前调用.
 * @param {number} [options.maxWait] func延迟调用的最大时间.
 * @param {boolean} [options.trailing=true] 指定是否在超时后调用.
 * @returns {Function} 返回节流之后的函数.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
    trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

module.exports = throttle;