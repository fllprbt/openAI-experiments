import type { NextPage } from "next";
import { useCallback, useEffect, useRef, useState } from "react";
import { requestCompletions } from "../src/utils/apiRoutes";
import { extendQNA } from "../src/utils/openAI";
import qaConfig from "../src/openAI/completions/biographyQ&A.json";
import Button from "@material-ui/core/Button/Button";
import { Box, Container, Typography } from "@material-ui/core";
import { UI_ERROR, S2T_FAILURE, S2T_ERROR } from "../src/constants/errors";

const QNA: NextPage = () => {
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

      requestCompletions(extendQNA(qaConfig, result))
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
    <Box width="100%">
      <Typography variant="h3" component="h3">
        Case #1 - Q&A AI 🙋
      </Typography>
      <i>
        TL;DR text inputs? Let&apos;s allow the users to customize their
        interaction based on their own unique needs.
        <br />
        <br />
      </i>
      <Container>
        <Box display="flex" justifyContent="center" my={2}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSpeechInput}
          >
            {!activeSession ? "Say something to the AI" : "Signal your finish"}
          </Button>
        </Box>
        <Typography variant="h5" component="h5">
          Last Input
        </Typography>
        {result ? <span>{result}</span> : "-"}
        <Typography variant="h5" component="h5">
          Last Response
        </Typography>
        {response ? <span>{response}</span> : "-"}
      </Container>
    </Box>
  );
};

export default QNA;
