import { useState } from "react";

import Cards from "./components/Cards/Cards";

function DashboardPage() {
  return (
    <Cards isLoggedIn={isLoggedIn} />
  );
}

export default DashboardPage;
