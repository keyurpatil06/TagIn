'use client'

import { useRouter } from 'next/navigation'
import MagicButton from './MagicButton'
import { SparklesCore } from './ui/Sparkles'

const HeroSection = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/events');
  }
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className="h-[40rem] w-5/6 bg-black flex flex-col items-center justify-center overflow-hidden rounded-xl">
        <h1 className="md:text-7xl text-7xl lg:text-9xl font-bold text-center text-white relative z-20">
          Tag<span className='text-red-500'>In</span>
        </h1>

        <div className="w-[40rem] h-20 md:h-40 relative">
          {/* Gradients */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Core component */}
          <SparklesCore
            background="transparent"
            minSize={0.3}
            maxSize={0.8}
            particleDensity={1000}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />

          {/* Radial Gradient to prevent sharp edges */}
          <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
        <p className="text-center mt-2 font-medium md:text-lg text-neutral-300 relative z-20">
          Slide in, tag up, and own your event vibe!
        </p>
        <MagicButton title='Join the Fun!' className='mt-4' onClick={handleClick} />
      </div>
    </div>
  )
}

export default HeroSection
