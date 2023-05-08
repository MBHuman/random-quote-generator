import React, { useState } from 'react';
import anime from 'animejs';

const MyComponent = () => {
    const [red, setRed] = useState(0);
    const [green, setGreen] = useState(0);
    const [blue, setBlue] = useState(0);

    const animateColor = () => {
        anime({
            targets: [red, green, blue],
            duration: 1000,
            easing: 'linear',
            update: () => {
                const newColor = `rgb(${red}, ${green}, ${blue})`;
                // Update the color value in the DOM or anywhere else you need it
                console.log(newColor);
            },
            red: Math.floor(Math.random() * 256),
            green: Math.floor(Math.random() * 256),
            blue: Math.floor(Math.random() * 256),
        });
    };

    return (
        <div>
            <button onClick={animateColor}>Animate Color</button>
        </div>
    );
};

export default MyComponent;