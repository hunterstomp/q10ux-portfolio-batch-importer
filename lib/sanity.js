import { createClient } from '@sanity/client'

const isServer = typeof window === 'undefined'
const token = isServer ? process.env.SANITY_API_TOKEN : undefined

const sanityClient = createClient({
  projectId: 'q5gam10s',
  dataset: 'production',
  apiVersion: '2023-07-01',
  useCdn: !token,
  token,
})

export default sanityClient 