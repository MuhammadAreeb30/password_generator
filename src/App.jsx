import React, { useState, useCallback, useRef, useEffect } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [chars, setChars] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBMqwertyuiopasdfghjklzxcvbnm";
    if (numbers) str += "0123456789";
    if (chars) str += "!@#$%^&*()_+=-}{[]|;:?><~`";
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numbers, chars]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numbers, chars, passwordGenerator]);

  return (
    <>
      <div className="w-full mt-52 flex justify-center items-center">
        <div className="bg-gray-700 text-orange-600 shadow-md rounded-lg p-8 width">
          <h1 className="text-white text-3xl mb-5">Password Generator</h1>
          <div className="flex overflow-hidden">
            <input
              type="text"
              className="w-full pt-2 py-2 outline-none px-3 text-2xl"
              placeholder="Password"
              readOnly
              ref={passwordRef}
              value={password}
            />
            <button
              onClick={copyPassword}
              className="text-white bg-blue-600 px-3 text-xl outline-none"
            >
              copy
            </button>
          </div>
          <div className="flex gap-x-12 mt-4">
            <div className="flex gap-x-2">
              <input
                type="range"
                min={8}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => setLength(e.target.value)}
              />
              <label>length: ({length})</label>
            </div>
            <div className="flex gap-x-2">
              <input
                type="checkbox"
                defaultChecked={numbers}
                onChange={() => setNumbers((prev) => !prev)}
              />
              <label>Numbers</label>
            </div>
            <div className="flex gap-x-2">
              <input
                type="checkbox"
                defaultChecked={chars}
                onChange={() => setChars((prev) => !prev)}
              />
              <label>Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
