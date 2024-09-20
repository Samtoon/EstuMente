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
  const rootStyle: CSSProperties = {
    border: "3px solid transparent",
    background:
      "linear-gradient(white, white) padding-box, linear-gradient(to right, #990000, #CC3333) border-box",
  };
  return (
    <img
      referrerPolicy="no-referrer"
      alt={compAlt}
      src={compSrc}
      style={Object.assign({}, rootStyle, compStyle)}
    />
  );
}
