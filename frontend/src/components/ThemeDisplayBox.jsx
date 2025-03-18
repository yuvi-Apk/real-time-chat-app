import React from "react";

const ThemeDisplayBox = ({ theme }) => {
  return (
    <div
      className="border-base-content/20 hover:border-base-content/40 overflow-hidden rounded-lg border outline-2 outline-offset-2 outline-base-content!"
      data-set-theme={theme}
      data-act-class="outline-base-content!"
    >
      {/* 1st inner div  */}

      <div
        data-theme={theme}
        className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
      >
        {/* 2nd inner div  */}
        <div className="grid grid-cols-5 grid-rows-3">
          {/* 3rd inner div  */}
          <div className="bg-base-200 col-start-1 row-span-2 row-start-1"></div>
          {/* 3red inner div  */}
          <div className="bg-base-300 col-start-1 row-start-3"></div>
          {/* 3red inner div  */}
          <div className="bg-base-100 col-span-4 col-start-2 row-span-3 row-start-1 flex flex-col gap-1 p-2">
            {/* 4th inner div  */}
            <div className="font-bold">{theme}</div>
            {/* 4th inner div  */}
            <div className="flex flexx-wrap gap-1">
              {/* 5th inner div  */}
              <div className="bg-primary flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                {/* 6th inner div  */}
                <div className="text-primary-content text-sm font-bold">A</div>
              </div>
              {/* 5th inner div  */}
              <div className="bg-secondary flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                {/* 6th inner div  */}
                <div className="text-secondary-content text-sm font-bold">
                  A
                </div>
              </div>
              {/* 5th inner div  */}
              <div className="bg-accent flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                {/* 6th inner div  */}
                <div className="text-accent-content text-sm font-bold">A</div>
              </div>
              {/* 5th inner div  */}
              <div className="bg-neutral flex aspect-square w-5 items-center justify-center rounded lg:w-6">
                {/* 6th inner div  */}
                <div className="text-neutral-content text-sm font-bold">A</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeDisplayBox;
