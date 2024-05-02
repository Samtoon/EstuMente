export default function GoogleImage({
    compAlt,
    compSrc,
    compStyle
}: {
    compAlt?: string,
    compSrc: string,
    compStyle?: any
}) {
    return (
        <img referrerPolicy="no-referrer" alt={compAlt} src={compSrc} style={compStyle} />
    )
}