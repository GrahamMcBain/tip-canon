const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Adelle Sans', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				'privy-navy': '#4CAF50',
				'privy-light-blue': '#388E3C',
				'privy-blueish': '#C8E6C9',
				'privy-pink': '#FFFFFF',
			},
		},
	},
	darkMode: 'class',
	plugins: [require('tailwindcss-safe-area')],
}
