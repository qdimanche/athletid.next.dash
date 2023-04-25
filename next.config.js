/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
		serverComponentsExternalPackages: ['bcrypt'],
	},
	images: {
		domains: ['res.cloudinary.com']
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'https://athletid-next-dash.vercel.app/:path*',
			},
		]
	},
}

module.exports = nextConfig
