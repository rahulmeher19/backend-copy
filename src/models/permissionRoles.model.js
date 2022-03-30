const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const permissionRoleSchema = new mongoose.Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
    },
    role_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    },
    permission_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission"

    },
})

// add plugin that converts mongoose to json
permissionRoleSchema.plugin(toJSON);
permissionRoleSchema.plugin(paginate);

/**
 * @typedef PermissionRole
 */


const PermissionRole = mongoose.model('PermissionRole', permissionRoleSchema);

async function addPermissionRoleRealationCollection(){
    const newPermissionRole = new PermissionRole({
        role_id:"623db5ddc0a8bb23704ae917",
        permission_id:"62431b3c9b02e82028a32fdc",
    })
    newPermissionRole.save()
}
// addPermissionRoleRealationCollection()

module.exports = PermissionRole;