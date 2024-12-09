import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import myname from '../Api/nameapi'
import { useEffect } from 'react';
import { useState } from 'react';
const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Request', href: '/request', current: false },
  { name: 'About Us', href: '#', current: false },
  { name: 'Contact', href: '#', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Add any logout logic here if necessary
    navigate('/login'); // Navigate to the login page
  };

  const [meroname,setname]=useState({})
  useEffect(()=>{
    const pop=async()=>{
      const name = await myname();
      setname(name);
      console.log(name);
      
    }
  pop()
  },[])
  return (
    <Disclosure as="nav" className="bg-yellow-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon className="hidden h-6 w-6" aria-hidden="true" />
            </Disclosure.Button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-yellow-600 text-white' : 'text-white hover:bg-yellow-600',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="text-white hover:bg-yellow-600 rounded-md px-3 py-2 text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          <p>{meroname.msg}</p>
        </div>
      </div>

      <Disclosure.Panel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <Disclosure.Button
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                item.current ? 'bg-yellow-600 text-white' : 'text-white hover:bg-yellow-600',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
              aria-current={item.current ? 'page' : undefined}
            >
              {item.name}
            </Disclosure.Button>
          ))}
          {/* Logout button in mobile view */}
          <Disclosure.Button
            onClick={handleLogout}
            className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-yellow-600"
          >
            Logout
          </Disclosure.Button>
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
}
