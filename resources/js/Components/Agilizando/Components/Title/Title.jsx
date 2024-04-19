export default function Title({titleClass, titleContent}){
    return (
        <>
            <h3 className={titleClass}>
                {titleContent}
            </h3>
        </>
    )
}
