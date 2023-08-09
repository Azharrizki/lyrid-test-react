import React, { useState } from "react";
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	useToast,
	Spinner,
	Alert,
	AlertIcon,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import AuthLayout from "../layout/auth/AuthLayout";
import { Link } from "react-router-dom";
import { supabase } from "../utils/supabase";

const Register = () => {
	const toast = useToast();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const registerAccount = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: {
						firstName,
						lastName,
						fullname: firstName + " " + lastName,
						role: "user",
					},
				},
			});

			if (error) {
				setLoading(false);
				toast({
					title: "Registrasi gagal.",
					description: "We've can't created your account for you.",
					status: "error",
					duration: 4000,
					isClosable: true,
				});
				console.log("Terjadi error ketika register akun", error);
			} else if (data) {
				setLoading(false);
				setFirstName("");
				setLastName("");
				setEmail("");
				setPassword("");
				console.log("Berhasil melakukan pendaftaran akun");
				toast({
					title: "Registrasi Berhasil.",
					description: "We've created your account for you.",
					status: "success",
					duration: 4000,
					isClosable: true,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<AuthLayout>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Sign up
					</Heading>
					<Text fontSize={"lg"} color={"gray.600"}>
						to enjoy all of our cool features ✌️
					</Text>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>
					<Stack spacing={4}>
						<HStack>
							<Box>
								<FormControl id="firstName" isRequired>
									<FormLabel>First Name</FormLabel>
									<Input
										type="text"
										placeholder="Masukan first name anda"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
									/>
								</FormControl>
							</Box>
							<Box>
								<FormControl id="lastName">
									<FormLabel>Last Name</FormLabel>
									<Input
										type="text"
										placeholder="Masukan last name anda"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
									/>
								</FormControl>
							</Box>
						</HStack>
						<FormControl id="email" isRequired>
							<FormLabel>Email address</FormLabel>
							<Input
								type="email"
								placeholder="Masukan email anda"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</FormControl>
						<FormControl id="password" isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? "text" : "password"}
									placeholder="Masukan password anda"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<InputRightElement h={"full"}>
									<Button
										variant={"ghost"}
										onClick={() =>
											setShowPassword((showPassword) => !showPassword)
										}
									>
										{showPassword ? <FiEye /> : <FiEyeOff />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								onClick={registerAccount}
								loadingText="Submitting"
								size="lg"
								bg={"blue.400"}
								color={"white"}
								_hover={{
									bg: "blue.500",
								}}
							>
								{loading ? <Spinner /> : "Sign up"}
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={"center"}>
								Already a user?{" "}
								<Link to={"/login"} color={"blue.400"}>
									Login
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</AuthLayout>
	);
};

export default Register;
