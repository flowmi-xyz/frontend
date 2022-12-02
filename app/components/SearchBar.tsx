import { useSubmit } from "@remix-run/react";

import React from "react";
import {
  Box,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = () => {
  const submit = useSubmit();
  const [profileSearch, setProfileSearch] = React.useState("");

  const handleSearch = () => {
    const formData = new FormData();

    formData.append("profileToGo", profileSearch);
    formData.append("intent", "search");

    submit(formData, {
      action: "/dashboard/feed",
      method: "post",
      encType: "application/x-www-form-urlencoded",
      replace: true,
    });
  };

  const handleWrite = (e: any) => {
    setProfileSearch(e.target.value);
  };

  return (
    <Box ml="6">
      <HStack>
        <Box width="230px">
          <InputGroup>
            <InputLeftElement
              children={<AiOutlineSearch />}
              onClick={handleSearch}
            />
            <Input
              value={profileSearch}
              onChange={handleWrite}
              placeholder="Find your frens ..."
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
