import React, { RefObject } from 'react'
import { ReactComponent as CloseIcon } from "@/assets/svg/close.svg";
import { twMerge } from 'tailwind-merge';

type AlertType = 'success' | 'error' | 'warning';

interface AlertProps {
  ref?: RefObject<Alert>,
  className?: string | undefined
}

class Alert extends React.Component<AlertProps> {
  state = { open: false, message: '', color: '', textColor: '', isError: false, id: null }

  open(type: AlertType, message: string) {
    const currenState = { ...this.state };
    currenState['open'] = true;
    currenState['message'] = message;
    switch (type) {
      case 'success':
        currenState['color'] = 'bg-green-100'
        currenState['textColor'] = 'text-green-600'
        break;
      case 'error':
        currenState['color'] = 'bg-red-100'
        currenState['textColor'] = 'text-red-600'
        break;
      default:
        currenState['color'] = 'bg-orange-100'
        currenState['textColor'] = 'text-orange-600'
    }
    this.setState(currenState);
  }

  onClose() {
    this.setState({ open: false, message: '' });
  }

  render() {
    return (
      <div className={twMerge(`transition-all duration-200 whitespace-nowrap overflow-hidden'${!this.state.open ? 'min-h-[0rem] max-h-[0rem]' : 'min-h-[3rem] max-h-[3rem] p-3 px-4 pl-8 my-2'}  w-full ${this.state?.color} rounded-md  flex justify-between  `, this.props?.className)}>
        <span className={this.state.textColor}>{this.state.message}</span>
        {(this.state.open) && <div
          onClick={() => this.onClose()}
          className={`btn btn-xs bg-transparent border-none hover:bg-gray-100/50 ${this.state.textColor} whitespace-nowrap`}>
          <CloseIcon className='w-5' />
        </div>}
      </div>
    )
  }
}

export default Alert;
