import "./App.scss";
import React, { useEffect, useState, useRef } from "react";
import { convertTime, generateRGB, mutateRGB } from "./constants";

function App() {
  const [point, setPoint] = useState(0);
  const [sizeBoard, setSizeBoard] = useState(2);
  const [timeLeft, setTimeLeft] = useState(15);
  const [RGB, setRGB] = useState(generateRGB());
  const [diffIndex, setDiffIndex] = useState([]);
  const [diffColor, setDiffColor] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(true);

  const auRef = useRef();

  const handlePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleMute = () => {
    !isMute ? auRef.current.pause() : auRef.current.play();
    setIsMute(!isMute);
  };

  const onComplited = (row, col) => {
    if (row === diffIndex[0] && col === diffIndex[1]) {
      setPoint((prev) => prev + 1);
      setTimeLeft((prev) => prev + 1);
      newRound();
    } else {
      setTimeLeft((prev) => prev - 3);
    }
  };

  const generateDiffIndex = () => {
    return Math.floor(Math.random() * sizeBoard);
  };

  const newRound = () => {
    const rgb = generateRGB();
    const newRGB = mutateRGB(rgb);
    const size = Math.min(Math.max(Math.round(Math.sqrt(point)), 2), 5);

    setRGB(rgb);
    setSizeBoard(size);
    setDiffIndex([generateDiffIndex(), generateDiffIndex()]);
    setDiffColor(`rgb(${newRGB.r}, ${newRGB.g}, ${newRGB.b})`);
  };

  const start = () => {
    newRound();
    setTimeLeft(15);
    setIsPlaying(false);
    setIsMute(true);
    setPoint(0);
  };

  useEffect(() => {
    start();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        if (timeLeft === 0) {
          auRef.current.pause();
          alert("GAME OVER!");
          start();
          return;
        } else {
          setTimeLeft((prev) => prev - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, [isPlaying, timeLeft]);

  return (
    <div className="container">
      <audio src={require("./assets/sound.mp3")} ref={auRef} loop></audio>
      <div className={`game-board ${isPlaying ? "" : "disable"}`}>
        {Array(sizeBoard)
          .fill()
          // duyet theo truc x => col
          /**
          0------------------------> x
          |   1  2  3
          |   4  5  6
          |   7  8  9
          | y
           */
          .map((val, columnIndex) => (
            <div key={columnIndex}>
              {Array(sizeBoard)
                .fill()
                .map((val, rowIndex) => (
                  <div
                    className="square"
                    key={`${rowIndex}.${columnIndex}`}
                    style={{
                      backgroundColor:
                        rowIndex === diffIndex[0] &&
                        columnIndex === diffIndex[1]
                          ? diffColor
                          : `rgb(${RGB.r}, ${RGB.g}, ${RGB.b})`,
                    }}
                    onClick={() => onComplited(rowIndex, columnIndex)}></div>
                ))}
            </div>
          ))}
      </div>
      <div className="side-bar">
        <div className="header">
          <h1>
            <span style={{ color: "#E64C3C" }}>C</span>
            <span style={{ color: "#E57E31" }}>O</span>
            <span style={{ color: "#F1C431" }}>L</span>
            <span style={{ color: "#68CC73" }}>O</span>
            <span style={{ color: "#3998DB" }}>R</span>
            <span style={{ color: "#555555" }}> BLINDER</span>
          </h1>
        </div>
        <div className="info">
          <p className="score">
            Score: <span>{point * 10}</span>
          </p>
          <p className="time">
            Time: <span>{convertTime(timeLeft)}</span>
          </p>
        </div>
        <div className="group-btn">
          <button onClick={() => handlePlay()}>
            {isPlaying ? (
              <ion-icon name="pause-outline"></ion-icon>
            ) : (
              <ion-icon name="play-outline"></ion-icon>
            )}
          </button>
          <button onClick={() => handleMute()}>
            {!isMute ? (
              <ion-icon name="volume-high"></ion-icon>
            ) : (
              <ion-icon name="volume-mute"></ion-icon>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
