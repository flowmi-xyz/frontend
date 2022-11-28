import { create } from "ipfs-http-client";

const projectId = "2IBIpH5C0JR6w3TOX5Jtp2M4fHd";
const projectSecret = "c42d76a13145e73abecf04586f3ad207";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const ipfsClient = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export { ipfsClient };
