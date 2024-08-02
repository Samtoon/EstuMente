import { CSSProperties } from "react";

export default function GoogleImage({
  compAlt,
  compSrc,
  compStyle,
}: {
  compAlt?: string;
  compSrc: string;
  compStyle?: CSSProperties;
}) {
  return (
    <img
      referrerPolicy="no-referrer"
      alt={compAlt}
      src={compSrc}
      style={compStyle}
    />
  );
}
