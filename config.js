/*
 * Configuation file for server
 *
 */

// Initializing container for environments
var environments = {};

// Defining development (default) environment
environments.development = {
  httpPort: 8080,
  httpsPort: 8443,
  envName: "development"
};

// Defining production environment
environments.production= {
  httpPort: 80,
  httpsPort: 443,
  envName: "production"
};

// Getting required environement
const requiredEnvironment = typeof(process.env.NODE_ENV) == "string"?process.env.NODE_ENV:"";

// Getting environement to export, if doesn't exist then exporting default environement
const exportEnvironment = typeof(environments[requiredEnvironment]) == "object"?environments[requiredEnvironment]:environments.development;
