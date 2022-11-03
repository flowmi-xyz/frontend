import { Box, Center } from "@chakra-ui/react";

// components
import LensterPost from "./LensterPost";

type LensterFeedProps = {
  Posts: any;
};

const LensterFeed = ({ Posts }: LensterFeedProps) => {
  console.log(Posts);

  return (
    <Center>
      <Box>
        {Posts.map((post: any, index: number) => {
          return (
            <LensterPost
              key={post.id}
              id={post.id}
              name={post.profile.name}
              handle={post.profile.handle}
              content={post.metadata.content}
              index={index}
            />
          );
        })}
      </Box>
    </Center>
  );
};

export default LensterFeed;
