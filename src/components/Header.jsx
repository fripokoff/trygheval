'use client';

import ThemeToggle from './ThemeToggle'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

export default function Header() {

    return (
        <div className='bg-gray-800 w-full text-white'>
            <div className='max-w-7xl mx-auto flex items-center justify-between py-3 px-5 2xl:px-0'>
                <a href='/'>
                    <img src='./42_evals.png' alt='Logo' className='h-[36px]' />
                </a>
                <ThemeToggle />
                <Menu>
                    <MenuButton>
                        <div className='cursor-pointer'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='size-8'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25'
                                />
                            </svg>
                        </div>
                    </MenuButton>
                    <MenuItems
                        transition
                        anchor='bottom end'
                        style={{ zIndex: 1000 }}
                        className='w-52 origin-top-right rounded-xl border border-sky-500 border-opacity-20 bg-gray-700 bg-opacity-800 p-2 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0'
                    >
                        <MenuItem>
                            <a
                                target='_blank'
                                href='https://github.com/rphlr/42-Evals'
                                className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10'
                            >
                                Give this repo a star
                            </a>
                        </MenuItem>
                        <MenuItem>
                            <a
                                target='_blank'
                                href='https://github.com/rphlr'
                                className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10'
                            >
                                Follow me on GitHub
                            </a>
                        </MenuItem>
                    </MenuItems>
                </Menu>
            </div>
        </div>
    );
}