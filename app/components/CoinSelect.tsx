import React, { FC } from "react";
import {
  Code,
  Container,
  FormControl,
  FormLabel,
  Icon,
  TagLeftIcon,
} from "@chakra-ui/react";
import {
  Select,
  chakraComponents,
  OptionBase,
  OptionProps,
  GroupBase,
  MultiValueGenericProps,
} from "chakra-react-select";
import {
  GiCoffeeBeans,
  GiChocolateBar,
  GiStrawberry,
  GiCherry,
} from "react-icons/gi";

interface FlavorOption extends OptionBase {
  label: string;
  value: string;
  Icon: FC;
  iconColor: string;
}

const flavorOptions: FlavorOption[] = [
  {
    value: "coffee",
    label: "Coffee",
    Icon: GiCoffeeBeans,
    iconColor: "orange.700",
  },
  {
    value: "chocolate",
    label: "Chocolate",
    Icon: GiChocolateBar,
    iconColor: "yellow.800",
  },
  {
    value: "strawberry",
    label: "Strawberry",
    Icon: GiStrawberry,
    iconColor: "red.500",
  },
  {
    value: "cherry",
    label: "Cherry",
    Icon: GiCherry,
    iconColor: "red.600",
  },
];

const customComponents = {
  Option: ({
    children,
    ...props
  }: OptionProps<FlavorOption, true, GroupBase<FlavorOption>>) => (
    <chakraComponents.Option {...props}>
      <Icon
        as={props.data.Icon}
        color={props.data.iconColor}
        mr={2}
        h={5}
        w={5}
      />
      {children}
    </chakraComponents.Option>
  ),
  MultiValueContainer: ({
    children,
    ...props
  }: MultiValueGenericProps<FlavorOption, true, GroupBase<FlavorOption>>) => (
    <chakraComponents.MultiValueContainer {...props}>
      <TagLeftIcon as={props.data.Icon} color={props.data.iconColor} />
      {children}
    </chakraComponents.MultiValueContainer>
  ),
};

const CoinSelect = () => (
  <Container mb={16} w={220}>
    <FormControl>
      <Select<FlavorOption, true, GroupBase<FlavorOption>>
        isMulti
        name="Coins"
        options={flavorOptions}
        placeholder="Choose"
        components={customComponents}
      />
    </FormControl>
  </Container>
);

export default CoinSelect;
