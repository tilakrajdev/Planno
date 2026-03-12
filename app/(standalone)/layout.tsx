import Link  from "next/link";
import Image from "next/image";
import { UserButton } from "@/features/auth/components/user-button";

interface StandaloneLayoutProps{
    children: React.ReactNode;
}

const StandaloneLayout = ({children}: StandaloneLayoutProps) => {
    return(
        <main className="bg-neutral-100 min-h-screen">
            <div className="mx-auto max-w-screen-2xl p-4">
                <nav className="flex justify-between items-center h-18.25">
                    <Link href="/" className="flex items-center">
                        <Image src="/logo.svg" alt='logo' height={51} width={51}/>
                        <span className="text-4xl font-bold">Planno</span>
                    </Link>
                    <UserButton/>
                </nav>
                <div className="flex flex-col items-center justify-center py-4">
                    {children}
                </div>
            </div>
        </main>
    )
}


export default StandaloneLayout;