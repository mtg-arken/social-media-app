const BodyValidation = (schema) => async (req, res, next) => {
  const body = req.body;
  try {
    await schema.validate(body);
    next();
  } catch (error) {
    return res.status(400).json({ error : error.errors });
  }
};
const ParamsValidation = (schema) => async (req, res, next) => {
  const params = req.params;
  try {
    await schema.validate(params);
    next();
  } catch (error) {
    return res.status(400).json(error);
  }
};
module.exports = { BodyValidation, ParamsValidation };
