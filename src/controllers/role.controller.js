const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { roleService } = require('../services');
const { apiResponse, genApiResponse } = require('./status.controller');

const createRole = catchAsync(async (req, res) => {
  const role = await roleService.createRole(req.body);
  const message = 'Role is Successfully Created!';
  apiResponse.data = { role };
  apiResponse.message = { message };
  console.log(apiResponse);
  return res.status(httpStatus.CREATED).send(genApiResponse(200, true, null, { role }, message));
});

const getAllRole = catchAsync(async (req, res) => {
  let paginationType = null ;
  if(!!req.query){
    paginationType = !!req.query.paginationType ? req.query.paginationType : paginationType  
  }

  let isPagination = true
  if(paginationType == "all"){
    isPagination = false;
  } 
  const filter = pick(req.query, ['roleName', 'roleTitle']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  
  let responseData = null;
  let pagination = null;
  
  const result = await roleService.queryRoles(filter, options , isPagination);
  const message = 'All Role Detail!';

  responseData = result;

  if(result.results) {
    responseData = result.results;
    pagination = {
      currentPage: result.page,
      lastPage: result.totalPages,
    }
  }
    
  return res.status(httpStatus.OK).send(genApiResponse(200,
     true, null, responseData, message, pagination));
});

const getRole = catchAsync(async (req, res) => {
  const role = await roleService.getRoleById(req.params.id);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  const message = 'Role Details!';
  apiResponse.data = { role };
  return res.status(httpStatus.OK).send(genApiResponse(200, true, null, { role }, message));
});

const updateRole = catchAsync(async (req, res) => {
  const role = await roleService.updateRoleById(req.params.id, req.body);
  const message = 'Role is Updated Sucessfully!';
  return res.status(httpStatus.OK).send(genApiResponse(200, true, null, { role }, message));
});

const deleteRole = catchAsync(async (req, res) => {
  const role = await roleService.deleteRoleById(req.params.id);
  apiResponse.data = {role};
  return res.status(httpStatus.OK).send(genApiResponse(200, true, null, {role},{ message: 'Role is Deleted Successfully!' }));
});

module.exports = {
  createRole,
  getAllRole,
  getRole,
  updateRole,
  deleteRole,
};
