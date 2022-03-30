const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const Roles = require('./modules.model')
const Modules = require("./modules.model")
const permissionSchema = new mongoose.Schema(

    {
        name: {
            type: String,
            name: ""
        },
        slug: {
            type: String,
            unique: true,
            name: ""
        },
        modules_Id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Modules"

        }
    }
);

const Permission = mongoose.model('Permission', permissionSchema);

async function addPermissionRelationCollection() {
    const permissionPrefix = ["Create" , "Read" , "Update" , "Delete"]
    const modulesRow = await Modules.find({})
    console.clear()
    console.log({modulesRow})
    modulesRow.forEach(_module =>{
        permissionPrefix.forEach(_permission => {
            console.log({
               
            })
            const newPermission = new Permission({
                slug: `${_permission.toLocaleLowerCase()}-${_module.name.toLocaleLowerCase()}`,
                name: `${_permission} ${_module.name}`,
            })
            newPermission.save()
        })
    })
    // const newPermission = new Permission({
    //     slug: "create-role ",
    //     name: "Create Role",
    //     modules_Id: "624315887113012540414167"
    // })
    // newPermission.save()
}
// addPermissionRelationCollection()
module.exports = Permission;