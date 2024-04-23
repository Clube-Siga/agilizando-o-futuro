export default function Content({children, contentClass}){
    return (
        <>
            <div className={contentClass}>
                {children}
            </div>
        </>
    )
}
