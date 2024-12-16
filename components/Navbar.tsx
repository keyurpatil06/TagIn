'use client'

import Link from 'next/link';
import { navLinks } from '@/constants';
import Button from './Button';
import { useRouter } from 'next/navigation';
import { logoutAccount } from '@/lib/actions/user.actions';

const Navbar = () => {
  const router = useRouter();

  const handleLogOut = async () => {
    const loggedOut = await logoutAccount();
    if (loggedOut) router.push('/sign-in');
  }

  return (
    <nav className="bg-black text-white p-4 shadow-md absolute w-full top-0 border-b-[1px] border-slate-800">
      <div className="max-w-7xl mx-auto flex md:flex-row flex-col justify-between items-center">
        <div className="text-2xl font-semibold border-white rounded-xl border-2 px-4 py-1 md:my-0 my-2 hover:bg-slate-800 hover:border-gray-200">
          <Link href="/">
            <span className="text-red-500">Tag</span>In
          </Link>
        </div>

        <div className="md:flex space-x-6 hidden">
          {navLinks.map(({ route, label }) => (
            <Link
              key={label}
              href={route}
              className="hover:text-red-500 transition duration-300 font-medium text-lg hover:underline underline-offset-2"
            >
              {label}
            </Link>
          ))}
          <Button
            text='Log Out'
            onClick={handleLogOut}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
