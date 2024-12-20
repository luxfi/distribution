import React from 'react'

import { cn } from '@hanzo/ui/util'
import { ConnectButton } from '@rainbow-me/rainbowkit';

import  Logo  from '../logo'

import DesktopBagPopup from '../commerce/desktop-bag-popup'
import BagButton from '../commerce/bag-button'
import DesktopNav from '../commerce/desktop-nav-menu'


import type { LinkDef } from '@hanzo/ui/types'

const DesktopHeader: React.FC<{
  currentAs: string | undefined
  links: LinkDef[]
  className?: string
}> = ({
  links,
  className = ''
}) => {
    const [isMenuOpened, setIsMenuOpen] = React.useState(false);
    const opendMenuClass = isMenuOpened ? " h-full" : ""

    // TODO move 13px into a size class and configure twMerge to recognize say, 'text-size-nav' 
    // (vs be beat out by 'text-color-nav')
    return (
      <header className={cn('bg-[rgba(0, 0, 0, 0.5)] !backdrop-blur-3xl fixed z-header top-0 left-0 right-0', className, opendMenuClass)} >
        {/* md or larger */}
        <div className={
          'flex flex-row h-[80px] items-center justify-between ' +
          'mx-[24px] w-full max-w-screen'
        }>
          <Logo size='md' href='/' outerClx='hidden lg:flex' key='two' variant='text-only' />
          <Logo size='sm' href='/' outerClx='hidden md:flex lg:hidden' key='one' variant='text-only' />
          {/* md or larger */}
          <div className='flex w-full gap-4 items-center justify-center'>
            <DesktopNav links={links} isMenuOpened={isMenuOpened} setIsMenuOpen={setIsMenuOpen} />
          </div>
          <div className='flex items-center'>
            <DesktopBagPopup popupClx='w-[340px]' trigger={<BagButton className='text-primary -mr-[3px] lg:min-w-0' />} />
            <ConnectButton label='Connect' accountStatus={"avatar"} chainStatus={"name"} showBalance={true} />
          </div>
        </div>
      </header>
    )
  }

export default DesktopHeader

