import { Box, Icon } from "@chakra-ui/react";

import { MdRadioButtonChecked } from "react-icons/md";

type ConnectedNetworkProps = {
  networkName: string;
};

const ConnectedNetwork = ({ networkName }: ConnectedNetworkProps) => {
  const isAuthenticated = true;

  return (
    <Box width="100%">
      {networkName}
      <Icon
        as={MdRadioButtonChecked}
        w={2.5}
        h={2.5}
        color={isAuthenticated ? "green" : "red"}
        marginLeft={2}
      />
    </Box>
  );
};

export default ConnectedNetwork;
