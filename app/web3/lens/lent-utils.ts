// string hex to number
function hexToNumber(hex: string) {
  return parseInt(hex, 16);
}

function removeProfileIdPrefix(str: string, profileId: string) {
  const withoutPrefix = str.replace(`${profileId}-`, "");

  return hexToNumber(withoutPrefix);
}

export { removeProfileIdPrefix };
