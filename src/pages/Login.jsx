import React, { useState } from "react";
import AuthLayout from "../layout/auth/AuthLayout";
import {
	Box,
	FormControl,
	FormLabel,
	Input,
	Checkbox,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Spinner,
	useToast,
} from "@chakra-ui/react";
import { supabase } from "../utils/supabase";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
	const [value, setValue] = useState({
		email: "",
		password: "",
	});

	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { setUser, setAuth, setRole } = useAuth();
	const toast = useToast();

	const signIn = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const { data, error } = await supabase.auth.signInWithPassword(value);

			if (error) {
				console.log("Gagal melakukan login", error);
				toast({
					title: "Login Gagal.",
					description: "We've problem when you sign in.",
					status: "error",
					duration: 4000,
					isClosable: true,
				});
			} else if (data) {
				console.log("Berhasil melakukan login kedalam aplikasi");
				setAuth(true);
				setUser(data.user);
				setRole(data.user.user_metadata.role);
				toast({
					title: "Login Berhasil.",
					description: "Succeeded sign in.",
					status: "success",
					duration: 4000,
					isClosable: true,
				});
				navigate("/");
			}
		} catch (error) {
			console.log("gagal melakukan login", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthLayout>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"}>Sign in to your account</Heading>
					<Text fontSize={"lg"} color={"gray.600"}>
						to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
					</Text>
				</Stack>
				<Box
					rounded={"lg"}
					bg={useColorModeValue("white", "gray.700")}
					boxShadow={"lg"}
					p={8}
				>
					<Stack spacing={4}>
						<FormControl id="email">
							<FormLabel>Email address</FormLabel>
							<Input
								type="email"
								value={value.email}
								placeholder="Masukan email anda"
								onChange={(e) => setValue({ ...value, email: e.target.value })}
							/>
						</FormControl>
						<FormControl id="password">
							<FormLabel>Password</FormLabel>
							<Input
								type="password"
								value={value.password}
								placeholder="Masukan password anda"
								onChange={(e) =>
									setValue({ ...value, password: e.target.value })
								}
							/>
						</FormControl>
						<Stack>
							<Stack
								mb={6}
								direction={{ base: "column", sm: "row" }}
								align={"start"}
								justify={"space-between"}
							>
								<Checkbox>Remember me</Checkbox>
								<Link color={"blue.400"}>Forgot password?</Link>
							</Stack>
							<Button
								bg={"blue.400"}
								color={"white"}
								_hover={{
									bg: "blue.500",
								}}
								onClick={signIn}
							>
								{loading ? <Spinner /> : "Sign in"}
							</Button>
						</Stack>
					</Stack>
				</Box>
				<Text textAlign={"center"}>
					Belum memiliki akun? <Link to={"/register"}>Daftar</Link>
				</Text>
			</Stack>
		</AuthLayout>
	);
};

export default Login;
