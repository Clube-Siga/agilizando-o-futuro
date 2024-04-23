export default function Title({children, titleClass, titleContent}){
    return (
        <>
            <h3 className={titleClass}>
                {children}
                {titleContent}
            </h3>
        </>
    )
}
