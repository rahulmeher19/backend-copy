const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');


const roleSchema = mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    roleTitle: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    lastUpdatedOn: {
      type: Date,
      default: Date.now
    },
    lastUpdatedBy: {
      type: String,
    },
    permissions: [
      {
        type: String,
        default: false,
        required: false
      }
    ]
  },

  {
    timestamps: true,
  }
);
/**
 * Check if roleName is taken
 * @param {string} roleName - The role's roleName
 * @returns {Promise<boolean>}
 */
roleSchema.statics.isRoleNameTaken = async function (roleName) {
  const role = await this.findOne({ roleName });
  return !!role;
};

// add plugin that converts mongoose to json
roleSchema.plugin(toJSON);
roleSchema.plugin(paginate);

/**
 * @typedef Role
 */
const Role = mongoose.model('Role', roleSchema);

module.exports = Role;