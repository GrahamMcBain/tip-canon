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
				TipCannon💰🎉
				<title>TipCannon💰🎉</title>
			</Head>
			<div className='flex justify-center'>
				<main>
					<div className='flex h-screen w-screen flex-col items-center justify-center '>
						<img
							src='/images/512-cannon.png'
							alt='cannon'
							width={250}
							height={150}
							className='mb-4 mt-10'
						/>

						<h2 className='my-4 text-xl font-semibold text-gray-800'>
							TipCannon💰🎉
						</h2>
						<h2 className='text-md my-4 text-gray-800'>
							Someone gets blasted by tips everyday! Will it be you?
						</h2>
						<div className='flex flex-wrap gap-4'>
							<div className='mb-2 mt-6 rounded-md border bg-slate-100 p-4 text-sm text-gray-600'>
								How it works:
								<br />
								<br />
								1. Login, then contribute 5% of your daily degen tips for a the
								opportunity */=98=to win the daily prize pool!
								<div className='mb-2 mt-6 text-sm text-gray-600'>
									2. Starting 4/20/2024 one winner get blasted by the most tips,
									But there 98/=
								</div>
								<div className='mb-2 mt-6 text-sm text-gray-600'>
									3. Play as much as you want or leave TipCannon at anytime.
									Winners are announced from the TipCannon farcaster account!
								</div>
							</div>
						</div>
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
			</div>
		</>
	)
}

export default Index
