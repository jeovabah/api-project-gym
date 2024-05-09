function buildSuccessResponse(data, message = "Sucesso") {
  return {
      message: message,
      status: true,
      response: data,
      error: null,
  };
}

function buildErrorResponse(error, message = "Erro interno") {
  return {
      message: message,
      status: false,
      response: null,
      error: error,
  };
}

module.exports = {
  buildSuccessResponse,
  buildErrorResponse,
};
