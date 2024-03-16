"use client"

import { IPacket } from '@/lib/database/models/packet.model'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import Checkout from './Checkout'

const CheckoutButton = ({ packet }: { packet: IPacket }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  return (
    <div className="flex items-center gap-3">
        <>
          <SignedOut>
            <Button asChild className="button rounded-full" size="lg">
              <Link href="/sign-in">
                Rent Now
              </Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout packet={packet} userId={userId} />
          </SignedIn>
        </>
    </div>
  )
}

export default CheckoutButton