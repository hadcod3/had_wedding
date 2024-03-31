"use client"

import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import Checkout from './Checkout'
import { IPacket } from '@/lib/database/models/packet.model';
import { IProduct } from '@/lib/database/models/product.model';
import { IGear } from '@/lib/database/models/gear.model';

type ButtonProps = {
    buttonType?: 'Packet' | 'Product' | 'Gear';
}

const CheckoutButton = (
    { buttonType, value }
    : { buttonType: ButtonProps['buttonType'], value: IPacket | IProduct | IGear }) => {

    const { user } = useUser();
    const userId = user?.publicMetadata.userId as string;
 
    return (
        <div className="flex items-center gap-3">
            <>
            <SignedOut>
                <Button asChild className="button rounded-full" size="lg">
                    <Link href="/sign-in">
                        Sign in
                    </Link>
                </Button>
            </SignedOut>

            <SignedIn>
                {buttonType === 'Packet' && (
                    <Checkout value={value as IPacket} userId={userId} />
                )}
                {buttonType === 'Product' && (
                    <Checkout value={value as IProduct} userId={userId} />
                )}
                {buttonType === 'Gear' && (
                    <Checkout value={value as IGear} userId={userId} />
                )}
            </SignedIn>
            </>
        </div>
    )
}

export default CheckoutButton