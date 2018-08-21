module.exports = {
  NODE_ENV: '"production"',
  CHATANGLE_BACKEND_IP: process.env.CHATANGLE_BACKEND_IP ? `"${process.env.CHATANGLE_BACKEND_IP}"` : '"localhost"',
  CHATANGLE_BACKEND_PORT: process.env.CHATANGLE_BACKEND_PORT || 8008,
  IS_CHATANGLE_BACKEND_SECURED: process.env.IS_CHATANGLE_BACKEND_SECURED || false,
  IOTA_PROVIDERS_JSON: process.env.IOTA_PROVIDERS_JSON ? `"${process.env.IOTA_PROVIDERS_JSON}"` : null
}
