'use client'

import Link from 'next/link';
import { navLinks } from '@/constants';
import { useRouter } from 'next/navigation';
import { logoutAccount } from '@/lib/actions/user.actions';
import { SquarePlus } from 'lucide-react';
import CustomButton from './Button';

const Navbar = () => {
  const router = useRouter();

  const handleLogOut = async () => {
    const loggedOut = await logoutAccount();
    if (loggedOut) router.push('/sign-in');
  }

  return (
    <nav className="bg-slate-800 text-white p-4 shadow-md absolute w-full top-0">
      <div className="max-w-7xl mx-auto flex md:flex-row flex-col justify-between items-center">
        <div className="text-2xl font-semibold border-white rounded-xl border-2 px-4 py-1 md:my-0 my-2 hover:bg-slate-800 hover:border-gray-200">
          <Link href="/">
            <span className="text-red-500">Tag</span>In
          </Link>
        </div>

        <div className="flex items-center space-x-6 max-md:hidden">
          {navLinks.map(({ route, label }) => (
            <Link
              key={label}
              href={route}
              className="hover:text-red-500 transition duration-300 font-medium text-lg hover:underline underline-offset-2"
            >
              {label}
            </Link>
          ))}
          <Link href='/events/new-event' className='font-semibold cursor-pointer flex-center gap-2 bg-red-600 hover:bg-red-500 px-3 py-2 rounded-xl'>
            <SquarePlus />
            New Event
          </Link>
          <CustomButton
            text='Log Out'
            className='bg-red-600 hover:bg-red-500 rounded-xl'
            onClick={handleLogOut}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
