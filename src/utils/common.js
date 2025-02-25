const removeProperties = (obj, properties) => {
  const newObj = { ...obj };
  properties.forEach((prop) => {
    delete newObj[prop];
  });
  return newObj;
};

module.exports = { removeProperties };
