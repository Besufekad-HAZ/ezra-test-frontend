import { useEffect, useState } from "react";
import axios from "axios";

function ChaptersDisplay() {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [unlockedIndex, setUnlockedIndex] = useState(0); // New state variable to track the unlocked index

  //get all courses
  useEffect(() => {
    axios
      .get("/course/getall")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= items.length) {
      newIndex = items.length - 1;
    }

    if (newIndex > unlockedIndex) {
      setUnlockedIndex(newIndex); // Update the unlocked index
    }

    setActiveIndex(newIndex);
  };

  // slide number
  const currentDataNumber = activeIndex + 1;
  const totalDataNumber = items.length;

  const isSlideUnlocked = (index) => {
    return index <= unlockedIndex; // Check if the slide is unlocked based on the unlocked index
  };

  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <div className="flex w-full">
        <div className="flex flex-col justify-evenly ml-6 bg-white p-4 rounded-lg">
          {/* slide number */}
          <div className="mt-4 border-b-4 border-orange-500 font-bold">
            SLIDE {currentDataNumber}/{totalDataNumber}
          </div>
          <div className="flex flex-col justify-around items-center mt-[20px]">
            {items.map((item, index) => {
              const unlocked = isSlideUnlocked(index);
              return (
                <button
                  key={index}
                  className={`flex items-center border-b-2 border-orange-300 cursor-pointer py-2 ${
                    unlocked ? "text-black" : "text-gray-500"
                  }`} // Locked slide to gray
                  onClick={() => {
                    updateIndex(index);
                  }}
                  disabled={!unlocked} // Disable the button if the slide is locked
                >
                  <span
                    className={`${
                      index === activeIndex && "text-orange-500 font-bold"
                    }`}
                  >
                    {item.title}
                  </span>
                  {unlocked ? (
                    <span className="material-symbols-outlined text-orange-500 pl-4 text-xl">
                      check_circle
                    </span>
                  ) : (
                    <span className="material-symbols-outlined text-orange-500 pl-4 text-lg">
                      radio_button_unchecked
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        {/* slides */}
        <div className="overflow-hidden w-[70%] justify-center items-center mx-auto bg-[#955B09BA] rounded-lg">
          <div className="flex flex-col whitespace-nowrap transition-transform duration-300 shadow-md">
            <h1 className="text-white font-bold p-2">EZRA seminary</h1>
            <div className="inline-flex flex-col items-center justify-center h-[490px] border-y-2 border-orange-300">
              {/* <img className="carousel-img" src={item.image} /> */}
              <div className="text-[1.15rem] font-bold mt-[10px] mb-[10px] px-[20px] whitespace-normal text-white">
                {item.title}
              </div>
              <div className="text-[1.15rem] mt-[10px] mb-[10px] px-[20px] whitespace-normal text-white">
                {item.description}
              </div>
            </div>
            <button
              className={`text-white font-bold my-2 bg-orange-400 w-[10%] rounded-xl mx-auto ${
                activeIndex === items.length - 1 ? "hidden" : "block"
              }`} // hidding the next button for the last slide
              onClick={() => {
                updateIndex(activeIndex + 1);
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChaptersDisplay;
