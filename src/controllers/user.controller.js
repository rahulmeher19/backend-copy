const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const { apiResponse, genApiResponse } = require('./status.controller');
const RoleModel = require('../models/role.model');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const message = 'User is Successfully Created!';
  apiResponse.data = { user };
  apiResponse.message = { message };
  return res.status(httpStatus.CREATED).send(genApiResponse(200, true, null, { user }, message));
});

const getAllUser = catchAsync(async (req, res) => {
  let paginationType = null;
  if (req.query) {
    paginationType = req.query.paginationType ? req.query.paginationType : paginationType;
  }

  let isPagination = true;
  if (paginationType == 'all') {
    isPagination = false;
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const filter = pick(req.query, ['email', 'firstName', 'phoneNo']);

  let responseData = null;
  let pagination = null;

  const result = await userService.queryUsers(filter, options, isPagination);
  const message = 'All User Detail!';

  responseData = result;

  if (result.results) {
    responseData = result.results;
    pagination = {
      currentPage: result.page,
      lastPage: result.totalPages,
    };
  }

  return res.status(httpStatus.OK).send(genApiResponse(200, true, null, responseData, message, pagination));
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  console.log(user, 'user 200');
  const permission = await RoleModel.findOne({ _id: user.role_id }, { permissions: 1 });
  // user.permissions = permission;
  const data = { user, permission: permission.permissions };
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const message = 'User Details!';
  apiResponse.data = { user };
  return res.status(httpStatus.OK).send(genApiResponse(200, true, null, { data }, message));
});

const getPermissions = catchAsync(async (req, res) => {
  const user = await userService.getPermissions(req.params.role_id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role ID not found');
  }
  const message = 'Role Permission Details!';
  apiResponse.data = { user };
  return res.status(httpStatus.OK).send(genApiResponse(200, true, null, { user }, message));
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.id, req.body);
  const message = 'User is Updated Sucessfully!';
  return res.status(httpStatus.OK).send(genApiResponse(200, true, null, { user }, message));
});

const deleteUser = catchAsync(async (req, res) => {
  const user = await userService.deleteUserById(req.params.id);
  apiResponse.data = { user };
  return res
    .status(httpStatus.OK)
    .send(genApiResponse(200, true, null, { user }, { message: 'User is Deleted Successfully!' }));
});

module.exports = {
  createUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
  getPermissions,
};
