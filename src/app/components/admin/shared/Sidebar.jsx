"use client";
import { userNavigation } from "@/app/utils/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiLogout } from "react-icons/ci";

import {
  IoChevronDownOutline,
  IoChevronForwardOutline,
  IoRemoveSharp,
} from "react-icons/io5";
import {
  Bars3Icon,
  BellIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import sidebar from "@/app/utils/sidebarMenu";
import { signOut, useSession } from "next-auth/react";
import useSetting from "../../store/dataFetching/useSetting";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Sidebar = () => {
  const pathname = usePathname();
  const session = useSession();
  // console.log("sidebar menu..", sidebar);
  // console.log("session.. in admin", session);
  // console.log('pathname',pathname)
  // const {sidebarOpen,setSidebarOpen}=useMainContext()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const { setting, settingLoading } = useSetting();

  const toggleSubmenu = (name) => {
    setOpenSubmenu((prevOpenSubmenu) =>
      prevOpenSubmenu === name ? null : name
    );
  };
  return (
    <>
      <div className="">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <Link onClick={() => setSidebarOpen(false)} href="/">
                        {" "}
                        <img
                          className="h-8 w-auto"
                          src={setting?.home?.logo}
                          alt="Your Company2"
                        />
                      </Link>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          {/* <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link  onClick={()=>setSidebarOpen(false)}
                        href={item.href}
                        className={classNames(
                          pathname === item.href
                            ? "bg-brand text-white"
                            : "text-gray-400 hover:text-white hover:bg-[#EC0A44]",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium"
                        )}
                      >
                                <item.icon
                                  className="h-6 w-6 shrink-0"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul> */}
                          <ul>
                            {sidebar.map((route) =>
                              route.routes ? (
                                <li
                                  className="relative px-6 py-3"
                                  key={route.name}
                                >
                                  <button
                                    className="inline-flex items-center justify-between focus:outline-none w-full text-sm font-semibold text-gray-500 duration-150"
                                    onClick={() => toggleSubmenu(route.name)}
                                    aria-haspopup="true"
                                  >
                                    <span className="inline-flex items-center">
                                      <route.icon
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                      />
                                      <span className="ml-4 mt-1">
                                        {route.name}
                                      </span>
                                      <span className="pl-4 mt-1">
                                        {openSubmenu === route.name ? (
                                          <IoChevronDownOutline />
                                        ) : (
                                          <IoChevronForwardOutline />
                                        )}
                                      </span>
                                    </span>
                                  </button>
                                  {openSubmenu === route.name && (
                                    <ul
                                      className="p-2 overflow-hidden text-sm font-medium text-white rounded-md"
                                      aria-label="submenu"
                                    >
                                      {route.routes.map((child, i) => (
                                        <li key={i + 1}>
                                          {child?.outside ? (
                                            <a
                                              href={child.path}
                                              target="_blank"
                                              className="flex items-center py-1 text-sm cursor-pointer"
                                              rel="noreferrer"
                                            >
                                              <span className="text-xs text-gray-500 pr-1">
                                                <IoRemoveSharp />
                                              </span>
                                              <span className="">
                                                {child.name}
                                              </span>
                                            </a>
                                          ) : (
                                            <Link
                                              href={child.path}
                                              passHref
                                              legacyBehavior
                                            >
                                              <a
                                                className={`flex items-center py-1 text-sm text-white hover:text-red-600 cursor-pointer ${
                                                  pathname === child.path
                                                    ? "text-secondary "
                                                    : ""
                                                }`}
                                                rel="noreferrer"
                                                onClick={() =>
                                                  setSidebarOpen(false)
                                                }
                                              >
                                                {pathname === child.path && (
                                                  <span
                                                    className="absolute inset-y-0 left-0 w-1 bg-secondary rounded-tr-lg rounded-br-lg"
                                                    aria-hidden="true"
                                                  ></span>
                                                )}
                                                <span className="text-xs pr-1 text-gray-500">
                                                  <IoRemoveSharp />
                                                </span>
                                                <span className="text-gray-500">
                                                  {child.name}
                                                </span>
                                              </a>
                                            </Link>
                                          )}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </li>
                              ) : (
                                <li className="relative" key={route.name}>
                                  <Link
                                    href={route.path}
                                    passHref
                                    legacyBehavior
                                  >
                                    <a
                                      className={`px-6 py-4 inline-flex items-center w-full text-sm font-semibold text-gray-500 duration-150 ${
                                        pathname === route.path
                                          ? "text-secondary "
                                          : ""
                                      }`}
                                      rel="noreferrer"
                                      onClick={() => setSidebarOpen(false)}
                                    >
                                      {pathname === route.path && (
                                        <span
                                          className="absolute inset-y-0 left-0 w-1 bg-secondary rounded-tr-lg rounded-br-lg"
                                          aria-hidden="true"
                                        ></span>
                                      )}
                                      <route.icon
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                      />
                                      <span className="ml-4">{route.name}</span>
                                    </a>
                                  </Link>
                                </li>
                              )
                            )}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <Link href="/">
                <img
                  className="h-8 w-auto"
                  src={setting?.home?.logo}
                  alt="Your Company-2"
                />
              </Link>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {sidebar.map((route) =>
                      route.routes ? (
                        <li className="relative px-6 py-3" key={route.name}>
                          <button
                            className="inline-flex items-center justify-between focus:outline-none w-full text-gray-500 text-sm font-semibold duration-150"
                            onClick={() => toggleSubmenu(route.name)}
                            aria-haspopup="true"
                          >
                            <span className="inline-flex items-center">
                              <route.icon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                              <span className="ml-4 mt-1">{route.name}</span>
                              <span className="pl-4 mt-1">
                                {openSubmenu === route.name ? (
                                  <IoChevronDownOutline />
                                ) : (
                                  <IoChevronForwardOutline />
                                )}
                              </span>
                            </span>
                          </button>
                          {openSubmenu === route.name && (
                            <ul
                              className="p-2 overflow-hidden text-sm font-medium rounded-md"
                              aria-label="submenu"
                            >
                              {route.routes.map((child, i) => (
                                <li key={i + 1}>
                                  {child?.outside ? (
                                    <a
                                      href={process.env.NEXT_PUBLIC_BASE_URL}
                                      target="_blank"
                                      className="flex items-center text-gray-500 py-1 text-sm cursor-pointer"
                                      rel="noreferrer"
                                    >
                                      <span className="text-xs text-gray-500 pr-1">
                                        <IoRemoveSharp />
                                      </span>
                                      <span className="hover:text-red-600 text-gray-500">
                                        {child.name}
                                      </span>
                                    </a>
                                  ) : (
                                    <Link
                                      href={child.path}
                                      passHref
                                      legacyBehavior
                                    >
                                      <a
                                        className={`flex items-center py-1 text-sm hover:text-red-600 cursor-pointer ${
                                          pathname === child.path
                                            ? "text-secondary "
                                            : ""
                                        }`}
                                        rel="noreferrer"
                                      >
                                        {pathname === child.path && (
                                          <span
                                            className="absolute inset-y-0 left-0 w-1 bg-secondary rounded-tr-lg rounded-br-lg"
                                            aria-hidden="true"
                                          ></span>
                                        )}
                                        <span className="text-gray-500 text-xs pr-1">
                                          <IoRemoveSharp />
                                        </span>
                                        <span className="text-gray-500">
                                          {child.name}
                                        </span>
                                      </a>
                                    </Link>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ) : (
                        <li className="relative" key={route.name}>
                          <Link href={route.path} passHref legacyBehavior>
                            <a
                              // target={`${route?.outside ? "_blank" : "_self"}`}
                              className={`px-6 py-4 inline-flex items-center w-full text-sm font-semibold text-gray-500 duration-150 hover:text-secondary ${
                                pathname === route.path ? "text-secondary " : ""
                              }`}
                              rel="noreferrer"
                            >
                              {pathname === route.path && (
                                <span
                                  className="absolute inset-y-0 left-0 w-1 bg-secondary rounded-tr-lg rounded-br-lg"
                                  aria-hidden="true"
                                ></span>
                              )}
                              <route.icon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                              <span className="ml-4">{route.name}</span>
                            </a>
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </li>

                <li className="mt-auto">
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-medium leading-6 text-gray-400 hover:bg-brand hover:text-white"
                  >
                    <CiLogout className="h-6 w-6 shrink-0" aria-hidden="true" />
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch items-center justify-end lg:gap-x-6">
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true"
                      >
                        {session?.data?.user?.name}
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <Menu.Item>
                        <a
                          type="button"
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="block px-3 py-1 text-sm leading-6 text-gray-900"
                        >
                          Signout
                        </a>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
