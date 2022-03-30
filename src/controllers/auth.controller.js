const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');
const { apiResponse, genApiResponse } = require('./status.controller');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  const message = "User is Register Successfully!"
  apiResponse.data = { user, tokens };
  apiResponse.message = "User is Register Successfully!"
  console.log(apiResponse);
  return res.status(httpStatus.CREATED).send(genApiResponse(200, true, null, { user, tokens }, message));
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  const message = "User is Successfully Login!"
  apiResponse.data = { user, tokens };
  apiResponse.message = "User is Successfully Login!"
  console.log(apiResponse)
  return res.status(httpStatus.CREATED).send(genApiResponse(200, true, null, { user, tokens }, message));
});

const logout = catchAsync(async (req, res) => {
  const user = await authService.logout(req.body.refreshToken);
  apiResponse.data = { user };
  return res.status(httpStatus.OK).send(genApiResponse(200, true, null, { user }, { message: 'User is Logout Successfully!' }));
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  const message = "Password Reset Link send to your Email ID"
  apiResponse.message = "Password Reset Link send to your Email ID"
  return res.status(httpStatus.OK).send(genApiResponse(200, true, null,{ }, message));
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  const message = "Password Reset Successfully!"
  apiResponse.message = "Password Reset Successfully!"
  return res.status(httpStatus.OK).send(genApiResponse(200, true, null, {}, message));
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});


module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
