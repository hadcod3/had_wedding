import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import NavItems from "./NavItems"
import Mobilenav from "./MobileNav"
import MobileNav from "./MobileNav"

const Header = () => {
  return (
    <header className="w-full border-b">
        <div className="wrapper flex items-center justify-between">
            <Link href="/" className="flex items-center gap-5">
                <Image
                    src="/assets/images/logo.png"
                    alt="Had Wedding Logo"
                    width={200}
                    height={40}
                />
            </Link>

            {/* Nav Item when user already sign in */}
            <SignedIn>
                <nav className="md:flex-between hidden w-full max-w-sm">
                    <NavItems/>
                </nav>
            </SignedIn>

            <div className="flex w-32 justify-end gap-3">
                <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                    <MobileNav/>
                </SignedIn>
                <SignedOut>
                    <Button asChild className="rounded-full bg-primary-1000 hover:bg-primary-400 transition-colors duration-200 ease-in-out" size="lg">
                        <Link href="/sign-in">
                            Login
                        </Link>
                    </Button>
                </SignedOut>
            </div>
        </div>
    </header>
  )
}

export default Header
