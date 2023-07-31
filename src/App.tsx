import reactLogo from "./assets/react.svg";
import tsLogo from "./assets/ts-logo.svg";
import sassLogo from "./assets/sass.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Counter from "./components/Counter/Counter";
import { useEffect, useState } from "react";

export type TAAdviceSlip = {
  slip: {
    id: number;
    advice: string;
  };
};
function App() {
  // fetch a data from api
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TAAdviceSlip | null>(null);
  const [error, setError] = useState(null);

  const slip = data?.slip?.advice;

  const handleFetchData = async () => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const api = "https://api.adviceslip.com/advice";

    await fetch(api)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`this is http error ${response.status}`);
          setLoading(true);
          // setError("can not reach the api");
        }
        return response.json();
      })
      .then((advice) => {
        setLoading(false);
        setData(advice);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
        setLoading(false);
      });
    // .then((data) => data.slip.advice);
    console.log(data);
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <>
      <h1 style={{ fontStyle: "italic" }}>
        <span
          className={"bismuth"}
          style={{ color: "#9551ff", fontStyle: "normal" }}
        >
          Live Advice App
        </span>
      </h1>
      <div className="card">
        {/* {data.ma} */}
        <p> {slip}</p>
        <button onClick={handleFetchData}>Refershe</button>
      </div>
    </>
  );
}

export default App;
