import Box from "@material-ui/core/Box/Box";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Typography from "@material-ui/core/Typography/Typography";
import { Link } from "../src/components/Link";

const Index: React.FC = () => (
  <Box display="flex" width="100%" flexDirection="column" alignItems="center">
    <Typography variant="h2" component="h2">
      Select a POC
    </Typography>
    <Box
      display="flex"
      width="100%"
      m={5}
      justifyContent="space-around"
      alignItems="flex-start"
      component="ul"
    >
      <ListItem>
        <Box display="flex" flexDirection="column">
          <Link href="/qna">Q&A</Link>
          <span>Get answers to voice input questions</span>
        </Box>
      </ListItem>
      <ListItem>
        <Box display="flex" flexDirection="column">
          <Link href="/wishes">Wishcard generator</Link>
          <span>
            Get personalized wishes by providing information about the occasion
            & recipient
          </span>
        </Box>
      </ListItem>
    </Box>
  </Box>
);

export default Index;
