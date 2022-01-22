import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import Container from "@material-ui/core/Container/Container";
import FormControl from "@material-ui/core/FormControl/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import Typography from "@material-ui/core/Typography/Typography";
import { NextPage } from "next/types";
import qaConfig from "../src/openAI/completions/wishes.json";
import React, { useState } from "react";
import { requestCompletions } from "../src/utils/apiRoutes";
import { extendWishes } from "../src/utils/openAI";
import { UI_ERROR } from "../src/constants/errors";
import { Card, CardContent } from "@material-ui/core";
import { sanitize } from "../src/utils/string";

const DEFAULT_DESC =
  "John will soon have a son. He is a very good person and supportive husband. He plays video games on his spare time but he will not have much time after his son's birth.";

const Wishes: NextPage = () => {
  const [value, setValue] = useState<string>(DEFAULT_DESC);
  const [response, setResponse] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.trim());
  };

  const handleSubmit = () => {
    if (value) {
      requestCompletions(extendWishes(qaConfig, value))
        .then((res) => setResponse(res.data.response))
        .catch((e) => {
          console.log(e);
          setResponse(UI_ERROR);
        });
    }
  };

  return (
    <Box width="100%">
      <Typography variant="h3" component="h3">
        Case #2 - Wishcard generator 🤞
      </Typography>
      <i>
        Provide a textual description about the occasion and the
        recipient&apos;s profile
        <br />
        <br />
      </i>
      <Container>
        <FormControl fullWidth={true}>
          <TextField
            defaultValue={DEFAULT_DESC}
            label="Description"
            multiline
            rows={5}
            placeholder="Add your description..."
            onChange={handleChange}
          />
        </FormControl>
        <Box display="flex" justifyContent="center" my={5}>
          <Button color="primary" variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
        {response && (
          <>
            {response !== UI_ERROR ? (
              <Card>
                <CardContent>
                  <Typography gutterBottom>Wishes</Typography>
                  <Typography
                    style={{ whiteSpace: "pre-wrap", padding: "0 16px" }}
                    variant="body1"
                  >
                    {sanitize(response)}
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              <Typography variant="body1">{response}</Typography>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default Wishes;
