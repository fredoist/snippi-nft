import Image from 'next/image';
import Link from 'next/link';
import { useWeb3 } from '@3rdweb/hooks';
import { PlusSmIcon, UserIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

const Navbar = () => {
  const { address, balance, connectWallet } = useWeb3();
  const router = useRouter();

  const mintNFT = () => {
    if (router.pathname != '/new') {
      router.push('/new');
      return;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sky-300/10 bg-slate-900/50 p-4 text-white backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="grid grid-flow-col gap-4">
          <Link href="/">
            <a>
              <Image
                src="/assets/img/logo.svg"
                alt="Snippi NFTs"
                width={80}
                height={22}
              />
              <span className="sr-only">Snippi NFTs</span>
            </a>
          </Link>
          <Link href="/explore">
            <a>Explore</a>
          </Link>
          <a
            href="https://github.com/fredoist/snippi-nft"
            target="_blank"
            rel="noopener noreferrer"
          >
            Repository
          </a>
          <a
            href="https://twitter.com/fredoist"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </div>
        <div className="grid grid-flow-col items-center gap-4">
          <button
            type="button"
            className="grid grid-flow-col gap-1 rounded-full border-2 border-sky-600/50 py-2 px-5 text-sm font-bold leading-none text-white transition-colors hover:bg-sky-600/20 focus:outline-none"
            onClick={mintNFT}
          >
            <PlusSmIcon className="h-4 w-4" />
            Mint NFT
          </button>
          {address ? (
            <Link href="/user" as={`/user/${address}`}>
              <a className="grid grid-flow-col gap-1 rounded-full border-2 border-sky-600/50 py-2 px-5 text-sm font-bold leading-none text-white transition-colors hover:bg-sky-600/20 focus:outline-none">
                <UserIcon className="h-4 w-4" />
                {address.slice(0, 16)}
                <span className="text-xs font-normal">
                  ({balance?.formatted} MATIC)
                </span>
              </a>
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => connectWallet('injected')}
              className="grid grid-flow-col items-center gap-1 rounded-full bg-sky-700/50 py-2 px-5 text-sm font-bold leading-none text-white transition-colors hover:bg-sky-600/50 focus:outline-none"
            >
              <Image
                src="/assets/img/metamask-icon.svg"
                alt="MetaMask"
                width={18}
                height={18}
              />
              Connect Wallet
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
