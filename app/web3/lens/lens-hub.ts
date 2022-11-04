import * as fs from "fs";
import * as path from "path";

const fileLensHub = fs.readFileSync(
  path.join(__dirname, "abis/lens-hub-contract-abi.json"),
  "utf8"
);

const LENS_HUB_ABI = JSON.parse(fileLensHub);

export { LENS_HUB_ABI };
