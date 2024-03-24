import React, { useEffect } from "react";
import { useState } from "react";

export default function Card() {
    const [catImages, setCatImages] = useState([]);

    async function getCatImages() {
        const promises = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
        const images = await promises.json();
        const cats = images.map(image => image.url);
        setCatImages(cats);
    }

    useEffect(() => {
        getCatImages();
    }, []);

    return <div>
        {console.log('cat images hs this' + catImages)}
        {catImages && catImages.map((cat, index) => (
            <div className="card-container" key={index}>
                <img id={index} src={cat} alt={`Cat ${index}`} />
            </div>
        ))}
    </div>
}