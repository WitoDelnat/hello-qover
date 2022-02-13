import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  chakra,
  Divider,
  Heading,
  HStack,
  Switch,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import backgroundTravelUrl from "../../background-travel.png";
import { ComparisonIcon } from "../../components/icons/ComparisonIcon";
import { LogoutButton } from "../../components/LogoutButton";
import { Plans } from "./Quote";

type State = {
  plans?: Plans;
};

export function CarPlansPage() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const plans = (location.state as State).plans;

  const [selected, setSelected] = useState<"universal" | "global">("global");
  const [isYearly, setIsYearly] = useState<boolean>(false);

  if (!isAuthenticated) {
    <Navigate to="/login" />;
  }

  if (!plans) {
    <Navigate to="insurance/quote" />;
  }

  return (
    <Box
      display="flex"
      flexDir="column"
      w="100%"
      h="100vh"
      backgroundImage={`url(${backgroundTravelUrl})`}
      backgroundRepeat="no-repeat"
      bgColor="#f6f6f6"
      backgroundSize="100% auto"
    >
      <Box
        position="absolute"
        width="100%"
        display="flex"
        flexDir="row-reverse"
        p="3"
      >
        <LogoutButton />
      </Box>

      <Box display="flex" flexDir="column" w="100%" alignItems="center">
        <Heading pt="10" color="white">
          Select a plan
        </Heading>

        <HStack py="10">
          <Text color="white">Pay monthly</Text>
          <Switch
            onChange={() => setIsYearly(!isYearly)}
            colorScheme="facebook"
          />
          <Text color="white">Pay yearly</Text>
        </HStack>

        <HStack spacing="4">
          <PlanBox
            title="Global"
            price={isYearly ? plans!.global.yearly : plans!.global.monthly}
            selected={selected === "global"}
            onClick={() => setSelected("global")}
            features={{
              maximumDurationTravel: "90 days",
              medicalExpensesReimbursement: "1.000.000 €",
              personalAssistanceAbroad: "5.000 €",
              travelAssistanceAbroad: "1.000 €",
              coverageDuration: "1 year",
            }}
          />
          <PlanBox
            title="Universal"
            price={
              isYearly ? plans!.universal.yearly : plans!.universal.monthly
            }
            selected={selected === "universal"}
            onClick={() => setSelected("universal")}
            features={{
              maximumDurationTravel: "180 days",
              medicalExpensesReimbursement: "3.000.000 €",
              personalAssistanceAbroad: "10.000 €",
              travelAssistanceAbroad: "2.500 €",
              coverageDuration: "1 year",
            }}
          />
        </HStack>

        <Text
          pt="30"
          color="teal.100"
          cursor="pointer"
          textDecoration="underline"
          fontWeight="bold"
        >
          Show me the full comparison table
          <ComparisonIcon ml="2.5" color="teal.100" />
        </Text>
      </Box>
    </Box>
  );
}

function PlanBox({
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
