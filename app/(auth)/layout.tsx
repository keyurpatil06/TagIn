import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-sans bg-gray-100">
      {children}
      <div className='flex h-screen w-full max-md:hidden'>
        <Image
          src='/cover-img.jpg'
          alt='cover-image'
          height={1000}
          width={800}
          className='w-full object-cover'
        />
      </div>
    </main>
  );
}
