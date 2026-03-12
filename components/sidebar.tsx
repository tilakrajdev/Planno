import Link from "next/link"
import Image from "next/image"
import { DottedSeparator } from "./dotted-separator"
import { Navigation } from "./navigation"
import { WorkspaceSwitcher } from "./workspace-switcher"

export const Sidebar = () => {
    return (
        <aside className="h-full bg-neutral-100 p-4 w-full">
            <Link href="/" className="flex items-center">
                <Image src="/logo.svg" alt="logo" width={48} height={48}/>
                <span>Planno</span>
            </Link>
            <DottedSeparator className="my-2"/>
            <WorkspaceSwitcher/>
            <DottedSeparator className="my-2"/>
            <Navigation/>
        </aside>
    )
}