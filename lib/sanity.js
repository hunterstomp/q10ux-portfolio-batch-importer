import { createClient } from '@sanity/client'

// Public client: safe for browser/client-side, no token
const sanityClient = createClient({
  projectId: '1us4pxpd',
  dataset: 'production',
  apiVersion: '2023-07-01',
  useCdn: true, // Always use CDN for public data
  token: undefined // Never expose token in browser
})

// Server-side client: use in getServerSideProps, getStaticProps, or API routes if you need draft/private data
export function getServerClient() {
  return createClient({
    projectId: '1us4pxpd',
    dataset: 'production',
    apiVersion: '2023-07-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN // Only available on server
  })
}

export default sanityClient 