import Link from "next/link";
import { ReactNode } from "react";

import Logo from '~/svg/Logo.svg';

interface MenuItemProps {
    href: string;
    icon?: boolean;
    children: ReactNode
}

export const MenuItem = ({href, icon, children}: MenuItemProps) => {
    const linkLabel = icon ? <div className='flex flex-row'><Logo className='w-5' />{children}</div> : children;
    return <Link href={href}>{linkLabel}</Link>
}
