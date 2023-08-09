import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import DashboardLayout from "../layout/dashboard/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";

const Dashboard = () => {
	return <DashboardLayout>Dashboard</DashboardLayout>;
};

export default Dashboard;
