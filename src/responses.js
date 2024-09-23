// send a response
const respond = (request, response, status, object, type) => {
  // print it
  console.log(object);
  // send the response
  response.writeHead(status, {
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(object, 'utf8'),
  });
  response.write(object);
  response.end();
};

const success = (request, response) => {
  // for all of these - if XML isnt asked for the default is json
  if (request.type === 'text/xml') {
    let XMLresponse = '<response>';
    XMLresponse = `${XMLresponse} <message>This is a successful response</message>`;
    XMLresponse = `${XMLresponse} </response>`;

    return respond(request, response, 200, XMLresponse, 'text/xml');
  }

  const JSONresponse = {
    message: 'This is a successful response',
    id: 'success',
  };

  const JSONstring = JSON.stringify(JSONresponse);

  return respond(request, response, 200, JSONstring, 'application/json');
};

const badRequest = (request, response) => {
  // xml
  if (request.type === 'text/xml') {
    // if the request isnt valid return bad request
    if (!request.query.valid || request.query.valid !== 'true') {
      let XMLresponse = '<response>';
      XMLresponse = `${XMLresponse} <message>Missing valid query param</message>`;
      XMLresponse = `${XMLresponse} <id>badRequest</id>`;
      XMLresponse = `${XMLresponse} </response>`;

      return respond(request, response, 400, XMLresponse, 'text/xml');
    }

    // otherwise its fine
    let XMLresponse = '<response>';
    XMLresponse = `${XMLresponse} <message>Has required param</message>`;
    XMLresponse = `${XMLresponse} <id>success</id>`;
    XMLresponse = `${XMLresponse} </response>`;

    return respond(request, response, 200, XMLresponse, 'text/xml');
  }

  // json
  // invalid
  if (!request.query.valid || request.query.valid !== 'true') {
    const JSONresponse = {
      message: 'Missing valid query param',
      id: 'badRequest',
    };

    const JSONstring = JSON.stringify(JSONresponse);

    return respond(request, response, 400, JSONstring, 'application/json');
  }
  // valid
  const JSONresponse = {
    message: 'Has required param',
    id: 'success',
  };

  const JSONstring = JSON.stringify(JSONresponse);

  return respond(request, response, 200, JSONstring, 'application/json');
};

const unauthorized = (request, response) => {
  // xml
  if (request.type === 'text/xml') {
    // not authorized
    if (!request.query.loggedIn || request.query.loggedIn !== 'yes') {
      let XMLresponse = '<response>';
      XMLresponse = `${XMLresponse} <message>You are unauthorized to view this page</message>`;
      XMLresponse = `${XMLresponse} <id>unauthorized</id>`;
      XMLresponse = `${XMLresponse} </response>`;

      return respond(request, response, 401, XMLresponse, 'text/xml');
    }

    // authorized
    let XMLresponse = '<response>';
    XMLresponse = `${XMLresponse} <message>You are authorized to view this page</message>`;
    XMLresponse = `${XMLresponse} <id>success</id>`;
    XMLresponse = `${XMLresponse} </response>`;

    return respond(request, response, 200, XMLresponse, 'text/xml');
  }

  // json
  // invalid
  if (!request.query.loggedIn || request.query.loggedIn !== 'yes') {
    const JSONresponse = {
      message: 'You are unauthorized to view this page',
      id: 'unauthorized',
    };

    const JSONstring = JSON.stringify(JSONresponse);

    return respond(request, response, 401, JSONstring, 'application/json');
  }

  // valid
  const JSONresponse = {
    message: 'You are authorized to view this page',
    id: 'success',
  };

  const JSONstring = JSON.stringify(JSONresponse);

  return respond(request, response, 200, JSONstring, 'application/json');
};

const forbidden = (request, response) => {
  if (request.type === 'text/xml') {
    let XMLresponse = '<response>';
    XMLresponse = `${XMLresponse} <message>You do not have access to this page</message>`;
    XMLresponse = `${XMLresponse} <id>forbidden</id>`;
    XMLresponse = `${XMLresponse} </response>`;
    return respond(request, response, 403, XMLresponse, 'text/xml');
  }

  const JSONresponse = {
    message: 'You do not have access to this page',
    id: 'forbidden',
  };

  const JSONstring = JSON.stringify(JSONresponse);

  return respond(request, response, 403, JSONstring, 'application/json');
};

const internal = (request, response) => {
  if (request.type === 'text/xml') {
    let XMLresponse = '<response>';
    XMLresponse = `${XMLresponse} <message>Internal server error</message>`;
    XMLresponse = `${XMLresponse} <id>internal</id>`;
    XMLresponse = `${XMLresponse} </response>`;
    return respond(request, response, 500, XMLresponse, 'text/xml');
  }

  const JSONresponse = {
    message: 'Internal server error',
    id: 'internal',
  };

  const JSONstring = JSON.stringify(JSONresponse);

  return respond(request, response, 500, JSONstring, 'application/json');
};

const notImplemented = (request, response) => {
  if (request.type === 'text/xml') {
    let XMLresponse = '<response>';
    XMLresponse = `${XMLresponse} <message>This page is not implemented</message>`;
    XMLresponse = `${XMLresponse} <id>notImplemented</id>`;
    XMLresponse = `${XMLresponse} </response>`;

    return respond(request, response, 501, XMLresponse, 'text/xml');
  }

  const JSONresponse = {
    message: 'This page is not implemented',
    id: 'notImplemented',
  };

  const JSONstring = JSON.stringify(JSONresponse);

  return respond(request, response, 501, JSONstring, 'application/json');
};

const notFound = (request, response) => {
  if (request.type === 'text/xml') {
    let XMLresponse = '<response>';
    XMLresponse = `${XMLresponse} <message>The page you are looking for was not found</message>`;
    XMLresponse = `${XMLresponse} <id>notFound</id>`;
    XMLresponse = `${XMLresponse} </response>`;

    return respond(request, response, 404, XMLresponse, 'text/xml');
  }

  const JSONresponse = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  const JSONstring = JSON.stringify(JSONresponse);

  return respond(request, response, 404, JSONstring, 'application/json');
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
