
export const FooterPowerBy = () => {

    const date = new Date().toISOString()


    return <div className='flex gap-2 text-gray-500'>
        <span>&copy; Copyright ©{date.split('-')[0]} MonyReaksmey Co.,Ltd.</span>
    </div>
}