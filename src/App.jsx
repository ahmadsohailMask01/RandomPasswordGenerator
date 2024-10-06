import { useCallback, useEffect, useRef, useState } from "react";
import { LuRefreshCcw } from "react-icons/lu";
import "./App.css";

function App() {
  const [length, setLength] = useState(5);
  const [password, setPassword] = useState("");
  const [allowNumber, setAllowNumber] = useState(false);
  const [allowChar, setAllowChar] = useState(false);
  const getPassword = useRef(null);
  const [refresh, setRefresh] = useState(true);
  const [buttonColor, setButtonColor] = useState("#23acf2");

  const copyPassword = () => {
    setButtonColor("#715151");
    getPassword.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  const generateRandomPassword = useCallback(() => {
    setButtonColor("#23acf2");
    let password = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let specialChar = "(!@#$)%^]&*_+|}?{/[";
    if (allowNumber) {
      string += numbers;
    }
    if (allowChar) {
      string += specialChar;
    }
    for (let i = 0; i < length; i++) {
      let randomIndexNumber = Math.floor(Math.random() * string.length);
      password += string[randomIndexNumber];
    }
    setPassword(password);
  }, [length, allowChar, allowNumber]);

  useEffect(() => {
    generateRandomPassword();
  }, [length, allowNumber, allowChar, refresh]);

  return (
    <>
      <div className="mainDiv">
        <h3>Password Generator</h3>
        <div className="inputCopyHolder">
          <input
            type="text"
            className="inputPassword"
            placeholder="Password"
            readOnly
            value={password}
            ref={getPassword}
          />
          <button
            className="copyButton"
            onClick={() => {
              setRefresh((pendingRefresh) => {
                return !pendingRefresh;
              });
            }}
            style={{
              backgroundColor: `#23acf2`,
              alignItems: `center`,
            }}
          >
            <LuRefreshCcw style={{ color: `white` }} />
          </button>
          <button
            onClick={copyPassword}
            className="copyButton"
            style={{ backgroundColor: `${buttonColor}` }}
          >
            Copy
          </button>
        </div>
        <div className="inputCopyHolder contentSet">
          <input
            type="range"
            min={1}
            max={100}
            className="inputRange"
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
          <input
            type="checkbox"
            defaultChecked={allowNumber}
            onChange={() => {
              setAllowNumber((pendingNumber) => !pendingNumber);
            }}
          />

          <label>Numbers</label>
          <input
            type="checkbox"
            defaultChecked={allowChar}
            onChange={() => {
              setAllowChar((pendingChar) => !pendingChar);
            }}
          />
          <label>Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
