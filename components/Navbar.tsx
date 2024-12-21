'use client'

import { useState } from 'react';
import Link from 'next/link';
import { navLinks } from '@/constants';
import { useRouter } from 'next/navigation';
import { logoutAccount } from '@/lib/actions/user.actions';
import { SquarePlus, Menu, X } from 'lucide-react';
import CustomButton from './Button';
import { Button } from './ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogOut = async () => {
    const loggedOut = await logoutAccount();
    if (loggedOut) router.push('/sign-in');
  }

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className='bg-slate-800 text-white p-4 shadow-md absolute w-full top-0'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        <div className='text-2xl font-semibold border-white rounded-xl border-2 px-4 py-1 hover:bg-slate-800 hover:border-gray-200'>
          <Link href='/'>
            <span className='text-red-500'>Tag</span>In
          </Link>
        </div>

        {/* Hamburger Icon */}
        <Button
          className='md:hidden text-white hover:text-gray-400 transition duration-300'
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </Button>

        {/* Links for Desktop */}
        <div className='hidden md:flex items-center space-x-6'>
          {navLinks.map(({ route, label }) => (
            <Link
              key={label}
              href={route}
              className='hover:text-red-500 transition duration-300 font-medium text-lg hover:underline underline-offset-2'
            >
              {label}
            </Link>
          ))}
          <Link
            href='/events/new-event'
            className='font-semibold cursor-pointer flex-center gap-2 bg-red-600 hover:bg-red-500 px-[14px] py-[6px] rounded-xl'
          >
            <SquarePlus />
            New Event
          </Link>
          <CustomButton
            text='Log Out'
            className='bg-gray-500 text-white hover:bg-gray-600 rounded-xl text-lg'
            onClick={handleLogOut}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='absolute top-0 left-0 w-3/4 h-screen bg-slate-900 text-white shadow-lg z-50 p-6 transform transition-transform duration-300'>
          <div className='flex justify-between items-center mb-4'>
            <div className='text-2xl font-semibold'>
              <Link href='/'>
                <span className='text-red-500'>Tag</span>In
              </Link>
            </div>
            <Button
              className='text-white hover:text-gray-400 transition duration-300'
              onClick={toggleMenu}
            >
              <X size={28} />
            </Button>
          </div>
          <div className='flex flex-col space-y-4'>
            {navLinks.map(({ route, label }) => (
              <Link
                key={label}
                href={route}
                onClick={toggleMenu}
                className='hover:text-red-500 transition duration-300 font-medium text-lg'
              >
                {label}
              </Link>
            ))}
            <Link
              href='/events/new-event'
              onClick={toggleMenu}
              className='font-semibold flex-center gap-2 bg-red-600 hover:bg-red-500 px-[14px] py-[6px] rounded-xl'
            >
              <SquarePlus />
              New Event
            </Link>
            <CustomButton
              text='Log Out'
              className='bg-gray-500 text-white hover:bg-gray-600 rounded-xl text-lg'
              onClick={() => {
                handleLogOut();
                toggleMenu();
              }}
            />
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar;
