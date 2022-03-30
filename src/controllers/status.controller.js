
const  apiResponse = {
    code: 200,
    success: true,
    error: null,
    data: [], 
    message: '',
    pagination: null,
  };

  function genApiResponse (code = 200 , success = true , error = null , data = [] , message = "", pagination = null){
    return {code , success , error , data , message, pagination }
  }

  module.exports = {
    apiResponse, 
    genApiResponse
  }