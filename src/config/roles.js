const allRoles = {
  user: ['updateUser','createUser'],
  admin: ['createUser','getAllUser','updateUser','deleteUser'],
  node:[],
  role:['createRole','getAllRole','updateRole','deleteRole']
};


const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
