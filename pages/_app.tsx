import '@/styles/globals.css'
import { PrivyProvider } from '@privy-io/react-auth'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<PrivyProvider
			appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
			config={{
				loginMethods: ['farcaster'],
				embeddedWallets: {
					createOnLogin: 'all-users',
				},
			}}
		>
			<Component {...pageProps} />
		</PrivyProvider>
	)
}

export default App
