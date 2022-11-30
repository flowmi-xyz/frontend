import { Box } from "@chakra-ui/react";

// components
import LensterPost from "./LensterPost";

type LensterFeedProps = {
  Posts: any;
  defaultProfile: any;
};

const LensterFeed = ({ Posts, defaultProfile }: LensterFeedProps) => {
  return (
    <Box mt="10">
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
          />
        );
      })}
    </Box>
  );
};

export default LensterFeed;
