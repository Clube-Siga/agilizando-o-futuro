import {} from '@inertiajs/react'

export default function SiteLayout({children}){
    return(
        <div className='mx-0 flex flex-col items-center'>
            {children}
        </div>
    )
}
