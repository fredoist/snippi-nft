import Image from 'next/image';
import Link from 'next/link';
import { useWeb3 } from '@3rdweb/hooks';
import { PlusSmIcon, UserIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useStore } from '@nanostores/react';
import {
  codeStore,
  setCode,
  setSnippet,
  snippetStore,
} from '@stores/playground';
import React, { FormEventHandler, useState } from 'react';
import { Dialog } from '@headlessui/react';

const Navbar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { address, balance, connectWallet } = useWeb3();
  const router = useRouter();
  const code = useStore(codeStore);

  const mintNFT = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const target = e.target as HTMLFormElement;
    const { name, description } = target.elements as any;

    if (!address) {
      connectWallet('injected');
      setIsLoading(false);
      return;
    }

    try {
      const req = await fetch('/api/mint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.value,
          description: description.value,
          address,
          code,
        }),
      });
      const res = await req.json();

      if (res.error) {
        alert(res.error);
        return;
      } else {
        alert(`Successfully minted!`);
        setSnippet('');
        setCode({ html: '', css: '', js: '' });
        router.push(`/s/${res.id}`);
      }
    } catch (error) {
      console.error('Error while minting your NFT', error);
    }
    setIsLoading(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sky-300/10 bg-slate-900/50 p-4 text-white backdrop-blur-md">
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex items-center justify-center"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm" />
        <div className="fixed z-50 my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-900 p-6 text-left align-middle text-white shadow-xl transition-all">
          <Dialog.Title className="font-bold">NFT details</Dialog.Title>
          <Dialog.Description className="text-sm">
            Let&apos;s add some details for your NFT
          </Dialog.Description>
          <form className="mt-5" onSubmit={mintNFT}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Awesome NFT"
              className="mt-2 mb-4 block w-full rounded bg-slate-600/50 p-2 focus:bg-slate-600/50 focus:outline-none"
            />
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="A description of your NFT"
              className="mt-2 mb-4 block w-full rounded bg-slate-600/50 p-2 focus:bg-slate-600/50 focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 w-full rounded bg-sky-600/50 p-2 transition-colors hover:bg-sky-500/50 focus:bg-sky-500/50 focus:outline-none  disabled:cursor-wait disabled:bg-sky-600/10 disabled:text-sky-600/50 disabled:hover:bg-sky-600/10"
            >
              {isLoading ? 'Loading...' : 'Mint NFT'}
            </button>
          </form>
        </div>
      </Dialog>
      <nav className="container mx-auto flex items-center justify-between">
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
            onClick={() => {
              if (router.pathname != '/new') {
                router.push('/new');
                return;
              }
              setIsOpen(true);
            }}
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
