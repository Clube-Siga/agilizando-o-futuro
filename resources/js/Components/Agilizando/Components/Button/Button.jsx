import { Link } from "@inertiajs/react"
export default function Button({buttonClass ,path, title}){

    return (
            <Link href={path} className={buttonClass}>
                {title}
            </Link>
    )
}
