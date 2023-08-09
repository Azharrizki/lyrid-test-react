import {
	Box,
	CloseButton,
	Flex,
	Icon,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FiHome, FiDatabase, FiUser, FiBarChart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const LinkItemsAdmin = [
	{ name: "Dashboard", icon: FiBarChart, path: "/" },
	{ name: "User", icon: FiUser, path: "/data-user" },
	{ name: "Pegawai", icon: FiDatabase, path: "/data-pegawai" },
];

const LinkItemsUser = [{ name: "Home", icon: FiHome, path: "/" }];

const Sidebar = ({ onClose, ...rest }) => {
	const { role } = useAuth();

	return (
		<Box
			transition="3s ease"
			bg={useColorModeValue("white", "gray.900")}
			borderRight="1px"
			borderRightColor={useColorModeValue("gray.200", "gray.700")}
			w={{ base: "full", md: 60 }}
			pos="fixed"
			h="full"
			{...rest}
		>
			<Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
				<Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
					Logo
				</Text>
				<CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
			</Flex>
			{role === "user"
				? LinkItemsUser.map((link) => (
						<SidebarItem key={link.name} icon={link.icon} path={link.path}>
							{link.name}
						</SidebarItem>
				  ))
				: role === "admin"
				? LinkItemsAdmin.map((link) => (
						<SidebarItem key={link.name} icon={link.icon} path={link.path}>
							{link.name}
						</SidebarItem>
				  ))
				: ""}
		</Box>
	);
};

const SidebarItem = ({ icon, path, children, ...rest }) => {
	return (
		<Link
			to={path}
			style={{ textDecoration: "none" }}
			_focus={{ boxShadow: "none" }}
		>
			<Flex
				align="center"
				p="4"
				mx="4"
				borderRadius="lg"
				role="group"
				cursor="pointer"
				_hover={{
					bg: "cyan.400",
					color: "white",
				}}
				{...rest}
			>
				{icon && (
					<Icon
						mr="4"
						fontSize="16"
						_groupHover={{
							color: "white",
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Link>
	);
};

export default Sidebar;
