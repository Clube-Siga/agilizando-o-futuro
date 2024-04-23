import { } from '@inertiajs/react'

export default function SiteLayout({ children }) {

    return (
        <div className='min-h-screen flex flex-col items-center'>
            {children}
        </div>
    )
}
