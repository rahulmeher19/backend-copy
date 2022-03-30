const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { nodeService } = require('../services');
const { apiResponse, genApiResponse } = require('./status.controller');

const createNode = catchAsync(async (req, res) => {
  const node = await nodeService.createNode(req.body);
  const message = 'Node is Successfully Created!';
  apiResponse.data = { node };
  apiResponse.message = { message };
  res.status(httpStatus.CREATED).send(genApiResponse(200, true, null, { node }, message));
});

const getAllNode = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['nodeName', 'nodeTitle']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await nodeService.queryNodes(filter, options);
  const message = 'All Node Detail!';
  apiResponse.data = { result };
  return res.status(httpStatus.OK).send(genApiResponse(200, true, null, { result }, message));
});

const getNode = catchAsync(async (req, res) => {
  const node = await nodeService.getNodeById(req.params.id);
  if (!node) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Node not found');
  }
  const message = 'Node Details!';
  apiResponse.data = { node };
  return res.status(httpStatus.OK).send(genApiResponse(200, true, null, { node }, message));
});

const updateNode = catchAsync(async (req, res) => {
  const node = await nodeService.updateNodeById(req.params.id, req.body);
  const message = 'Node is Updated Sucessfully!';
  return res.status(httpStatus.OK).send(genApiResponse(200, true, null, { node }, message));
});

const deleteNode = catchAsync(async (req, res) => {
  await nodeService.deleteNodeById(req.params.id);
  res.status(httpStatus.OK).send({ message: 'Node is Deleted Successfully!' });
});

module.exports = {
  createNode,
  getAllNode,
  getNode,
  updateNode,
  deleteNode,
};
