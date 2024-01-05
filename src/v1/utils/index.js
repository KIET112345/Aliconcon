const { Types} = require('mongoose');

const covertToObjectIdMongodb = id => Types.ObjectId(id);

const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((el) => [el, 1]));
};

const unGetSelectData = (unSelect = []) => {
  return Object.fromEntries(unSelect.map((el) => [el, 0]));
};

const removeNullOrUndefinedObject = (obj) => {
  Object.keys(obj).forEach((k) => {
    if (obj[k] == null || obj[k] == undefined) {
      delete obj[k];
    }
  });
  return obj;
};

const updateNestedObjectParse = (obj) => {
  const final = {};
  console.log("obj", obj)
  Object.keys(obj).forEach((k) => {
    if (typeof obj[k] === "Object" && !Array.isArray(obj[k])) {
      const response = updateNestedObjectParse(obj[k]);
      Object.keys(response).forEach((a) => {
        final[`${k}.${a}`] = response[a];
      });
    } else {
      final[k] = obj[k];
    }
  });
  console.log('final', final)
  return final;
};
module.exports = {
  getSelectData,
  unGetSelectData,
  removeNullOrUndefinedObject,
  updateNestedObjectParse,
  covertToObjectIdMongodb
};
