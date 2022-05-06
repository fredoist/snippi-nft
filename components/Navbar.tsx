import Image from 'next/image';
import Link from 'next/link';
import { useAddress, useMetamask } from '@thirdweb-dev/react';
import {
  MenuIcon,
  PlusSmIcon,
  UserIcon,
  XIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useStore } from '@nanostores/react';
import { codeStore, setCode, setSnippet } from '@stores/playground';
import React, { useState } from 'react';
import { Dialog, Popover } from '@headlessui/react';

const Navbar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const address = useAddress();
  const connectWallet = useMetamask();
  const router = useRouter();
  const code = useStore(codeStore);

  const mintNFT = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const target = e.target as HTMLFormElement;
    const { name, description } = target.elements as any;

    if (!address) {
      connectWallet();
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

      if (!req.ok) {
        console.error(res.error);
        setIsLoading(false);
        return;
      } else {
        alert(`Successfully minted!`);
        setSnippet('');
        setCode({ html: '', css: '', js: '' });
        router.push(`/s/${res.id}`);
        return;
      }
    } catch (error) {
      console.error('Error while minting your NFT', error);
      setIsLoading(false);
    }
  };

  return (
    <header className="fixed top-0 z-40 w-full border-b border-sky-300/10 bg-slate-900/50 p-4 text-white backdrop-blur-3xl">
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
      <Popover
        as="nav"
        className="container mx-auto flex items-center justify-between gap-4"
      >
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
        <div className="hidden flex-1 items-center gap-4 lg:flex">
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
        <button
          type="button"
          className="hidden grid-flow-col gap-1 rounded-full border-2 border-sky-600/50 py-2 px-5 text-xs font-bold leading-none text-white transition-colors hover:bg-sky-600/20 focus:outline-none md:text-sm lg:grid"
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
            <a className="hidden grid-flow-col gap-1 rounded-full border-2 border-sky-600/50 py-2 px-5 text-xs font-bold leading-none text-white transition-colors hover:bg-sky-600/20 focus:outline-none md:text-sm lg:grid">
              <UserIcon className="h-4 w-4" />
              {address.slice(0, 16)}
            </a>
          </Link>
        ) : (
          <button
            type="button"
            onClick={connectWallet}
            className="hidden grid-flow-col items-center gap-1 rounded-full bg-sky-700/50 py-2 px-5 text-xs font-bold leading-none text-white transition-colors hover:bg-sky-600/50 focus:outline-none md:text-sm lg:grid"
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
        <Popover.Button className="lg:hidden">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Open main menu</span>
        </Popover.Button>
        <Popover.Panel className="absolute inset-x-0 top-0 bg-slate-900 px-8 py-4">
          <Popover.Button className="float-right">
            <XIcon className="h-6 w-6" />
          </Popover.Button>
          <div className="clear-both grid gap-4">
            <Link href="/explore">
              <a className="block py-2">Explore</a>
            </Link>
            <a
              className="block py-2"
              href="https://github.com/fredoist/snippi-nft"
              target="_blank"
              rel="noopener noreferrer"
            >
              Repository
            </a>
            <a
              className="block py-2"
              href="https://twitter.com/fredoist"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </div>
          <button
            type="button"
            className="my-4 flex w-full justify-center gap-1 rounded-full border-2 border-sky-600/50 py-2 px-5 text-xs font-bold leading-none text-white transition-colors hover:bg-sky-600/20 focus:outline-none md:text-sm"
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
              <a className="my-4 flex w-full justify-center gap-1 rounded-full border-2 border-sky-600/50 py-2 px-5 text-xs font-bold leading-none text-white transition-colors hover:bg-sky-600/20 focus:outline-none md:text-sm">
                <UserIcon className="h-4 w-4" />
                {address.slice(0, 16)}
              </a>
            </Link>
          ) : (
            <button
              type="button"
              onClick={connectWallet}
              className="my-4 flex w-full items-center justify-center gap-1 rounded-full bg-sky-700/50 py-2 px-5 text-xs font-bold leading-none text-white transition-colors hover:bg-sky-600/50 focus:outline-none md:text-sm"
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
        </Popover.Panel>
      </Popover>
    </header>
  );
};

export default Navbar;
