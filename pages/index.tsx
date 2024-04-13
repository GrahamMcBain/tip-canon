import { useLogin, usePrivy } from '@privy-io/react-auth'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Index = () => {
	const router = useRouter()
	const { ready, authenticated, logout } = usePrivy()
	const { login } = useLogin({
		onComplete(user, isNewUser, wasPreviouslyAuthenticated) {
			console.log('🔑 ✅ Login success', {
				user,
				isNewUser,
				wasPreviouslyAuthenticated,
			})
			router.push('/farcaster')
		},
		onError(error) {
			console.log('🔑 🚨 Login error', { error })
		},
	})

	return (
		<>
			<Head>
				<title>TipCannon💰🎉</title>
			</Head>
			<main>
				<div className='flex h-screen w-screen flex-col items-center justify-center'>
					{/* <Blobby /> */}
					<h2 className='my-4 text-xl font-semibold text-gray-800'>
						TipCannon💰🎉
					</h2>
					<h2 className='text-md my-4 text-gray-800'>
						The most fun you can have tipping people on the internet.
					</h2>
					<div className='mt-2 w-1/2'>
						<button
							className='my-4 w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm disabled:bg-indigo-400'
							onClick={login}
							disabled={!ready || authenticated}
						>
							Login
						</button>
					</div>
				</div>
			</main>
		</>
	)
}

export default Index
