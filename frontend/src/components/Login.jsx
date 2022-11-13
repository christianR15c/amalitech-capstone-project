import React, { useState } from 'react'
import { Box, VStack, Heading, Text, Input, FormControl, FormLabel, Button } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'


const Login = () => {

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const toast = useToast()
    const navigate = useNavigate()

    const submitHandler = async () => {
        setLoading(true)
        if (!email || !password) {
            toast({
                title: "Please Enter email and Password",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(
                "/api/users/login",
                { email, password },
                config
            );
            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            navigate("/chats");
            window.location.reload(true);


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
                    <Heading>Login</Heading>
                    <Text>Enter your email and Password to login</Text>
                </VStack>
                <FormControl mb={2}>
                    <FormLabel>Email</FormLabel>
                    <Input
                        rounded='none'
                        variant='filled'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                        rounded='none'
                        variant='filled'
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>

                <Text mt={4}>You don't have account? <Link to='signup'>
                    <Button variant='link' colorScheme='blue' pl={2}>Create account</Button></Link></Text>
                <Button
                    rounded='none'
                    colorScheme='blue'
                    w={['full', 'auto']}
                    mt={4}
                    alignSelf='end'
                    onClick={submitHandler}
                    isLoading={loading}
                >
                    Login
                </Button>
            </VStack>

        </Box>
    )
}

export default Login
