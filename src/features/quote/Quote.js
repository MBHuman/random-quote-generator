import anime from "animejs";
import { useState, useEffect, useCallback, useRef } from "react";
import { Container } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

const getRandomColor = () => {
    const r = Math.floor(Math.random() * 120 + 40); // Generate a random value between 0 and 255 for red
    const g = Math.floor(Math.random() * 150 + 60); // Generate a random value between 0 and 255 for green
    const b = Math.floor(Math.random() * 180 + 40); // Generate a random value between 0 and 255 for blue

    return `rgb(${r}, ${g}, ${b})`; // Return the color in RGB format
}

const Quote = () => {

    const [quotes, setQuotes] = useState([]);
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const backgroundRef = useRef(null);
    const authorRef = useRef(null);
    const textRef = useRef(null);
    const buttonRef = useRef(null);
    const [backgroundColor, setBackgroundColor] = useState('#FF0000');

    useEffect(() => {
        const bgEffect = async () => {
            await Promise.all([
                anime({
                    targets: [backgroundRef.current, buttonRef.current],
                    backgroundColor: backgroundColor, // Animate the background color
                    duration: 1500,
                    easing: 'easeInOutSine',
                }).finished,
                anime.timeline({
                    easing: 'easeInOutSine'
                }).add({
                    targets: [authorRef.current, textRef.current],
                    duration: 750,
                    opacity: [1, 0],
                    complete: () => {
                        const randomQuote = getRandomQuote(quotes);
                        setText(randomQuote.quote ?? '');
                        setAuthor(randomQuote.author ?? '');
                    }
                }).add({
                    targets: [authorRef.current, textRef.current],
                    color: backgroundColor,
                    duration: 750,
                    opacity: [0, 1],
                }).finished
            ]);
        }
        bgEffect();

    }, [backgroundColor, quotes]);

    useEffect(() => {
        const getQuotes = async () => {
            const data = await fetch("random-quote-generator/quotes.json")
                .then(res => res.json())
                .catch(err => {
                    console.error(err);
                });
            setQuotes(data.quotes ?? []);
        }
        getQuotes();
    }, []);

    const getRandomQuote = (array) => {
        return array.length !== 0 ?
            array[Math.floor(Math.random() * (array.length - 1))] :
            {};
    }

    const updateQuote = useCallback(() => {
        const newBackgroundColor = getRandomColor();
        setBackgroundColor(newBackgroundColor);
    }, [])

    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center"

            ref={backgroundRef}
        >
            <Container style={{
                maxWidth: "90vw",
                minWidth: "40vw",
                minHeight: "40vh",
                borderRadius: "20px",
                background: "white",
                padding: "50px"
            }}>
                <Row style={{ minHeight: "5vh" }}>
                    <h1
                        className="text-center"
                        style={
                            { color: "white" }
                        }
                        ref={textRef}
                    >
                        <i className="fa fa-quote-left pe-3"></i>
                        <span>{text}</span>
                    </h1>
                    <h2 style={{ color: "white" }} ref={authorRef}>- {author}</h2>
                </Row>
                <Row className="my-5">
                    <Col className="d-flex justify-content-center ">
                        <button className="px-5 py-3" ref={buttonRef} onClick={updateQuote} style={{ borderRadius: "10px", border: "none", color: "white" }}>
                            <h5>
                                New Quote
                            </h5>
                        </button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Quote;