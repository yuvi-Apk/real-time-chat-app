import React from "react";
import { useThemeStore } from "../store/useThemeStore";
import ThemeDisplayBox from "../components/ThemeDisplayBox";
import { daisyUIThemes } from "../constants";

const SettingPage = () => {
  const { theme, setTheme } = useThemeStore();
  // console.log(theme);

  return (
    <div className="setting-page h-screen flex justify-center mt-3! ">
      <div className="">
        <h2 className="text-bold text-3xl ">Theme</h2>
        <p className="inline-block py-4! text-2xl">Chose a theme for your chat interface !</p>

        <div className="rounded-box grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {/* test div box start  */}

          {daisyUIThemes.map((themeName) => {
            // console.log(themeName);
            return (
              <div onClick={() => setTheme(themeName)}>
                <ThemeDisplayBox key={themeName} theme={themeName} />
              </div>
            );
          })}

          {/* test div box ends  */}
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
