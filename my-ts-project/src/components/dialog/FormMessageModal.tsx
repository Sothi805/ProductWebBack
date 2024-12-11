import React, { FC, RefObject } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'


interface FormMessageModalProps {
  ref?: RefObject<FormMessageModal>,
  open?: boolean,
  message?: string
}



class FormMessageModal extends React.Component<FormMessageModalProps> {
  state = { open: false, message: 'No Message', title: 'No Title', isError: false, id: null, color: '', textColor: '' }

  success(message: string, id: number) {
    this.setState({
      open: true,
      isError: false,
      title: 'Success',
      message: message,
      id: id,
      color: 'bg-green-500',
      textColor: 'text-green-500'
    })
  }

  error(message: string, title?: string) {
    this.setState({
      open: true,
      isError: true,
      title: title ?? 'Invalid',
      message: message,
      color: 'bg-red-500',
      textColor: 'text-red-500',
    })
  }

  warning(message: string, title?: string) {
    this.setState({
      open: true,
      isError: true,
      title: title ?? 'Invalid',
      message: message,
      color: 'bg-orange-400/80',
      textColor: 'text-orange-400/80',
    })
  }


  onClose() {
    this.setState({ open: false });
  }

  render() {
    return (
      <Transition appear show={this.state.open} as={Fragment}>
        <Dialog as="div" className="relative z-[100] " onClose={() => this.onClose()}>
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
                <Dialog.Panel className={`min-w-[30vw] md:min-w-[70vw] shadow-lg transform overflow-hidden rounded-2xl bg-white text-left align-middle  transition-all`}>
                  <Dialog.Title
                    as="h3"
                    className={`px-6 py-3 w-full font-bold flex  items-center gap-2 text-lg font-base leading-6 ${this.state.textColor} `}
                  >
                    <span className='text-xl'>{this.state?.title ?? ''}</span>
                  </Dialog.Title>
                  <div className='px-6'>
                    <div className='border-b'></div>
                  </div>
                  <div className='px-6 '>
                    <div className=" text-gray-600 text-base py-4">
                      {this.state?.message}
                    </div>

                    <div className=" flex gap-2 justify-end py-4">
                      <button
                        className={`btn btn-md ${this.state.color} bg-green-500 hover:bg-gray-100/50 text-white hover:text-gray-500`}
                        onClick={() => this.setState({ open: false })}
                      >
                        <span className='capitalize text-base px-3'>Close</span>
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    )
  }
}

export default FormMessageModal;

