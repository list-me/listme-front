/* eslint-disable no-restricted-syntax */
function isEmptyObject(obj: Object): boolean {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

export default isEmptyObject;
