import {
	Box,
	Button,
	Flex,
	Grid,
	GridItem,
	Heading,
	Image,
	Text,
} from "@chakra-ui/react";
import React from "react";
import Error404 from "../assets/error-404.png";
import { Link } from "react-router-dom";

const Error = () => {
	return (
		<Grid placeContent={"center"} h={"100vh"}>
			<Flex flexDir={"column"} gap={8} align={"center"}>
				<Image src={Error404} w={"sm"} />
				<Heading fontSize={"2xl"}>
					404: The page you are looking for isn’t here
				</Heading>
				<Link to={"/"}>
					<Button>Go back to dashboard</Button>
				</Link>
			</Flex>
		</Grid>
	);
};

export default Error;
