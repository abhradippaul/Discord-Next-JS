"use client"
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'


function ProviderSession({children}:{children: ReactNode}) {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default ProviderSession