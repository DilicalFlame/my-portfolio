import FluidNoiseBackground from './fluid-noise-background'
import Navbar from '../shared/navbar'

export default function HeroSection() {
  return (
    <section id='home' className='relative h-screen w-full overflow-hidden'>
      {/* Fluid Noise Background */}
      <FluidNoiseBackground />

      {/* Navbar */}
      <Navbar />

      {/* Hero Content */}
      <div className='relative z-10 flex h-full items-center justify-center'>
        <div className='mx-auto max-w-4xl space-y-6 px-4 text-center'>
          {/* Main Title */}
          <h1 className='text-5xl font-bold text-white md:text-7xl lg:text-8xl'>
            <span className='block'>dilicalflame</span>
            <span className='mt-2 block text-3xl font-light text-white/80 md:text-4xl lg:text-5xl'>
              (devesh)
            </span>
          </h1>

          {/* Subtitle */}
          <p className='mx-auto max-w-2xl text-xl leading-relaxed text-white/90 md:text-2xl'>
            Creative Developer & Digital Artist
          </p>

          {/* Description */}
          <p className='mx-auto max-w-3xl text-lg leading-relaxed text-white/70'>
            Crafting immersive digital experiences through code, design, and
            interactive art. Exploring the intersection of technology and
            creativity.
          </p>

          {/* CTA Buttons */}
          <div className='mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <button className='rounded-lg border border-white/30 bg-white/20 px-8 py-3 text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/30'>
              View My Work
            </button>
            <button className='rounded-lg border border-white/50 bg-transparent px-8 py-3 text-white transition-all duration-300 hover:scale-105 hover:bg-white/10'>
              Get In Touch
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className='absolute bottom-8 left-1/2 -translate-x-1/2 transform'>
            <div className='animate-bounce'>
              <svg
                className='h-6 w-6 text-white/60'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 14l-7 7m0 0l-7-7m7 7V3'
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
