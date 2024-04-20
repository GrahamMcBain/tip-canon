const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	webpack(config) {
		config.resolve.alias = {
			...config.resolve.alias,
			// This is hammer approach for local dev. We can't figure out why, but node 18 starts to have
			// issues with local dev seeing multiple reacts.
			react: path.resolve('./node_modules/react'),
		}
		return config
	},
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [
					{
						key: 'Content-Security-Policy',
						value:
							process.env.NODE_ENV === 'development'
								? "default-src 'self' https://auth.privy.io https://verify.walletconnect.com https://explorer-api.walletconnect.com; script-src 'self' https://auth.privy.io 'unsafe-eval'; img-src 'self' data: https://i.imgur.com; style-src 'self' 'unsafe-inline'; frame-ancestors 'self' https://auth.privy.io; connect-src 'self' https://auth.privy.io wss://www.walletlink.org wss://relay.walletconnect.com wss://relay.walletconnect.org;"
								: "default-src 'self' https://auth.privy.io https://verify.walletconnect.com https://explorer-api.walletconnect.com; script-src 'self' https://auth.privy.io; img-src 'self' data: https://i.imgur.com; style-src 'self' 'unsafe-inline'; frame-ancestors 'self' https://auth.privy.io; connect-src 'self' https://auth.privy.io wss://www.walletlink.org wss://relay.walletconnect.com wss://relay.walletconnect.org;",
					},
				],
			},
		]
	},
}
