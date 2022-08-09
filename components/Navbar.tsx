import Link from 'next/link';
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import { Menu } from '@headlessui/react';

type NavbarProps = {
  headerHeight: number;
};

const Navbar: React.FC<NavbarProps> = ({ headerHeight }) => {
  const [isScrollPastHeader, setIsScrollPastHeader] = useState(false);
  const connectMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const address = useAddress();

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > headerHeight) {
        setIsScrollPastHeader(true);
      } else {
        setIsScrollPastHeader(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headerHeight]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 p-5 ${
        isScrollPastHeader
          ? 'border-b border-b-white/20 bg-white/40 shadow-sm backdrop-blur-xl'
          : 'text-white mix-blend-difference'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href="/collection">
          <a>
            <span className="text-lg font-bold">Snippi</span>
          </a>
        </Link>
        <Menu as="div" className="relative font-medium">
          {({ open }) => (
            <React.Fragment>
              <Menu.Button className="inline-flex items-center gap-2 rounded p-2 transition-colors hover:bg-white/40 hover:ring-1 hover:ring-white/50">
                <span>{address ? address.substring(0, 16) : 'Connect Wallet'}</span>
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform duration-75 ease-in-out ${
                    open && 'rotate-180'
                  }`}
                />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 origin-top-right overflow-hidden rounded bg-white text-black shadow-xl">
                {address ? (
                  <Menu.Item
                    as="button"
                    className="p-2"
                    onClick={disconnectWallet}
                  >
                    Disconnect
                  </Menu.Item>
                ) : (
                  <Menu.Item
                    as="button"
                    className="p-2"
                    onClick={connectMetamask}
                  >
                    MetaMask
                  </Menu.Item>
                )}
              </Menu.Items>
            </React.Fragment>
          )}
        </Menu>
      </nav>
    </header>
  );
};

export default Navbar;
