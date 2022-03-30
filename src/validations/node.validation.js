const Joi = require('joi');
const {objectId } = require('./custom.validation');

const createNode = {
  body: Joi.object().keys({
    nodeName: Joi.string().required(),
    parentNode:Joi.string().required(),
    lastUpdatedOn: Joi.string(),
    lastUpdatedBy: Joi.string(),
  }),
};

const getAllNode = {
  query: Joi.object().keys({
    nodeName: Joi.string(),
    parentNode:Joi.string(),
    lastUpdatedOn: Joi.string(),
    lastUpdatedBy: Joi.string(),
  }),
};

const getNode = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateNode = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
        nodeName: Joi.string().required(),
        parentNode:Joi.string().required(),
        lastUpdatedOn: Joi.string(),
        lastUpdatedBy: Joi.string(),
    })
    .min(1),
};

const deleteNode = {
  params: Joi.object().keys({
    objectId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createNode,
  getAllNode,
  getNode,
  updateNode,
  deleteNode,
};
