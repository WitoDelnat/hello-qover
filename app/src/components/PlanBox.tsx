import react from "React";
import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Divider,
  HStack,
  chakra,
  Button,
  Text,
} from "@chakra-ui/react";

export function PlanBox({
  title,
  price,
  selected = false,
  onClick,
  features,
}: {
  title: string;
  price: number;
  selected?: boolean;
  onClick: () => void;
  features: PlanFeaturesProps["features"];
}) {
  const bgColor = selected ? "teal.100" : "white";
  const fontColor = selected ? "white" : "gray.900";

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      w="323px"
      bgColor={bgColor}
      color={fontColor}
      borderRadius="3px"
      fontFamily="Roboto"
    >
      <Heading my="5" fontSize="18px">
        {title}
      </Heading>

      <PlanPrice price={price} selected={selected} />

      <Box display="flex" flexDir="column" w="100%" alignItems="center">
        <PlanFeatures features={features} />
        <Divider borderY="solid 1px rgba(91,114,137, 0.1)" />
        <Box p="2.5" w="100%">
          <PlanAction onClick={onClick} selected={selected} />
        </Box>
      </Box>
    </Box>
  );
}

function PlanPrice({
  price,
  selected = false,
}: {
  price: number;
  selected?: boolean;
}) {
  const bgColor = selected ? "rgba(255, 255, 255, 0.15)" : "#f5fdfe";
  const fontColor = selected ? "white" : "teal.100";

  return (
    <Box
      bgColor={bgColor}
      color={fontColor}
      width="100%"
      alignItems="center"
      borderY="solid 1px rgba(91,114,137, 0.1)"
    >
      <HStack mt="15px" justifyContent="center" alignItems="begin">
        <Text fontSize="38px" fontWeight="700">
          {price}
        </Text>
        <Text fontSize="16px" pt="10px">
          €
        </Text>
      </HStack>
      <Text textAlign="center" mb="15px" fontSize="11px" letterSpacing="1px">
        YEARLY INCL. TAXES
      </Text>
    </Box>
  );
}

type PlanFeaturesProps = {
  features: {
    maximumDurationTravel: string;
    medicalExpensesReimbursement: string;
    personalAssistanceAbroad: string;
    travelAssistanceAbroad: string;
    coverageDuration: string;
  };
};

function PlanFeatures({ features }: PlanFeaturesProps) {
  return (
    <Box width="100%" fontWeight="bold" fontSize="12" textAlign="center">
      <Text py="3.5">
        Maximum duration <chakra.span fontWeight="light">of</chakra.span>{" "}
        {features.maximumDurationTravel}
      </Text>
      <Divider borderY="solid 1px rgba(91,114,137, 0.1)" />
      <Text py="3.5">
        Medical expenses reimbursement{" "}
        <chakra.span fontWeight="light">up to</chakra.span>{" "}
        {features.medicalExpensesReimbursement}
      </Text>
      <Divider borderY="solid 1px rgba(91,114,137, 0.1)" />
      <Text py="3.5">
        Personal assistance abroad{" "}
        <chakra.span fontWeight="light">up to</chakra.span>{" "}
        {features.personalAssistanceAbroad}
      </Text>
      <Divider borderY="solid 1px rgba(91,114,137, 0.1)" />
      <Text py="3.5">
        Travel assistance abroad{" "}
        <chakra.span fontWeight="light">up to</chakra.span>{" "}
        {features.travelAssistanceAbroad}
        <br />
        <chakra.span fontWeight="light">per insured per travel</chakra.span>
      </Text>
      <Divider borderY="solid 1px rgba(91,114,137, 0.1)" />
      <Text py="3.5">Coverage duration: {features.coverageDuration}</Text>
    </Box>
  );
}

function PlanAction({
  selected = false,
  onClick,
}: {
  selected?: boolean;
  onClick: () => void;
}) {
  const bgColor = selected ? "white" : "teal.100";
  const fontColor = selected ? "teal.100" : "white";
  const actionLabel = selected ? "Plan selected" : "Choose this plan";

  return (
    <Button
      onClick={onClick}
      borderRadius="5"
      w="100%"
      color={fontColor}
      bgColor={bgColor}
    >
      {selected ? <CheckCircleIcon color={fontColor} mr="2.5" /> : null}
      {actionLabel}
    </Button>
  );
}
