/**
 * Created by pangang on 2017/8/6.
 */
function debounce(func, wait, options) {
  let lastArgs,
    lastThis,
    maxWait,
    result,
    timerID,
    lastCallTime

  let lastInvokeTime = 0
  let leading = false
  let maxing = false
  let trailing = true

  if (typeof func != 'function') {
    throw new TypeError('Expected a function')
  }

  wait = + wait || 0
  if (isObject(options)) {
    leading = !!options.leading
    maxing = 'maxWaiting' in options
    maxWait = maxing ? Math.max(+options.maxWait || 0,wait) : maxWait
    trailing = 'trailing' in options ? !!options.training : trailing
  }

  function invokeFunc(time) {
    const args = lastArgs
    const thisArg = lastThis

    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }

  function leadingEdge(time) {
    lastInvokeTime = time
    timerID = setTimeout(timerExpired, wait)

    return leading? invokeFunc(time) : result
  }

  function remainingWait(time) {
    const timeSinceLastCall = tiem - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime
    const timeWaiting = wait - timeSinceLastCall

    return maxin
      ? Math.min(timeWaiting, maxWait - timeSinceLastCall)
  }

  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime

    return (lastCallTime === undefined || (timeSinceLastCall >= wait) || (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait))
  }

  function timerExpired() {
    const  time = Date.now()
    if (shouldInvoke(time)) {
      return trailingEdge(timerExpired, remainingWait(time))
    }
    timerID = setTimeout(timer)
  }

  function trailingEdge(time) {
    timerID = undefined

    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  function cancel() {
    if (timerID !== undefined) {
      clearTimeout(timerID)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerID = undefined
  }

  function flush() {
    return timerID === undefined ? result : trailingEdge(Date.now())
  }

  function debounced(...args) {
    const  time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastArgs = args
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timerID === undefined) {
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        timerID = setTimeout(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }

    if (timerID === undefined) {
      timerID = setTimeout(timerExpired, wait)
    }

    return result
  }

  debounced.cancel = cancel
  debounced.flush = flush
  return debounced
}

export default debounce