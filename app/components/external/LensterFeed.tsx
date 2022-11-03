import { Box, Center } from "@chakra-ui/react";

// components
import LensterPost from "./LensterPost";

const LensterFeed = () => {
  return (
    <Center>
      <Box>
        <LensterPost
          id="1"
          name="Cristian Valdivia"
          handle="cristianvaldivia"
          content="This is a test post"
        />
      </Box>
    </Center>
  );
};

export default LensterFeed;
