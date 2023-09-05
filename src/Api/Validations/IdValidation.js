const yup = require("yup");

const IdSchema = (fieldName = "ID") => {
  return yup.object().shape({
    [fieldName]: yup.string().required("id required"),
  });
};

module.exports = IdSchema;
