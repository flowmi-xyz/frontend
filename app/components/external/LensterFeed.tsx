import { Box, Text } from "@chakra-ui/react";
import { WIDTH_FEED } from "~/styles/theme";

// components
import LensterPost from "./LensterPost";

type LensterFeedProps = {
  Posts: any;
  defaultProfile: any;
};

const LensterFeed = ({ Posts, defaultProfile }: LensterFeedProps) => {
  // const [sortCriteria, setSortCriteria] = useState<SortCriteria>("LATEST");

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

        {/* <Flex justifyContent="space-between" pt="5">
          <Button
            bgGradient={
              sortCriteria === "LATEST"
                ? "linear(to-r, #FFB83F, #FF5873)"
                : "none"
            }
            bg={sortCriteria === "LATEST" ? "null" : "backgroundFeed"}
            borderRadius="10px"
            onClick={() => setSortCriteria("LATEST")}
          >
            <Text color={sortCriteria === "LATEST" ? "white" : "black"}>
              Latest
            </Text>
          </Button>

          <Button
            bgGradient={
              sortCriteria === "TOP_COMMENTED"
                ? "linear(to-r, #FFB83F, #FF5873)"
                : "none"
            }
            bg={sortCriteria === "TOP_COMMENTED" ? "null" : "backgroundFeed"}
            borderRadius="10px"
            onClick={() => setSortCriteria("TOP_COMMENTED")}
          >
            <Text color={sortCriteria === "TOP_COMMENTED" ? "white" : "black"}>
              More commented
            </Text>
          </Button>

          <Button
            bgGradient={
              sortCriteria === "TOP_COLLECTED"
                ? "linear(to-r, #FFB83F, #FF5873)"
                : "none"
            }
            bg={sortCriteria === "TOP_COLLECTED" ? "null" : "backgroundFeed"}
            borderRadius="10px"
            onClick={() => setSortCriteria("TOP_COLLECTED")}
          >
            <Text color={sortCriteria === "TOP_COLLECTED" ? "white" : "black"}>
              More collected
            </Text>
          </Button>

          <Button
            bgGradient={
              sortCriteria === "TOP_MIRRORED"
                ? "linear(to-r, #FFB83F, #FF5873)"
                : "none"
            }
            bg={sortCriteria === "TOP_MIRRORED" ? "null" : "backgroundFeed"}
            borderRadius="10px"
            onClick={() => setSortCriteria("TOP_MIRRORED")}
          >
            <Text color={sortCriteria === "TOP_MIRRORED" ? "white" : "black"}>
              More mirrored
            </Text>
          </Button>
        </Flex> */}
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
