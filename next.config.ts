import { withContentlayer } from 'next-contentlayer2'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

export default withContentlayer(nextConfig)
