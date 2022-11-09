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
