import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react'
import {
    Bars3Icon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import classNames from 'classnames'
import React, { Fragment, useState } from 'react'
import LogoImg from '../../assets/images/logo.svg'
import { useAuth } from '../../hooks/useAuth'

const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
    { name: 'Contacts', href: '/contacts', icon: UsersIcon, current: false },
]
const teams = [
    { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
    { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
    { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]

const Sidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const { user } = useAuth()

    return (
        <>
            <Transition show={sidebarOpen} as={Fragment}>
                <Dialog
                    className="relative z-50 lg:hidden"
                    onClose={setSidebarOpen}
                >
                    <TransitionChild
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900/80" />
                    </TransitionChild>

                    <div className="fixed inset-0 flex">
                        <TransitionChild
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                                <TransitionChild
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
                                            onClick={() =>
                                                setSidebarOpen(false)
                                            }
                                        >
                                            <span className="sr-only">
                                                Close sidebar
                                            </span>
                                            <XMarkIcon
                                                className="h-6 w-6 text-white"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                </TransitionChild>
                                {/* Sidebar component, swap this element with another sidebar if you like */}
                                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary-950 px-6 pb-2">
                                    <div className="flex h-16 shrink-0 items-center">
                                        <img
                                            className="h-8 w-auto"
                                            src={LogoImg}
                                            alt="benefits-rite-now"
                                        />
                                    </div>
                                    <nav className="flex flex-1 flex-col">
                                        <ul
                                            role="list"
                                            className="flex flex-1 flex-col gap-y-7"
                                        >
                                            <li>
                                                <ul
                                                    role="list"
                                                    className="-mx-2 space-y-1"
                                                >
                                                    {navigation.map(item => (
                                                        <li key={item.name}>
                                                            <a
                                                                href={item.href}
                                                                className={classNames(
                                                                    item.current
                                                                        ? 'bg-indigo-700 text-white'
                                                                        : 'text-indigo-200 hover:bg-indigo-700 hover:text-white',
                                                                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                                                                )}
                                                            >
                                                                <item.icon
                                                                    className={classNames(
                                                                        item.current
                                                                            ? 'text-white'
                                                                            : 'text-indigo-200 group-hover:text-white',
                                                                        'h-6 w-6 shrink-0'
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                                {item.name}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                            <li>
                                                <div className="text-xs font-semibold leading-6 text-indigo-200">
                                                    Your teams
                                                </div>
                                                <ul
                                                    role="list"
                                                    className="-mx-2 mt-2 space-y-1"
                                                >
                                                    {teams.map(team => (
                                                        <li key={team.name}>
                                                            <a
                                                                href={team.href}
                                                                className={classNames(
                                                                    team.current
                                                                        ? 'bg-indigo-700 text-white'
                                                                        : 'text-indigo-200 hover:bg-indigo-700 hover:text-white',
                                                                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                                                                )}
                                                            >
                                                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">
                                                                    {
                                                                        team.initial
                                                                    }
                                                                </span>
                                                                <span className="truncate">
                                                                    {team.name}
                                                                </span>
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary-950 px-6">
                    <div className="flex h-16 shrink-0 mt-4 items-center gap-x-2">
                        <img
                            className="h-10 w-auto"
                            src={LogoImg}
                            alt="benefits-rite-now"
                        />
                        <h1 className='text-2xl font-semibold text-primary-100 leading-none'>Admin</h1>
                    </div>
                    <nav className="flex flex-1 flex-col ml-2">
                        <ul
                            role="list"
                            className="flex flex-1 flex-col gap-y-7"
                        >
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map(item => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'text-primary-100'
                                                        : 'text-primary-500 hover:text-primary-100',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                                                )}
                                            >
                                                <item.icon
                                                    className={classNames(
                                                        item.current
                                                            ? 'text-primary-100'
                                                            : 'text-primary-500 group-hover:text-primary-100',
                                                        'h-5 w-5 shrink-0'
                                                    )}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="-mx-8 mt-auto">
                                <a
                                    href="#"
                                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-primary-100 hover:bg-primary-800"
                                >
                                    <img
                                        className="h-8 w-8 rounded-full bg-primary-700"
                                        src={`https://robohash.org/${encodeURIComponent(user.username)}`}
                                        alt=""
                                    />
                                    <span className="sr-only">
                                        Your profile
                                    </span>
                                    <span aria-hidden="true">{user.username}</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-primary px-4 py-4 shadow-sm sm:px-6 lg:hidden">
                <button
                    type="button"
                    className="-m-2.5 p-2.5 text-indigo-200 lg:hidden"
                    onClick={() => setSidebarOpen(true)}
                >
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="flex-1 text-sm font-semibold leading-6 text-white">
                    Dashboard
                </div>
                <a href="#">
                    <span className="sr-only">Your profile</span>
                    <img
                        className="h-8 w-8 rounded-full bg-primary-400"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />
                </a>
            </div>
        </>
    )
}

export default Sidebar
