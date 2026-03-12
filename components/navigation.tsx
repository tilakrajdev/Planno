"use client";

import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { SettingsIcon, UserIcon } from "lucide-react"
import Link from "next/link"
import {GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill} from "react-icons/go"

import { useWorkspaceId } from "@/features/workspaces/hooks/user-workspace-id"

const routes = [
    {
        label: "Home",
        href: "",
        icon: GoHome,
        activation: GoHomeFill
    },
    {
        label: "My Tasks",
        href: "/tasks",
        icon: GoCheckCircle,
        activation: GoCheckCircleFill,
    },
    {
        label: "Settings",
        href: "/settings",
        icon: SettingsIcon,
        activation: SettingsIcon
    },
    {
        label: "Members",
        href: "/members",
        icon: UserIcon,
        activation: UserIcon,
    },
]

export const Navigation = () => {
    const workspaceId = useWorkspaceId();
    const pathname = usePathname();

    return (
        <ul>
            {routes.map((item) => {
                const fullHref = `/workspaces/${workspaceId}${item.href}`
                const isActive = pathname === fullHref;
                const Icon = isActive ? item.activation : item.icon;

                return (
                    <Link key={item.href} href={fullHref}>
                        <div className={cn("flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                        isActive && "bg-white shadow-sm hover:opacity-100text-primary"
                        )}>
                            <Icon className="size-5 text-neutral-500"/>
                            {item.label}
                        </div>
                    </Link>
                )
            })}
        </ul>
    )
}