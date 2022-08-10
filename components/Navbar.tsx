import Link from 'next/link'
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { Menu } from '@headlessui/react'

type NavbarProps = {
  headerHeight?: number
}

const Navbar: React.FC<NavbarProps> = ({ headerHeight = 0 }) => {
  const [isScrollPastHeader, setIsScrollPastHeader] = useState(false)
  const connectMetamask = useMetamask()
  const disconnectWallet = useDisconnect()
  const address = useAddress()

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > headerHeight) {
        setIsScrollPastHeader(true)
      } else {
        setIsScrollPastHeader(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [headerHeight])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 p-5 ${
        isScrollPastHeader
          ? 'border-b border-b-white/20 bg-white/40 shadow-sm backdrop-blur-xl'
          : 'text-white mix-blend-difference'
      }`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href="/collection">
          <a className="inline-flex items-center gap-2">
            <svg
              width="41"
              height="41"
              viewBox="0 0 41 41"
              fill="none"
              className={`w-6 h-6 ${isScrollPastHeader ? 'block' : 'hidden'}`}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.6841 40.138C31.7298 40.138 40.6841 31.1837 40.6841 20.138C40.6841 9.09234 31.7298 0.138031 20.6841 0.138031C9.63837 0.138031 0.684082 9.09234 0.684082 20.138C0.684082 31.1837 9.63837 40.138 20.6841 40.138ZM26.9234 9.45487C27.2271 8.37608 26.1802 7.73816 25.2241 8.41933L11.8772 17.9276C10.8403 18.6663 11.0034 20.138 12.1222 20.138L15.6368 20.138V20.1108H22.4866L16.9053 22.0801L14.4448 30.8212C14.1411 31.9 15.1879 32.5379 16.1441 31.8567L29.491 22.3485C30.5279 21.6098 30.3647 20.138 29.246 20.138L23.9162 20.138L26.9234 9.45487Z"
                fill="#ec4899"
                stopColor="#ec4899"></path>
            </svg>
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
                  <Menu.Item as="button" className="p-2" onClick={disconnectWallet}>
                    Disconnect
                  </Menu.Item>
                ) : (
                  <Menu.Item as="button" className="p-2" onClick={connectMetamask}>
                    MetaMask
                  </Menu.Item>
                )}
              </Menu.Items>
            </React.Fragment>
          )}
        </Menu>
      </nav>
    </header>
  )
}

export default Navbar
