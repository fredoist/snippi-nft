import type { GetServerSideProps, NextPage } from 'next'
import SEO from '@components/SEO'
import Navbar from '@components/Navbar'
import { collection } from '@utils/thirdweb'
import { IPFSToURI } from '@utils/IPFSToURI'
import Link from 'next/link'
import { UserIcon } from '@heroicons/react/outline'
import { NFTMetadata } from '@components/NFTCard'

const SnippetPage: NextPage<NFTMetadata> = ({
  owner,
  metadata: { name, description, image, uri, file }
}) => {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-slate-900 text-white">
      <SEO
        title={name}
        description={description ? description.substring(0, 160) : ''}
      />
      <Navbar />
      <main
        role="main"
        className="h-full w-full overflow-y-auto px-4 pt-12"
        style={{ height: 'calc(100vh - 70px)' }}>
        <div className="mx-auto my-24 w-full max-w-6xl text-center">
          <div className="mb-12">
            <h1 className="mb-6 font-serif text-3xl font-bold lg:text-6xl">{name}</h1>
            <p className="mb-5">{description}</p>
            <Link
              href="/user"
              as={`/user/${owner}`}>
              <a className="inline-block rounded-full bg-sky-700/50 py-2 px-5 text-sm font-bold leading-none text-white transition-colors hover:bg-sky-600/50">
                <UserIcon className="float-left mr-2 h-4 w-4" />
                {owner.slice(0, 16)}
              </a>
            </Link>
          </div>
          <iframe
            src={IPFSToURI(file)}
            title={name}
            loading="lazy"
            scrolling="no"
            frameBorder="0"
            className="aspect-square w-full overflow-hidden rounded-xl"></iframe>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async req => {
  const id = req.query.id as string
  try {
    const nft = await collection.get(id)
    const data = JSON.parse(JSON.stringify(nft))
    return {
      props: data
    }
  } catch (error) {
    console.error(error)
    return {
      notFound: true
    }
  }
}

export default SnippetPage
