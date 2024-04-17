export default function Text({textClass, textContent}){
    return (
        <>
            <p className={textClass}>{textContent}</p>
        </>
    )
}
