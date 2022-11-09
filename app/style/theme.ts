import { extendTheme } from "@chakra-ui/react";

import { StepsStyleConfig } from "chakra-ui-steps";

const CustomSteps = {
  ...StepsStyleConfig,
  baseStyle: (props: any) => {
    return {
      ...StepsStyleConfig.baseStyle(props),
      icon: {
        ...StepsStyleConfig.baseStyle(props).icon,
        // your custom styles here
        strokeWidth: "2px",
        color: "white",
      },
      stepIconContainer: {
        ...StepsStyleConfig.baseStyle(props).stepContainer,
        // your custom styles here
        bg: "#757575",
        borderColor: "#757575",
        color: "white",
        borderRadius: "50%",
        alignItems: "center",
        justifyContent: "center",
        _highlighted: {
          bg: "#F72585",
          borderColor: "#F72585",
        },
      },
      connector: {
        ...StepsStyleConfig.baseStyle(props).connector,
        // your custom styles here
        borderColor: "#757575",
        opacity: 0.3,
        _highlighted: {
          borderColor: "#F72585",
          opacity: 1.0,
        },
      },
      labelContainer: {
        ...StepsStyleConfig.baseStyle(props).labelContainer,
        // your custom styles here
        width: "45%",
      },
      label: {
        ...StepsStyleConfig.baseStyle(props).label,
        // your custom styles here
        fontSize: "sm",
      },
    };
  },
};

export const theme = extendTheme({
  colors: {
    first: "#31108F",
    second: "#7A3CE3",
    third: "#E53C79",
    fourth: "#E8622C",
    fifth: "#F5C144",
    grayLetter: "#757575",
    grayBg: "#F2F4F8",
    lens: "#BDFC5A",
    lensDark: "#00501E",
    twitter: "#1DA1F2",
  },
  components: {
    Steps: CustomSteps,
  },
});

export const WIDTH_FEED = 700;
