import {
	FarcasterWithMetadata,
	useExperimentalFarcasterSigner,
	useLogout,
	usePrivy,
} from '@privy-io/react-auth'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useSWRMutation from 'swr/mutation'

export default function FarcasterPage() {
	const router = useRouter()

	const [castInput, setCastInput] = useState('')

	const { getAccessToken, user } = usePrivy()

	const {
		submitCast,
		removeCast,
		likeCast,
		recastCast,
		followUser,
		unfollowUser,
		requestFarcasterSigner,
	} = useExperimentalFarcasterSigner()

	const { logout } = useLogout({
		onSuccess: () => {
			console.log('🫥 ✅ logOut onSuccess')
			router.push('/')
		},
	})

	const farcasterAccount = user?.linkedAccounts.find(
		(a) => a.type === 'farcaster'
	) as FarcasterWithMetadata
	const signerPublicKey = farcasterAccount?.signerPublicKey

	const getUserCasts = async (
		url: string
	): Promise<{
		result: any
		next: string
	}> => {
		return (await (
			await fetch(url, {
				headers: {
					api_key: '97238FF8-F378-4218-98DF-B940C7AD8172',
					accept: 'application/json',
				},
			})
		).json()) as {
			result: any
			next: string
		}
	}

	const { data, isMutating, trigger } = useSWRMutation<{
		result: any
		next: string
	}>(
		farcasterAccount
			? `https://api.neynar.com/v1/farcaster/casts?fid=${farcasterAccount.fid}&viewerFid=3&limit=25`
			: undefined,
		getUserCasts
	)

	useEffect(() => {
		if (farcasterAccount) setTimeout(() => trigger(), 2000)
	}, [!!farcasterAccount])

	const formattedCasts = data?.result.casts.map((cast: any) => {
		return (
			<div className='mt-4 rounded-md border bg-slate-100 p-4' key={cast.hash}>
				<p className='my-2 text-sm text-gray-600'>Hash: {cast.hash}</p>
				<p className='my-2 text-sm text-gray-600'>Text: {cast.text}</p>
				<p className='my-2 text-sm text-gray-600'>
					Likes: {cast.reactions.count}
				</p>
				<p className='my-2 text-sm text-gray-600'>
					Recasts: {cast.recasts.count}
				</p>
				<button
					className='rounded-md bg-violet-600 px-4 py-2 text-sm text-white hover:bg-violet-700'
					onClick={async () => {
						const { hash } = await removeCast({ castHash: cast.hash })
						toast(`Removed cast. Message hash: ${hash}`)
						setTimeout(() => trigger(), 2000)
					}}
				>
					Remove Cast
				</button>
				<button
					className='ml-4 rounded-md bg-violet-600 px-4 py-2 text-sm text-white hover:bg-violet-700'
					onClick={async () => {
						const { hash } = await likeCast({
							castHash: cast.hash,
							castAuthorFid: cast.author.fid,
						})
						toast(`Liked cast. Message hash: ${hash}`)
						setTimeout(() => trigger(), 2000)
					}}
				>
					Like
				</button>
				<button
					className='ml-4 rounded-md bg-violet-600 px-4 py-2 text-sm text-white hover:bg-violet-700'
					onClick={async () => {
						const { hash } = await recastCast({
							castHash: cast.hash,
							castAuthorFid: cast.author.fid,
						})
						toast(`Recasted cast. Message hash: ${hash}`)
						setTimeout(() => trigger(), 2000)
					}}
				>
					Recast
				</button>
			</div>
		)
	})

	return (
		<>
			<Head>
				<title>Tip Canon</title>
			</Head>

			<main className='flex min-h-screen flex-col bg-privy-light-blue px-4 py-6 sm:px-20 sm:py-10'>
				<ToastContainer />
				<div className='flex flex-row justify-between'>
					<h1 className='text-2xl font-semibold'>Tip Canon 0.1</h1>
					<div className='flex flex-row gap-4'>
						<button
							onClick={logout}
							className='rounded-md bg-violet-200 px-4 py-2 text-sm text-violet-700 hover:text-violet-900'
						>
							Logout
						</button>
					</div>
				</div>
				<p className='mb-2 mt-6 text-sm font-bold uppercase text-gray-600'>
					Welcome {farcasterAccount?.displayName}!
					<p className='mb-2 mt-6 text-sm font-bold uppercase text-gray-600'>
						TipCanon is your chance to win a daily barage of tips!
					</p>
				</p>
				<div className='rounded-md border bg-slate-100 p-4'>
					{/* <p className='my-2 text-sm text-gray-600'>
						Display Name: {farcasterAccount?.displayName}
					</p>
					<p className='my-2 text-sm text-gray-600'>
						Username: {farcasterAccount?.username}
					</p> */}
					<p className='my-2 text-sm text-gray-600'>
						Have you authorized TipCanon? {signerPublicKey ?? 'NO'}
					</p>
				</div>
				<div className='flex flex-wrap gap-4'>
					{!signerPublicKey && (
						<button
							className='mt-4 rounded-md bg-violet-600 px-4 py-2 text-sm text-white hover:bg-violet-700'
							onClick={requestFarcasterSigner}
							disabled={!!signerPublicKey}
						>
							Authorise Tip Canon!
						</button>
					)}
				</div>
				<p className='mb-2 mt-6 text-sm font-bold uppercase text-gray-600'>
					Tell your friends to join TipCanon!
				</p>
				<div className='flex flex-wrap gap-4'>
					<input
						placeholder='I am playing TipCanon for a chance to win a daily barage of tips! @tipcanon'
						className='w-full rounded-md'
						type='text'
						value={castInput}
						onChange={(e) => setCastInput(e.target.value)}
					></input>
					<button
						className='rounded-md bg-violet-600 px-4 py-2 text-sm text-white hover:bg-violet-700'
						onClick={async () => {
							const { hash } = await submitCast({
								text: castInput,
							})
							setCastInput('')
							toast(`Submitted cast. Message hash: ${hash}`)
							setTimeout(() => trigger(), 2000)
						}}
						disabled={!castInput}
					>
						Submit
					</button>
				</div>
				{/* <p className='mb-2 mt-6 text-sm font-bold uppercase text-gray-600'>
					My Casts
				</p>
				<div className='gap-4'>{!isMutating && formattedCasts}</div>
				<p className='mb-2 mt-6 text-sm font-bold uppercase text-gray-600'>
					Follow Privy
				</p> */}
				{/* <div className='flex flex-wrap gap-4'>
					<button
						className='rounded-md bg-violet-600 px-4 py-2 text-sm text-white hover:bg-violet-700'
						onClick={async () => {
							const { hash } = await followUser({ fid: 188926 })
							toast(`Followed user. Message hash: ${hash}`)
							setTimeout(() => trigger(), 2000)
						}}
					>
						Follow
					</button>
					<button
						className='rounded-md bg-violet-600 px-4 py-2 text-sm text-white hover:bg-violet-700'
						onClick={async () => {
							const { hash } = await unfollowUser({ fid: 188926 })
							toast(`Unfollowed user. Message hash: ${hash}`)
							setTimeout(() => trigger(), 2000)
						}}
					>
						Unfollow
					</button>
				</div> */}
			</main>
		</>
	)
}
