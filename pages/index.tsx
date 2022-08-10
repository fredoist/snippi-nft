import React from 'react'
import type { GetStaticProps, NextPage } from 'next'
import SEO from '@components/SEO'
import Navbar from '@components/Navbar'
import Link from 'next/link'
import { CodeIcon, ViewGridIcon } from '@heroicons/react/outline'
import { collection } from '@utils/thirdweb'
import { NFTCard } from '@components/NFTCard'
import { NFTMetadata } from '@components/NFTCard'
import { useNFTCollection } from '@thirdweb-dev/react'

/**
 * @todo: replace for a remote origin
 */
const NFTS = [
  'https://gateway.ipfscdn.io/ipfs/QmVaFpu48wJmCsubRJFdznkWVBdqTDw1NLkMqZeo4ZxPHg/0',
  'https://gateway.ipfscdn.io/ipfs/QmPDzNEnL1XgZu8qcxYhmMqucqkQMBfuXPeM2UCer4cZCP/0',
  'https://gateway.ipfscdn.io/ipfs/QmTfykVZu1yDKnpGuvZenUsXtY2bCSuHB9AE3DoJeXBMKj/0'
]

const IndexPage: NextPage<{ data: NFTMetadata[] }> = ({ data }) => {
  const headerRef = React.useRef<HTMLDivElement | null>(null)
  const collectionRef = React.useRef<HTMLDivElement | null>(null)
  const [headerHeight, setHeaderHeight] = React.useState(0)
  const randomNFT = NFTS[Math.floor(Math.random() * NFTS.length)]
  const collection = useNFTCollection(process.env.NEXT_PUBLIC_COLLECTION_ADDRESS)
  const [nfts, setNFTs] = React.useState<NFTMetadata[]>(data)
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight)
    }
  }, [headerRef])

  React.useEffect(() => {
    if (collectionRef.current) {
      if (window.location.pathname === '/collection') {
        collectionRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [collectionRef])

  React.useEffect(() => {
    const handleScroll = async () => {
      // when scroll reach end of page load more nfts from client
      if ((window.scrollY + window.innerHeight)  >= document.body.offsetHeight - 500) {
        const totalSupply = await collection?.totalSupply();
        if(totalSupply && nfts.length < totalSupply?.toNumber()) {
          setIsLoading(true)
        }
        
        const data = (await collection?.getAll({
          count: 3,
          start: nfts.length + 1
        })) as NFTMetadata[]
        if (data) {
          setNFTs([...nfts, ...data])
          setIsLoading(false)
        } else {
          setIsLoading(false)
          return
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [nfts, collection])

  return (
    <React.Fragment>
      <SEO
        title="Turn your code snippets into non-fungible tokens"
        description="A collection of interactive NFTs of frontend code snippets that render in your browser"
      />
      <Navbar headerHeight={headerHeight} />
      <div ref={headerRef} className="relative bg-black px-5 py-24 md:py-32 lg:py-48">
        <h1 className="relative z-10 mx-auto mb-8 max-w-4xl text-center text-2xl font-bold text-white mix-blend-difference sm:text-3xl md:mb-12 md:text-5xl lg:text-6xl">
          Turn your code snippets into non-fungible tokens
        </h1>
        <div className="relative z-10">
          <div className="mx-auto flex max-w-max flex-col items-center gap-4 md:flex-row">
            <Link href="/collection">
              <a className="group relative z-10 inline-flex w-full items-center justify-between gap-2 whitespace-nowrap rounded-lg bg-white/40 p-4 font-medium text-white ring-1 ring-white/50 backdrop-blur transition-colors hover:bg-white/50 hover:ring-white/80">
                <ViewGridIcon className="h-5 w-5 transition-transform duration-100 ease-in-out group-hover:-rotate-45 group-hover:scale-110" />
                <span>Explore Collection</span>
              </a>
            </Link>
            <Link href="/new">
              <a className="group relative z-10 inline-flex w-full items-center justify-between gap-2 whitespace-nowrap rounded-lg bg-white/40 p-4 font-medium text-white ring-1 ring-white/50 backdrop-blur transition-colors hover:bg-white/50 hover:ring-white/80">
                <CodeIcon className="h-5 w-5 transition-transform duration-100 ease-in-out group-hover:-rotate-45 group-hover:scale-110" />
                <span>Create Your Own</span>
              </a>
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <iframe
            className="h-full w-full overflow-hidden object-cover"
            src={randomNFT}
            loading="lazy"
            scrolling="no"
          />
        </div>
      </div>
      <main ref={collectionRef} role="main" className="group px-4 pt-12">
        <div className="mx-auto grid max-w-7xl gap-6 pb-24 pt-12 lg:grid-cols-3">
          {nfts.length > 0 && nfts.map((nft, index) => <NFTCard key={index} nft={nft} />)}
          {isLoading &&
            Array.from({ length: 3 }).map((_, key) => (
              <div key={key} className="aspect-square animate-pulse rounded-xl bg-neutral-300" />
            ))}
        </div>
      </main>
    </React.Fragment>
  )
}

export const getStaticProps: GetStaticProps<{
  data: NFTMetadata[]
}> = async () => {
  try {
    const nfts = await collection.getAll({ count: 3, start: 0 })
    const data = JSON.parse(JSON.stringify(nfts))
    return { props: { data } }
  } catch (error) {
    console.error(error)
    return { props: { data: [] } }
  }
}

export default IndexPage
