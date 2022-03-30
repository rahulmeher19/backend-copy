const httpStatus = require('http-status');
const { Node } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a node
 * @param {Object} nodeBody
 * @returns {Promise<Node>}
 */
const createNode = async (nodeBody) => {
  if (await Node.isNodeNameTaken(nodeBody.nodeName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'NodeName already taken');
  }
  return Node.create(nodeBody);
};

/**
 * Query for nodes
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryNodes = async (filter, options) => {
  const nodes = await Node.paginate(filter, options);
  return nodes;
};

/**
 * Get node by id
 * @param {ObjectId} id
 * @returns {Promise<Node>}
 */
const getNodeById = async (id) => {
  return Node.findById(id);
};

/**
 * Get user by nodeName
 * @param {string} nodeName
 * @returns {Promise<Node>}
 */
const getNodeBynodeName = async (nodeName) => {
  return Node.findOne({ nodeName });
};

/**
 * Update node by id
 * @param {ObjectId} nodeId
 * @param {Object} updateBody
 * @returns {Promise<Node>}
 */
const updateNodeById = async (nodeId, updateBody) => {
  const node = await getNodeById(nodeId);
  if (!node) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Node not found');
  }
  if (updateBody.nodeName && (await Node.isNodeNameTaken(updateBody.nodeName, nodeId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Node already taken');
  }
  Object.assign(node, updateBody);
  await node.save();
  return node;
};

/**
 * Delete node by id
 * @param {ObjectId} nodeId
 * @returns {Promise<Node>}
 */
const deleteNodeById = async (nodeId) => {
  const node = await getNodeById(nodeId);
  if (!node) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Node not found');
  }
  await node.remove();
  return node;
};

module.exports = {
  createNode,
  queryNodes,
  getNodeById,
  getNodeBynodeName,
  updateNodeById,
  deleteNodeById,
};
