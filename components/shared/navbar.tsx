'use client'

import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav className='fixed top-0 z-50 w-full border-b border-white/20 bg-white/10 backdrop-blur-md'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo/Brand */}
          <div className='flex-shrink-0'>
            <h1 className='text-xl font-bold text-white'>
              <span className='text-white'>dilicalflame</span>
              <span className='ml-2 text-sm text-white/70'>(devesh)</span>
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-8'>
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className='rounded-md px-3 py-2 text-sm font-medium text-white/90 transition-colors duration-200 hover:bg-white/10 hover:text-white'
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='inline-flex items-center justify-center rounded-md p-2 text-white/90 hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset'
            >
              <svg
                className='h-6 w-6'
                stroke='currentColor'
                fill='none'
                viewBox='0 0 24 24'
              >
                {isOpen ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden'>
          <div className='space-y-1 border-t border-white/10 bg-white/5 px-2 pt-2 pb-3 backdrop-blur-md sm:px-3'>
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className='block rounded-md px-3 py-2 text-base font-medium text-white/90 transition-colors duration-200 hover:bg-white/10 hover:text-white'
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
