export default function Image({altText, imgPath}){
    return (
        <>
            <img src={imgPath} alt={altText} />
        </>
    )
}
