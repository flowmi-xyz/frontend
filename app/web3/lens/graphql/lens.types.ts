export type ChallengueRequest = {
  request: {
    address: string;
  };
};

export type SignedAuthChallenge = {
  request: {
    address: string;
    signature: string;
  };
};

export type RefreshRequest = {
  request: {
    refreshToken: string;
  };
};

export type ExplorePublicationRequest = {
  request: {
    sortCriteria: "LATEST" | "TOP_COMMENTED" | "TOP_COLLECTED" | "TOP_MIRRORED";
    publicationTypes: string[];
    limit: number;
  };
};

export type FollowRequest = {
  request: {
    follow: [{ profile: string }];
  };
};

export type UnfollowRequest = {
  request: {
    profile: string;
  };
};

export type CreatePublicPostRequest = {
  request: {
    profileId: string;
    contentURI: string;
  };
};

export type CreateProfileRequest = {
  request: {
    handle: string;
    profilePictureUri: string | null;
    followNFTURI: string | null;
    followModule: string | null;
  };
};

export type HasTxHashBeenIndexedRequest = {
  request: {
    txHash: string;
  };
};

export type ProfileQueryRequest = {
  request: {
    ownedBy: [string];
    limit: number;
  };
};

export type FollowersRequest = {
  request: {
    profileId: string;
    limit: number;
  };
};

export type CreateMirrorRequest = {
  request: {
    profileId: string;
    publicationId: string;
    referenceModule: {
      followerOnlyReferenceModule: boolean;
    };
  };
};
