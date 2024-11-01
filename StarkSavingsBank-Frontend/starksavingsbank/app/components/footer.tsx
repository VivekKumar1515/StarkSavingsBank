import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import Image from 'next/image'

const footerLinks = [
  { title: 'Banking', links: ['Accounts', 'Loans', 'Savings', 'Investments'] },
  { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Blog'] },
  { title: 'Support', links: ['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'] },
]

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-blue-900 text-gray-100 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10" 
        style={{ backgroundImage: "url('https://media.istockphoto.com/id/1343795923/photo/stone-wall-texture-background.jpg?s=612x612&w=0&k=20&c=49dhmVYXxyuT2v5GCFj3SevDMDAg2k31D9dqx1lHGnE=')" }}
      ></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-12 h-12 transform transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="https://a0.anyrgb.com/pngimg/1464/1846/stark-logo-catelyn-stark-bran-stark-prince-of-winterfell-eddard-stark-silver-shield-winter-is-coming-house-stark-sigil-stark-thumbnail.png"
                  alt="StarkSavingsBank"
                  layout='fill'
                  className="rounded-full object-cover "
                />
                <div className="absolute inset-0 bg-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <span className="text-xl font-semibold tracking-wider">StarkSavingsBank</span>
            </Link>
            <p className="text-sm text-gray-300">Securing your wealth through the long winter.</p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  <span className="sr-only">{link.name}</span>
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-gray-300 hover:text-white transition duration-300"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} StarkSavingsBank. All rights reserved.
          </p>
          <div className="mt-4 sm:mt-0">
            <Link
              href="#"
              className="text-sm text-gray-400 hover:text-white transition duration-300 mr-4"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-400 hover:text-white transition duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}