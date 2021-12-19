import type { NextPage } from "next";
import { useCallback, useEffect, useRef, useState } from "react";
import { requestCompletions } from "../src/utils/apiRoutes";
import { extendCompletions } from "../src/utils/openAI";
import qaConfig from "../src/openAI/completions/biographyQ&A.json";

const S2T_FAILURE = `Apologies, I didn't understand what you just said. Please retry.\
   Noise-free environments and clear pronounciations do help me.`;
const S2T_ERROR = "Error in speech recognition";
const UI_ERROR = "An error occured";

const Index: NextPage = () => {
  const recognition = useRef<object>();
  const [activeSession, setActiveSession] = useState(false);
  const [result, setResult] = useState<string>();
  const [response, setResponse] = useState<string>();

  useEffect(() => {
    const SpeechRecognition =
      window["SpeechRecognition"] || window["webkitSpeechRecognition"];

    const recognitionInstance = new SpeechRecognition();

    recognitionInstance.continuous = false;
    // TODO: Investigate i18n
    recognitionInstance.lang = "en-GB";
    recognitionInstance.interimResults = false;
    recognitionInstance.maxAlternatives = 1;

    recognitionInstance["onresult"] = (e: any) => {
      const result = e.results[0][0].transcript;
      setResult(`Answer: ${result}.`);
      console.log(`Confidence: ${e.results[0][0].confidence}`);

      requestCompletions(extendCompletions(qaConfig, result))
        .then((res) => setResponse(res.data.response))
        .catch((e) => {
          console.log(e);
          setResponse(UI_ERROR);
        });
    };

    recognitionInstance["onspeechend"] = () => {
      recognitionInstance.stop();
      setActiveSession(false);
    };

    recognitionInstance["onnomatch"] = () => setResult(S2T_FAILURE);

    recognitionInstance.onerror = (e: any) => {
      console.log(`${S2T_ERROR}: ${e.error}`);
      setResult(UI_ERROR);
    };

    recognition.current = recognitionInstance;
  }, []); // should run only once

  const handleSpeechInput = useCallback(() => {
    if (recognition.current) {
      if (!activeSession) {
        recognition.current["start"]();
        console.log("Ready to receive a question.");
        setActiveSession(true);
      } else {
        recognition.current["stop"]();
        console.log("Session terminated.");
        setActiveSession(false);
      }
    }
  }, [activeSession]);

  return (
    <>
      <h2>Case #1 - Q&A AI</h2>
      <i>
        TL;DR text inputs? Let&apos;s allow the users to customize their
        interaction based on their own unique needs.
        <br />
        <br />
      </i>
      <div>
        Press the button and speak with the AI representative about Alkis!
        <br />
        <br />
      </div>
      <button onClick={handleSpeechInput}>
        {!activeSession ? "Say something to the AI" : "Signal your finish"}
      </button>
      <div>
        <h3>Last Input</h3>
        {result ? <span>{result}</span> : "-"}
      </div>
      <div>
        <h3>Last Response</h3>
        {response ? <span>{response}</span> : "-"}
      </div>
    </>
  );
};

export default Index;
