import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const [ThemeActive, setThemeActive] = useState(null);
  const [PlayerActive, setPlayerActive] = useState(null);
  const [GridActive, setGridActive] = useState(null);
  const navigate = useNavigate();
  const changePlayerActive = (theme) => {
    setPlayerActive(theme);
  };

  const changeThemeActive = (theme) => {
    setThemeActive(theme);
  };
  const changeGridActive = (theme) => {
    setGridActive(theme);
  };

  function Starting() {
    if (!ThemeActive || !PlayerActive || !GridActive) {
      navigate("/");
      alert("Select all options.");
    } else {
      navigate(`/game/${ThemeActive}/${PlayerActive}/${GridActive}`);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center w-full h-[100dvh] bg-[#152938] gap-[50px]">
      <img src="/memory.png" alt="" />

      <div className="bg-white w-[500px] p-10 rounded-[20px] flex flex-col gap-[30px]">
        {/* Select Theme */}
        <div className="flex flex-col gap-[10px]">
          <p className="text-[#7191A5] font-bold m-0">Select Theme</p>
          <div className="flex justify-between">
            <button
              onClick={() => changeThemeActive("numbers")}
              className={`${
                ThemeActive === "numbers" ? "bg-[#304859]" : "bg-[#BCCED9]"
              }  text-white w-[156px] h-[52px] rounded-full font-bold   cursor-pointer hover:scale-[1.05] transition`}
            >
              Numbers
            </button>
            <button
              onClick={() => changeThemeActive("icons")}
              className={`${
                ThemeActive === "icons" ? "bg-[#304859]" : "bg-[#BCCED9]"
              }  text-white w-[156px] h-[52px] rounded-full font-bold   cursor-pointer hover:scale-[1.05] transition`}
            >
              Icons
            </button>
          </div>
        </div>

        {/* Number of Players */}
        <div className="flex flex-col gap-[10px]">
          <p className="text-[#7191A5] font-bold m-0">Number of Players</p>
        </div>
        <div className="flex justify-between">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              onClick={() => changePlayerActive(n)}
              className={`${
                PlayerActive === n ? "bg-[#304859]" : "bg-[#BCCED9]"
              }  text-white w-[78px] h-[54px] rounded-full font-bold   cursor-pointer hover:scale-[1.05] transition`}
            >
              {n}
            </button>
          ))}
        </div>

        {/* Grid Size */}
        <div className="flex flex-col gap-[10px]">
          <p className="text-[#7191A5] font-bold m-0">Grid Size</p>
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => changeGridActive("4x4")}
            className={`${
              GridActive === "4x4" ? "bg-[#304859]" : "bg-[#BCCED9]"
            }  text-white w-[156px] h-[52px] rounded-full font-bold   cursor-pointer hover:scale-[1.05] transition`}
          >
            4x4
          </button>
          <button
            onClick={() => changeGridActive("6x6")}
            className={`${
              GridActive === "6x6" ? "bg-[#304859]" : "bg-[#BCCED9]"
            }  text-white w-[156px] h-[52px] rounded-full font-bold   cursor-pointer hover:scale-[1.05] transition`}
          >
            6x6
          </button>
        </div>

        {/* Start Game */}
        <button
          onClick={Starting}
          className="bg-[#FDA214] text-white h-[52px] text-[18px] font-bold rounded-full mt-[10px] hover:bg-[#fca94a] transition"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
