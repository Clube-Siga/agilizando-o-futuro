export default function Title({children, titleClass, titleContent}){
    return (
        <>
            <h2 className={titleClass}>
                {children}
                {titleContent}
            </h2>
        </>
    )
}