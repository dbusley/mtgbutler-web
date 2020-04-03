import fetch from 'node-fetch';
const {Resolver} = require('dns').promises;
const resolver = new Resolver();

const serviceDiscoveryEnabled =
    process.env.SERVICE_DISCOVERY_ENABLED === 'true';
const serviceDiscoveryEndpoint =
    process.env.SERVICE_DISCOVERY_ENDPOINT || 'api.local';
const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:8080/api/';
const appUser = process.env.APP_USER || 'admin';
const appPassword = process.env.APP_PASSWORD || 'root';

const get = async (url, qs) => {
  let result;
  if (url.startsWith('http')) {
    result = await fetch(url,
        {
          headers: {
            'Authorization': 'Basic ' + Buffer.from(appUser + ':' + appPassword)
                .toString('base64'),
          },
        });
  } else if (serviceDiscoveryEnabled) {
    const addresses = await resolver.resolveSrv(serviceDiscoveryEndpoint);
    const record = addresses[0];
    result = await fetch('http://'+record.name+':'+record.port+'/api/'+url+'?'+
      new URLSearchParams(qs),
    {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(appUser + ':' + appPassword)
            .toString('base64'),
      },
    });
  } else {
    result = await fetch(apiBaseUrl+url+'?'+new URLSearchParams(qs),
        {
          headers: {
            'Authorization': 'Basic ' + Buffer.from(appUser + ':' + appPassword)
                .toString('base64'),
          },
        });
  }
  if (result.status === 404) {
    return 'NOT_FOUND';
  }
  if (result.status > 399) {
    return null;
  }
  return await result.json();
};

const post = async (url, json) => {
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + Buffer.from(appUser + ':' + appPassword)
          .toString('base64'),
    },
    body: JSON.stringify(json)};
  if (serviceDiscoveryEnabled) {
    const addresses = await resolver.resolveSrv(serviceDiscoveryEndpoint);
    const record = addresses[0];
    const result = await fetch('http://'+record.name+':'+record.port+'/api/'+url, opts);
    return await result.json();
  } else {
    const result = await fetch(apiBaseUrl+url, opts);
    return await result.json();
  }
};

const put = async (url, json) => {
  const opts = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + Buffer.from(appUser + ':' + appPassword)
          .toString('base64'),
    },
    body: JSON.stringify(json),
  };

  const result = await fetch(url, opts);
  return await result.json();
};

export {get, post, put};
