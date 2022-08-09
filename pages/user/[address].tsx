import type { GetServerSideProps, NextPage } from 'next'
import SEO from '@components/SEO'
import Navbar from '@components/Navbar'
import { collection } from '@utils/thirdweb'
import { NFTCard, NFTMetadata } from '@components/NFTCard'
import { useRouter } from 'next/router'

const UserPage: NextPage<{ nfts: NFTMetadata[] }> = ({ nfts }) => {
  const router = useRouter()
  const address = router.query.address as string

  if (!address) {
    router.push('/explore')
  }

  return (
    <div className="min-h-screen w-full bg-slate-900 text-white">
      <SEO
        title={`Explore ${address?.slice(0, 16)} NFTs`}
        description="A collection of interactive NFTs of frontend code snippets that render in your browser"
      />
      <Navbar />
      <main
        role="main"
        className="group px-4 pt-12">
        <div className="mx-auto max-w-7xl py-12">
          <h1 className="font-serif text-3xl font-bold lg:text-5xl">
            {address.slice(0, 16)} Owned NFTs
          </h1>
        </div>
        <div className="mx-auto grid max-w-7xl grid-flow-row gap-6 pb-24 pt-12 lg:grid-cols-3">
          {nfts.length > 0 &&
            nfts.map(nft => (
              <NFTCard
                key={Number(nft.metadata.id)}
                nft={nft}
              />
            ))}
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async req => {
  const address = req.query.address as string

  try {
    const nfts = await collection.getOwned(address)
    const data = JSON.parse(JSON.stringify(nfts))
    return {
      props: { nfts: data }
    }
  } catch (error) {
    console.error(error)
    return {
      notFound: true
    }
  }
}

export default UserPage
