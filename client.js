import fetch from 'node-fetch';
const {Resolver} = require('dns').promises;
const resolver = new Resolver();

const serviceDiscoveryEnabled =
    process.env.SERVICE_DISCOVERY_ENABLED === 'true';
const serviceDiscoveryEndpoint =
    process.env.SERVICE_DISCOVERY_ENDPOINT || 'api.local';
const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:8080/api/';

export default async function get(url, qs) {
  if (serviceDiscoveryEnabled) {
    const addresses = await resolver.resolveSrv(serviceDiscoveryEndpoint);
    const record = addresses[0];
    const result = await fetch('http://'+record.name+':'+record.port+'/api/'+url+'?'+ new URLSearchParams(qs));
    return await result.json();
  } else {
    const result = await fetch(apiBaseUrl+url+'?'+new URLSearchParams(qs));
    const data = await result.json();
    return data;
  }
}
