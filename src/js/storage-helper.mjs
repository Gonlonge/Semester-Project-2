/**
 * Save data on storage
 * @param {string} key – save on storage based on a key
 * @param {string} value – object data to store
 */
function save(key, value) {
  console.log("Storing:");
  console.table(value);
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Load data on storage
 * @param {string} key – load from storage based on a key
 * @returns {any} stored object data
 */
function load(key) {
  const value = localStorage.getItem(key);
  if (value) {
    try {
      const obj = JSON.parse(value);
      console.log("Getting:");
      console.table(obj);
      return obj;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  return null;
}

/**
 * delete data on storage
 * @param {string} key – delete object based on a key
 */
function remove(key) {
  localStorage.removeItem(key);
}

export { save, load, remove };
