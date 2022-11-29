function removeProfileIdPrefix(str: string, profileId: string) {
  return str.replace(`${profileId}-`, "");
}

export { removeProfileIdPrefix };
