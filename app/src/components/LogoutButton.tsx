import React from "react";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../auth/useAuth";

// Case note: The customer must first log-in on the web platform and **can at any time log-out**.
// Logout button was not in designs of most pages but added due to this requirement.
export function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button
      onClick={logout}
      variant="ghost"
      colorScheme="whiteAlpha"
      color="white"
    >
      Logout
    </Button>
  );
}
