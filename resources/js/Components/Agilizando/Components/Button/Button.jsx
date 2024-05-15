import { Link } from "@inertiajs/react"
export default function Button({buttonClass , path, title, type}){

    return (
            <Link type={type} href={path} className={buttonClass}>
                {title}
            </Link>
    )
}
