import React, { useState } from 'react'
import axios from "axios"
import { Box, VStack, Heading, Text, Input, FormControl, FormLabel, Button } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'


const Signup = () => {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [pic, setPic] = useState()
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const toast = useToast()

    const submitHandler = async () => {

        setLoading(true)
        if (!name || !email || !password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        try {
            console.log(name, email, password);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/users/signup",
                { name, email, password, pic },
                config
            );

            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate("/chats");
        } catch (error) {
            console.log(error)
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    }

    const uplaodImage = (pics) => {
        setLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        if (pics.type === "image/jpeg" || pics.type === "image/jpg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "piyushproj");
            fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
    };

    return (
        <Box
            w={['full', 'md']}
            p={[8, 10]}
            mt={[20, '10vh']}
            mx='auto'
            border={['none', '1px']}
            borderColor={['', 'gray.300']}
            borderRadius={10}
        >
            <VStack
                spacing={4}
                align='flex-start'
                w='full'
                mb={8}
            >
                <VStack
                    spacing={1}
                    align={['flex-start', 'center']}
                    w='full'
                >
                    <Heading>Signup</Heading>
                    <Text>Please fill the form to register</Text>
                </VStack>
                <FormControl mb={2}>
                    <FormLabel>Name</FormLabel>
                    <Input
                        rounded='none' variant='filled' type='text'
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormControl>
                <FormControl mb={2}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        rounded='none' variant='filled' type='text'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                        rounded='none' variant='filled' type='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
                <FormControl id="pic">
                    <FormLabel>Upload your Picture</FormLabel>
                    <Input
                        variant='filled'
                        type="file"
                        p={1.5}
                        accept="image/*"
                        onChange={(e) => uplaodImage(e.target.files[0])}
                    />
                </FormControl>
                <Text mt={4}>Already have account? <Link to='/'>
                    <Button variant='link' colorScheme='blue' pl={2}>login</Button></Link></Text>
                <Button
                    rounded='none'
                    colorScheme='blue'
                    w={['full', 'auto']}
                    mt={4}
                    alignSelf='end'
                    onClick={submitHandler}
                    isLoading={loading}
                >
                    Signup
                </Button>
            </VStack>

        </Box>
    )
}

export default Signup