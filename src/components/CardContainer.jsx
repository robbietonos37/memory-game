import React, { useEffect } from "react";
import { useState } from "react";
import Card from "./Card";

export default function CardContainer() {
    const [cards, setCards] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    useEffect(() => {
        async function fetchCatImages() {
            try {
                const promises = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
                const images = await promises.json();
                const cats = images.map(image => ({ catImageURL: image.url, wasClicked: false }));
                console.log('The image URLs');
                images.forEach(image => {
                    console.log(image.url);
                })
                setCards(cats);
            } catch (err) {
                console.error('Error fetching cat images:', err);
            }
        }

        fetchCatImages();
    }, []);

    const handleClick = (index) => {
        // Check if the card has already been clicked
        if (cards[index].wasClicked) {
            // Reset game
            resetGame();
        } else {
            // Update score and set the card as clicked
            const updatedCards = [...cards];
            updatedCards[index].wasClicked = true;
            setCards(updatedCards);
            setScore(score + 1);
        }
    };

    const resetGame = () => {
        // Reset score and card clicked status
        setScore(0);
        setCards(cards.map(card => ({ ...card, wasClicked: false })));
        // Update high score if necessary
        if (score > highScore) {
            setHighScore(score);
        }
    };

    return (
        <div>
            <div>
                <p>Current Score: {score}</p>
                <p>High Score: {highScore}</p>
            </div>
            {cards.forEach(img => {
                console.log('Value being passed to cards' + img.catImageURL)
            })}
            <div className="cards-container">
                {cards.map((card, index) => (
                    <Card
                        key={index}
                        catImageUrl={card.catImageURL}
                        onClick={() => handleClick(index)}
                    />
                ))}
            </div>
        </div>
    );


}