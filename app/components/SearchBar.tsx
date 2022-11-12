import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = () => {
  return (
    <Box ml="40">
      <HStack>
        <Box width="330px">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlineSearch />}
            />
            <Input
              // value={profileSearch}
              // onChange={handleSearch}

              placeholder="Find your friends ..."
              bg="white"
              border="1px"
              borderColor="#E0E0E3"
              borderRadius="10px"
              focusBorderColor="#E0E0E3"
            />
          </InputGroup>
        </Box>
      </HStack>
    </Box>
  );
};

export default SearchBar;
