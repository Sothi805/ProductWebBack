import React, { Fragment } from 'react'
import { Dialog, Transition } from "@headlessui/react";

const AreYouSureDialog = () => {
  return (
    <div>
      <Transition appear
        // show={isOpen}
        as={Fragment}>
        <Dialog as="div" className="relative z-10"
          // onClose={true}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
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
                <Dialog.Panel className="w-full h-[10rem] max-w-md relative transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl">
                  <Dialog.Title
                    as="h3"
                    className="text-md p-2 font-bold leading-6 text-gray-900"
                  >
                    Are You Sure Want To Remove Driver ?
                  </Dialog.Title>
                  <div className="mt-4 absolute bottom-6 right-7 flex justify-end gap-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent px-4 py-1 text-sm font-medium text-green-600 focus:outline-none focus-visible:ring-blue-500 "
                      // onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className=" bg-green-600 h-[27px] text-sm text-white px-4 rounded-sm"
                      // onClick={() => {
                      //   deleteItem(id);
                      //   setIsOpen(false);
                      // }}
                    >
                      Confirm
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default AreYouSureDialog
