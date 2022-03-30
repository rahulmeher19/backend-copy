const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    phoneNo: Joi.number().required(),
    password: Joi.string().required().custom(password),
    // role_id: Joi.string(),
    // permissions:Joi.string().required(),
  }),
};

const getAllUser = {
  query: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    phoneNo: Joi.number().integer(),
    password: Joi.string(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email(),
      phoneNo: Joi.number().integer(),
      password: Joi.string().custom(password),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const getPermissions = {
  params: Joi.object().keys({
    role_id: Joi.string().custom(objectId),
    // permissions: Joi.string(),
  }),
};
module.exports = {
  createUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
  getPermissions,
};
