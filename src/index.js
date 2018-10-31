const { useEffect } = require('react');
const { onKeyPress, convertToAsciiEquivalent, getAsciiCode } = require('./keys.js');

const useKey = (callback, { detectKeys = [] } = {}, { dependencies = [] } = {}) => {
  let allowedKeys = detectKeys;
  if (!window || !window.document || !callback) {
    throw new Error();
  }

  if (!Array.isArray(dependencies)) {
    throw new Error(typeof dependencies);
  }

  if (!Array.isArray(detectKeys)) {
    allowedKeys = [];
    console.warn('Keys should be array!');
  }
  allowedKeys = convertToAsciiEquivalent(allowedKeys);
  useEffect(() => {
    window.document.addEventListener('keydown', event => onKeyPress(getAsciiCode(event), callback, allowedKeys));
    return () => {
      window.document.removeEventListener('keydown', onKeyPress);
    };
  }, dependencies);
};

module.exports = useKey;
