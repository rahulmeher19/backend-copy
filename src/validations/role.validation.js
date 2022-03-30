const Joi = require('joi');
const {objectId } = require('./custom.validation');

const createRole = {
  body: Joi.object().keys({
    roleName: Joi.string().required(),
    roleTitle:Joi.string().required(),
    description:Joi.string().required(),
    permissions:Joi.string(),
    lastUpdatedOn: Joi.string(),
    lastUpdatedBy: Joi.string(),
  }),
};

const getAllRole = {
  query: Joi.object().keys({
    roleName: Joi.string(),
    roleTitle:Joi.string(),
    description:Joi.string(),
    lastUpdatedOn: Joi.string(),
    lastUpdatedBy: Joi.string(),
  }),
};

const getRole = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateRole = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      roleName: Joi.string().required(),
      roleTitle:Joi.string().required(),
      description:Joi.string().required(),
      lastUpdatedOn: Joi.string(),
      lastUpdatedBy: Joi.string(), 
    })
    .min(1),
};

const deleteRole = {
  params: Joi.object().keys({
    objectId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createRole,
  getAllRole,
  getRole,
  updateRole,
  deleteRole,
};
