import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'


type LoadingDialog = {
    open: boolean,
}

export default function LoadingDialog(props: LoadingDialog) {
    return (
        <>
            <Transition appear show={props.open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => { }}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm bg-black/20" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full flex justify-center  items-center max-w-[8rem] h-[8rem] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl drop-shadow-sm transition-all">
                                    <div className="flex flex-col gap-3 justify-center items-center">
                                        <span className="loading loading-bars loading-lg text-primary"></span>
                                        <span className='text-gray-600 font-bold'>Loading...</span>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
