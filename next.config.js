const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	webpack(config) {
		config.resolve.alias = {
			...config.resolve.alias,
			// This is a hammer approach for local dev. We can't figure out why, but node 18 starts to have
			// issues with local dev seeing multiple Reacts.
			react: path.resolve('./node_modules/react'),
		}
		return config
	},
	async headers() {
		return [
			{
				// Apply these headers to all routes in your application.
				source: '/:path*',
				headers: [
					{
						key: 'Content-Security-Policy',
						value:
							"default-src 'self'; script-src 'self' 'https://auth.privy.io'; img-src 'self'; style-src 'self' 'unsafe-inline'; frame-ancestors 'self' 'https://auth.privy.io';",
					},
				],
			},
		]
	},
}

// const path = require('path');

// /** @type {import('next').NextConfig} */
// module.exports = {
//   reactStrictMode: true,
//   webpack(config) {
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       // This is hammer approach for local dev. We can't figure out why, but node 18 starts to have
//       // issues with local dev seeing multiple reacts.
//       react: path.resolve('./node_modules/react'),
//     };
//     return config;
//   },
// };
