/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
const { User, Role } = require('../models');
// const { permissionType } = require('../models');
const RoleModel = require('../models/role.model');

const getAllPermission = async (roleId) => {
  const permissionsRow = await RoleModel.findById(roleId);
  console.log({ permissionsRow });
  return permissionsRow.permissions;
};

const ApiError = require('../utils/ApiError');
/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  const permissions = await getAllPermission(userBody.role);
  userBody.permissions = permissions;
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  console.log({ userBody });
  // const typePermissions = await permissionType.find({role_Module:'user'});
  // filter user permissions data from rolepermission variable
  // put filtered permissions in userBody object
  // save data in User and see if  permissions array is being saved

  return User.create(userBody);
  // console.log(typePermissions);
  // return {};
};

/**
 * Get user by role_id
 * @param {ObjectId} role_id
 * @returns {Promise<User>}
 */
const getPermissions = async (role_id) => {
  const permissionRole = await RoleModel.findOne({ _id: role_id });
  console.log({ permissionRole });
  return permissionRole.permissions;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options, isPaginate = true) => {
  if (!isPaginate) {
    return await User.find(options);
  }
  return await User.paginate(filter, options);
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  console.log({ userId, updateBody });
  const roleId = updateBody.role;
  const permissions = await getAllPermission(roleId);
  updateBody.permissions = permissions;
  console.log({ updateBody });
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getPermissions,
  getUserByEmail,
  updateUserById,
  deleteUserById
};
