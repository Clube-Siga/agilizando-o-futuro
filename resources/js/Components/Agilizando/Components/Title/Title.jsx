import { Link } from "@inertiajs/react"
export default function Title({titleClass, titleContent}){
    return (
        <>
            <h3 className={titleClass}>
                <Link href="#">{titleContent}</Link>
            </h3>
        </>
    )
}
