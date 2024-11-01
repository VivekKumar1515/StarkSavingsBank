import Image from 'next/image'
import { Shield, Sword, Castle, Coins, Scroll, Book } from 'lucide-react'

const services = [
  { icon: Shield, name: 'Stark Shield Savings', description: 'Protect your gold like a Stark protects the North' },
  { icon: Sword, name: 'Valyrian Steel Investments', description: 'Rare and valuable, just like your portfolio' },
  { icon: Castle, name: 'Winterfell Mortgages', description: 'Your castle is your home, let us help you secure it' },
  { icon: Coins, name: 'Iron Bank Loans', description: 'Rapid and powerful financing for your conquests' },
  { icon: Scroll, name: 'Raven Retirement Plans', description: 'Ancient wisdom for your golden years' },
  { icon: Book, name: "Maester's Education Funding", description: "Invest in knowledge, it's the key to the Citadel" },
]

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-blue-900 text-gray-100 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10" 
        style={{ backgroundImage: "url('https://media.istockphoto.com/id/1343795923/photo/stone-wall-texture-background.jpg?s=612x612&w=0&k=20&c=49dhmVYXxyuT2v5GCFj3SevDMDAg2k31D9dqx1lHGnE=')" }}
      ></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-300 font-semibold tracking-wide uppercase">Our Services</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Banking for the Long Winter
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
            StarkSavingsBank offers a range of financial products and services to help you weather any storm, be it summer or the longest of winters.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {services.map((service) => (
              <div key={service.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <service.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-white">{service.name}</p>
                <p className="mt-2 ml-16 text-base text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="relative">
            <h3 className="text-2xl font-extrabold text-white tracking-tight sm:text-3xl">
              The Iron Bank of Braavos has nothing on us
            </h3>
            <p className="mt-3 text-lg text-gray-300">
              At StarkSavingsBank, we understand that winter is always coming. That&apos;s why we offer robust financial solutions to help you prepare for whatever the future may hold. From personal savings to kingdom-wide investments, our services are as strong and reliable as Valyrian steel.
            </p>

            <dl className="mt-10 space-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <Shield className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-white">Secure as the Wall</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-300">
                  Your assets are protected by our state-of-the-art security measures, rivaling the ancient magic of the Wall itself.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <Scroll className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-white">Growth like a Weirwood</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-300">
                  Watch your wealth grow steadily and surely, much like the ancient Weirwood trees of the North.
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
            <Image
              className="relative mx-auto rounded-lg shadow-lg"
              width={490}
              height={300}
              src="https://static1.srcdn.com/wordpress/wp-content/uploads/2019/04/GoT-Winterfell-Castle.jpg"
              alt="Winterfell Castle"
            />
          </div>
        </div>
      </div>
    </div>
  )
}