import { Outlet } from "react-router-dom";

import NavBar from "../componemts/layout/NavBar";

function RootLayout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
