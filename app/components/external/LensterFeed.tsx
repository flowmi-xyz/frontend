import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { WIDTH_FEED } from "~/styles/theme";

// components
import LensterPost from "./LensterPost";

type LensterFeedProps = {
  Posts: any;
  defaultProfile: any;
};

const LensterFeed = ({ Posts, defaultProfile }: LensterFeedProps) => {
  return (
    <>
      <Box width={WIDTH_FEED}>
        <Text
          fontWeight="800"
          fontSize="44px"
          bgGradient="linear(to-r, #FFB83F , #FF5873 20% )"
          bgClip="text"
          my="auto"
          pt="5"
          pr="10"
        >
          Publications
        </Text>

        <Flex justifyContent="space-between">
          <Button
            bgGradient="linear(to-r, #FFB83F, #FF5873)"
            borderRadius="40px"
          >
            <Text>Latest</Text>
          </Button>

          <Button
            bgGradient="linear(to-r, #FFB83F, #FF5873)"
            borderRadius="40px"
          >
            <Text>More commented</Text>
          </Button>

          <Button
            bgGradient="linear(to-r, #FFB83F, #FF5873)"
            borderRadius="40px"
          >
            <Text>More collected</Text>
          </Button>

          <Button
            bgGradient="linear(to-r, #FFB83F, #FF5873)"
            borderRadius="40px"
          >
            <Text>More mirrored</Text>
          </Button>
        </Flex>
      </Box>

      <Box mt="5" mb="10">
        {Posts.map((post: any, index: number, row: any) => {
          console.log(post);
          return (
            <LensterPost
              key={post.id}
              id={post.id}
              name={post.profile.name}
              handle={post.profile.handle}
              profileImage={post.profile.picture?.original?.url}
              content={post.metadata.content}
              createdAt={post.createdAt}
              comments={post.stats.totalAmountOfComments}
              mirrors={post.stats.totalAmountOfMirrors}
              collects={post.stats.totalAmountOfCollects}
              index={index}
              row={row}
              defaultProfile={defaultProfile}
              profileIdToMirror={post.profile.id}
              referenceModule={post.referenceModule}
            />
          );
        })}
      </Box>
    </>
  );
};

export default LensterFeed;
