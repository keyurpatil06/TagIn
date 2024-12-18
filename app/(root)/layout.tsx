import Navbar from "@/components/Navbar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) redirect('/sign-in')

  return (
    <div className='w-full bg-slate-950 flex flex-col'>
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  )
}
