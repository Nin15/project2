import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Game() {
  const [point, setPoint] = useState(0);
  const [ActiveButtons, setActiveButtons] = useState([]);
  const [guessed, setGuessed] = useState([]);
  const [ActiveButton, setActiveButton] = useState([]);
  const { theme, mode, grid } = useParams();
  const navigate = useNavigate();
  const [restart, setRestart] = useState(0);
  const [ID, setID] = useState([]);
  

  const gridSize = grid === "6x6" ? 36 : 16; 
  const buttons = Array.from({ length: gridSize }, (_, i) => i + 1);
  
  const buttonNames = Array.from({ length: gridSize / 2 }, (_, i) => i + 1).flatMap((num) => [num, num]); 
  const [thegrid, setthegrid] = useState([]);
  
  const [restartFlag, setRestartFlag] = useState(false);
  
 
  useEffect(() => {
    setthegrid(() => {
      const shuffledGrid = buttonNames.sort(() => Math.random() - 0.5);
      return shuffledGrid;
    });
  }, [restartFlag]);

  const CheckIfSameButton = (id) => {
    setID((prev) => {
      if (prev.length < 2) {
        const updated = [...prev, id];
        return updated;
      } else {
        return [...prev.slice(1), id];
      }
    });
  };

  const pointFunction = (buttonName) => {
    setActiveButtons((prev) => {
      if (prev.length < 2) {
        const updated = [...prev, buttonName];
        return updated;
      } else if (prev.length === 2) {
        return [];
      } else {
        return [...prev.slice(1), buttonName];
      }
    });
  };

  function flipped(id) {
    setActiveButton((prev) => {
      const updated = [...prev, id];

      if (updated.length === 2) {
        setTimeout(() => {
          setActiveButton([]);
          setActiveButtons([]);
          setPoint(point);
        }, 1000);
      }

      return updated.length <= 2 ? updated : prev;
    });
  }

  useEffect(() => {
    setPoint(point + 1);
  }, [ActiveButtons]);

  useEffect(() => {
    if (ActiveButtons[0] === ActiveButtons[1] && ID[1] !== ID[0]) {
      setTimeout(() => {
        setGuessed((prev) => {
          const updated = [...prev, ActiveButtons[0]];
          return updated;
        });
      }, 1);
    }
    if (ID[1] === ID[0]) {
      setPoint(point)
    }
  }, [ActiveButtons]);

  return (
    <div className="game-container">
      {theme === "numbers" && (
        <div
          style={{ fontFamily: "Atkinson Hyperlegible" }}
          className="flex flex-col w-[100%] h-[100dvh] items-center justify-around"
        >
          <div className="flex top-[67px] justify-around items-center w-[100%]">
            <img className="color-[#152938]" src="/memory (1).png" alt="" />
            <div className="flex gap-[10px]">
              <button
                onClick={() => {
                  setActiveButton([]);
                  setActiveButtons([]);
                  setRestartFlag(!restartFlag); 
                  setPoint(0);
                  setGuessed([]);
                }}
                className="bg-amber-400 text-amber-50 w-[108px] h-[38px] rounded-full font-bold  cursor-pointer hover:scale-[1.05] transition"
              >
                Restart
              </button>
              <button
                onClick={() => {
                  navigate("/");
                  setActiveButton([]);
                  setActiveButtons([]);
                  setRestartFlag(!restartFlag);
                  setPoint(0);
                  setGuessed([]);
                }}
                className="bg-[#BCCED9] text-[#304859] w-[108px] h-[38px] rounded-full font-bold  cursor-pointer hover:scale-[1.05] transition"
              >
                New Game
              </button>
            </div>
          </div>

          <div className="text-2xl flex flex-wrap w-[450px] gap-[20px] items-center justify-center">
            {thegrid.map((el, index) => (
              <div key={buttons[index]}>
                <button
                  onClick={(event) => {
                    pointFunction(el);
                    flipped(buttons[index]);
                    CheckIfSameButton(event.target.id);
                  }}
                  className={
                    guessed.includes(el)
                      ? "bg-amber-400 text-blue-50 w-[78px] h-[78px] rounded-full font-bold cursor-pointer hover:scale-[1.05] transition"
                      : ActiveButton.includes(buttons[index])
                      ? "bg-[#BCCED9] text-blue-50 w-[78px] h-[78px] rounded-full font-bold cursor-pointer hover:scale-[1.05] transition"
                      : "bg-[#304859] text-[#304859] w-[78px] h-[78px] rounded-full font-bold cursor-pointer hover:scale-[1.05] transition"
                  }
                  id={buttons[index]}
                >
                  {el}
                </button>
              </div>
            ))}
          </div>

          <div className="bg-[#BCCED9] w-[255px] h-[72px] rounded-[20px] flex justify-center items-center">
            <h1 className="text-[#7191A5] flex items-center gap-[150px] justify-end">
              Moves: <span className="text-[#304859] text-[32px]">{point}</span>
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}
