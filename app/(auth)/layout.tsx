import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-sans">
      {children}
      <div className='flex h-screen w-full max-md:hidden'>
        <Image
          src='/cover-img.jpg'
          alt='cover-image'
          height={500}
          width={500}
          className='w-full'
        />
      </div>
    </main>
  );
}
