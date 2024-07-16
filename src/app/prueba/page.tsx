"use client"
import { useEffect, useState } from "react";

export default function Prueba() {
    const [src, setSrc] = useState("");
    useEffect(() => {
        fetch("http://localhost:3000/api/files/1U2YkbeJqlaev8ttz9jO_TCw3mT6SIpdp")
        .then((response) => {
            console.log(response);
            return response.blob();
        })
        .then((blob) => {
            const url = URL.createObjectURL(blob);
            console.log("La url es:",url);
            setSrc(url);
        })
        .catch((error) => console.log(error));
        
    }, [setSrc])
    
    return(
        <iframe src={src}></iframe>
    );
}