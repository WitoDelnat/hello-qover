import { Box, Heading, HStack, Switch, Text } from "@chakra-ui/react";
import React, { ReactNode, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import backgroundTravelUrl from "../../background-travel.png";
import { ComparisonIcon } from "../../components/icons/ComparisonIcon";
import { LogoutButton } from "../../components/LogoutButton";
import { PlanBox } from "../../components/PlanBox";
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
    <Layout>
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

        <ComparisonLink />
      </Box>
    </Layout>
  );
}

function Layout({ children }: { children: ReactNode }) {
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
      {children}
    </Box>
  );
}

function ComparisonLink() {
  return (
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
  );
}
