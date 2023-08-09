import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/dashboard/DashboardLayout";
import {
	Badge,
	Button,
	Modal,
	Grid,
	GridItem,
	Icon,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useDisclosure,
} from "@chakra-ui/react";
import { supabase } from "../utils/supabase";
import { FiEdit, FiTrash } from "react-icons/fi";

const Employee = () => {
	const [employee, setEmployee] = useState([]);
	const [loading, setLoading] = useState(true);
	const [imageData, setImageData] = useState(null);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const fetchData = async () => {
		setLoading(true);
		const { data, error } = await supabase.from("employee").select();

		if (error) console.log(error);

		if (data) {
			setEmployee(data);
			setLoading(false);
		}
	};

	// const handleEdit = async (e) => {
	// 	e.preventDefault();
	// 	try {
	// 		console.log("Berhasil update user");
	// 		await dispatch(updateUser({ userId, fullname, role }));
	// 		await dispatch(fetchUser());
	// 	} catch (error) {
	// 		console.log("gagal");
	// 		console.log(error);
	// 	}
	// };

	// const handleDelete = async (e, id) => {
	// 	e.preventDefault();
	// 	try {
	// 		console.log("Berhasil hapus user");
	// 		await dispatch(deleteUser(id));
	// 		await dispatch(fetchUser());
	// 	} catch (error) {
	// 		console.log("gagal");
	// 		console.log(error);
	// 	}
	// };

	useEffect(() => {
		fetchData();
	}, []);

	if (loading) {
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
		<>
			<Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text fontWeight="bold" mb="1rem">
							You can scroll the content behind the modal
						</Text>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Close
						</Button>
						<Button variant="ghost">Secondary Action</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<DashboardLayout>
				<Grid templateColumns="repeat(5, 1fr)" gap={6} p={6}>
					<GridItem colSpan={"5"} bg="whiteAlpha.900" p={4} rounded={"xl"}>
						<Button colorScheme="green" mb={2} onClick={onOpen}>
							Tambah
						</Button>
						<TableContainer>
							<Table variant="simple">
								<Thead>
									<Tr>
										<Th>No</Th>
										<Th>Name</Th>
										<Th>Position</Th>
										<Th>Department</Th>
										<Th>Salary</Th>
										<Th>Status</Th>
										<Th>Action</Th>
									</Tr>
								</Thead>
								<Tbody>
									{employee &&
										employee.map((e, index) => (
											<Tr key={index}>
												<Td>{index + 1}</Td>
												<Td>{e.name}</Td>
												<Td>{e.position}</Td>
												<Td>{e.department}</Td>
												<Td>
													{e.salary.toLocaleString("id-ID", {
														style: "currency",
														currency: "IDR",
													})}
												</Td>
												<Td>
													<Badge
														colorScheme={
															e.status == "Tetap"
																? "green"
																: e.status == "Kontrak"
																? "cyan"
																: e.status == "Magang"
																? "telegram"
																: ""
														}
													>
														{e.status}
													</Badge>
												</Td>
												<Td display={"flex"} justifyContent={"space-around"}>
													<Button colorScheme="yellow">
														<Icon as={FiEdit} />
													</Button>
													<Button colorScheme="red">
														<Icon as={FiTrash} />
													</Button>
												</Td>
											</Tr>
										))}
								</Tbody>
							</Table>
						</TableContainer>
					</GridItem>
				</Grid>
			</DashboardLayout>
		</>
	);
};

export default Employee;
