import React, { FC, RefObject } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'


export default function GetCustomerModal() {
    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-[100] " onClose={() => { }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto w-full ">
                    <div className="flex min-h-full items-center justify-center p-4 text-center ">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className={`flex flex-col w-[50vw] h-[70vh] shadow-lg transform overflow-hidden rounded-2xl bg-white text-left align-middle  transition-all`}>
                                <Dialog.Title
                                    as="h3"
                                    className={`px-6  py-3 w-full  flex  items-center gap-2 text-lg font-base leading-6`}
                                >
                                    <span className='font-bold text-lg'>Customer</span>
                                </Dialog.Title>
                                <div className='grow px-6 pt-3 pb-4 '>
                                    <div className="text-sm text-gray-600 my-4">
                                        asdas
                                    </div>


                                </div>
                                <div className="p-6 flex gap-2 justify-end -t pt-4">
                                    <button
                                        className='btn btn-sm bg-primary hover:bg-secondary/50 px-6'

                                        onClick={() => { }}
                                    >
                                        <span className=' capitalize text-white text-base'>Ok</span>
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
