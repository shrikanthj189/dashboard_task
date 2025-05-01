import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ChartSection from "./components/ChartSection";
import PerpetualUsers from "./components/PerpetualUsers";
import ActiveUsers from "./components/ActiveUsers";
import SideDrawer from "./components/SideDrawer";

const App=()=> {
  return (
    <div className="flex h-screen bg-[#F2F2F7] overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="flex flex-1 h-[calc(100vh-120px)]">
          <main className="flex-1 overflow-y-auto [scrollbar-width:none] bg-white">
            <div className="flex-1 overflow-y-auto bg-white px-5 py-5 md:px-6 md:py-6">
              <ChartSection />

              <div className="flex flex-col md:flex-row items-start md:space-x-8 space-y-6 md:space-y-0">
                <PerpetualUsers />
                <ActiveUsers />
              </div>
            </div>
          </main>
          <SideDrawer />
        </div>
      </div>
    </div>
  );
}

export default App;
