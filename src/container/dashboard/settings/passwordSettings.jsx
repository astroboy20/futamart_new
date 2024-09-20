import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'

const PasswordSettings = ({ setSelected }) => {
  return (
    <div>
      <div className="flex  items-center text-[18px] font-[600] gap-3">
        <button className="flex lg:hidden" onClick={() => setSelected(null)}>
          <IoIosArrowBack />
        </button>
        Change Password
      </div>
      
      <form className="mt-12 flex flex-col gap-5">
        <div>
          <label className="text-[16px] lg:text-[18px] font-[600]">Enter old password</label>
          <Input className="h-[50px]" />
        </div>
        <div>
          <label className="text-[16px] lg:text-[18px] font-[600]">Enter new password</label>
          <Input className="h-[50px]" />
        </div>
        <div>
          <label className="text-[16px] lg:text-[18px] font-[600]">Confirm new password</label>
          <Input className="h-[50px]" />
        </div>
        <div className="ml-auto">
          <Button className="rounded-[4px] w-fit h-[50px]">Save changes</Button>
        </div>
      </form>
    </div>
  )
}

export { PasswordSettings };
