export const FEATURE_NAME = 'localStorage';

export default (() => {
  if (!(FEATURE_NAME in window)) {
    return false;
  }

  const TEST_KEY = 'test-key';
  const TEST_VALUE = 'test-value';

  try {
    localStorage.setItem(TEST_KEY, TEST_VALUE);

    const value = localStorage.getItem(TEST_KEY);

    localStorage.removeItem(TEST_KEY);

    return value === TEST_VALUE;
  } catch (error) {
    return false;
  }
})();
