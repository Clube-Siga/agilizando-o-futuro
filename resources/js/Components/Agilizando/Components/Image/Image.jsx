export default function Image({altText, imgClass, imgPath}){
    return (
        <>
            <img className={imgClass} src={imgPath} alt={altText} />
        </>
    )
}
