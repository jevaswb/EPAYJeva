import Overview from "@/components/Dashboard/Overview";
import AddEventForm from "@/components/Forms/AddEventForm";
import AddParticipantForm from "@/components/Forms/AddParticipantForm";
import MakeAllocation from "@/components/Forms/MakeAllocation";
import Sidenav from "@/components/Sidenav/sidenav";
import UserInfo from "@/components/UserInfo";
import React from "react";

const Dashboard = async () => {
  return (
    <>
      <Sidenav />
      <main className="ml-64 mr-4">
        <UserInfo /> 
        <Overview />
        <MakeAllocation />
         <AddEventForm /> 
        {/* <AddParticipantForm /> */}
      </main>
    </>
  );
};

export default Dashboard;
