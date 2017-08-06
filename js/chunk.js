/**
 * Created by pangang on 2017/8/6.
 */
function chunk(array, size) {
  size = Math.max(size, 0)
  const length = array == null ? 0 : array.length
  if (!length || size < 1) {
    return []
  }
  let index = 0
  let restIndex = 0
  const result = new Array(Math.ceil(length / size))
  while (index < length) {
    result[restIndex++] = slice(array, index, (index += size))
  }
}
export default chunk