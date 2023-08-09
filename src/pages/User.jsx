import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/dashboard/DashboardLayout";
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Grid,
	GridItem,
	Icon,
	Input,
	Spinner,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";

import { FiDelete, FiEdit, FiPenTool, FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteUser,
	fetchUser,
	getAllUser,
	updateUser,
} from "../features/user/userSlice";

const User = () => {
	const users = useSelector(getAllUser);
	const dispatch = useDispatch();
	const status = useSelector((state) => state.user.status);
	const [loadingUpdate, setLoadingUpdate] = useState(false);
	const [userId, setUserId] = useState(null);
	const [fullname, setFullname] = useState("");
	const [role, setRole] = useState("");

	const handleEdit = async (e) => {
		e.preventDefault();
		try {
			console.log("Berhasil update user");
			await dispatch(updateUser({ userId, fullname, role }));
			await dispatch(fetchUser());
		} catch (error) {
			console.log("gagal");
			console.log(error);
		}
	};

	const handleDelete = async (e, id) => {
		e.preventDefault();
		try {
			console.log("Berhasil hapus user");
			await dispatch(deleteUser(id));
			await dispatch(fetchUser());
		} catch (error) {
			console.log("gagal");
			console.log(error);
		}
	};

	useEffect(() => {
		if (status == "idle") {
			dispatch(fetchUser());
		}
	}, [status, dispatch]);

	if (status === "loading") {
		return (
			<DashboardLayout>
				<Grid placeItems={"center"}>
					<GridItem>
						<Spinner />
					</GridItem>
				</Grid>
			</DashboardLayout>
		);
	}

	return (
		<DashboardLayout>
			<Grid templateColumns="repeat(5, 1fr)" gap={6} p={6}>
				<GridItem colSpan={"3"} bg="whiteAlpha.900" p={4} rounded={"xl"}>
					<TableContainer>
						<Table variant="simple">
							<Thead>
								<Tr>
									<Th>No</Th>
									<Th>Fullname</Th>
									<Th>Role</Th>
									<Th>Action</Th>
								</Tr>
							</Thead>
							<Tbody>
								{users &&
									users.map((user, index) => (
										<Tr key={index}>
											<Td>{index + 1}</Td>
											<Td>{user.user_metadata.fullname}</Td>
											<Td>{user.user_metadata.role}</Td>
											<Td display={"flex"} justifyContent={"space-around"}>
												<Button
													onClick={() => {
														setUserId(user.id);
														setFullname(user.user_metadata.fullname);
														setRole(user.user_metadata.role);
													}}
													colorScheme="yellow"
												>
													<Icon as={FiEdit} />
												</Button>
												<Button
													onClick={(e) => {
														handleDelete(e, user.id);
													}}
													colorScheme="red"
												>
													<Icon as={FiTrash} />
												</Button>
											</Td>
										</Tr>
									))}
							</Tbody>
						</Table>
					</TableContainer>
				</GridItem>
				<GridItem colSpan={"2"} w="100%" bg="whiteAlpha.900" p={4} rounded={"xl"}>
					<Box>
						<FormControl id="users_id">
							<Input type="text" value={userId} placeholder="ID user" hidden />
						</FormControl>
						<FormControl id="fullname" mb={2}>
							<FormLabel>Fullname</FormLabel>
							<Input
								type="text"
								value={fullname}
								placeholder="Fullname user"
								onChange={(e) => setFullname(e.target.value)}
							/>
						</FormControl>
						<FormControl id="role" mb={2}>
							<FormLabel>Role</FormLabel>
							<Input
								type="text"
								value={role}
								placeholder="Role user"
								onChange={(e) => setRole(e.target.value)}
							/>
						</FormControl>
						<Flex justify={"end"}>
							<Button mt={3} colorScheme="green" onClick={handleEdit}>
								{loadingUpdate ? <Spinner /> : "Simpan"}
							</Button>
						</Flex>
					</Box>
				</GridItem>
			</Grid>
		</DashboardLayout>
	);
};

export default User;
