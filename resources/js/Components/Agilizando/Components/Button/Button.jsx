import { Link } from "@inertiajs/react"
export default function Button({path, title}){

    return (
            <Link href={path} className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                        {title}
            </Link>
    )
}
