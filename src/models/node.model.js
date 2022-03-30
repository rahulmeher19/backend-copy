const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const nodeSchema = mongoose.Schema(
  {
    nodeName: {
      type: String,
      required: true,
      trim: true,
      unique:true,
    },
    parentNode: {
      type: String,
      required: true,
      trim: true,
    },
    lastUpdatedOn: {
    type: Date,
    default: Date.now
    },
    lastUpdatedBy: {
    type: String,   
    },
    role: {
    type: String,
    enum: roles,
    default: 'node',
    },
  },
  {
    timestamps: true,
  }
);
/**
 * Check if nodeName is taken
 * @param {string} nodeName - The node's nodeName
 * @returns {Promise<boolean>}
 */
 nodeSchema.statics.isNodeNameTaken = async function (nodeName) {
  const node = await this.findOne({ nodeName});
  return !!node;
};

// add plugin that converts mongoose to json
nodeSchema.plugin(toJSON);
nodeSchema.plugin(paginate);

/**
 * @typedef Node
 */
const Node = mongoose.model('Node', nodeSchema);

module.exports = Node;