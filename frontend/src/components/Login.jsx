import React from 'react'
import { Box, VStack, Heading, Text, Input, FormControl, FormLabel, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Login = () => {
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
                    <Input rounded='none' variant='filled' />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input rounded='none' variant='filled' type='password' />
                </FormControl>

                <Text mt={4}>You don't have account? <Link to='signup'>
                    <Button variant='link' colorScheme='blue' pl={2}>Create account</Button></Link></Text>
                <Button
                    rounded='none'
                    colorScheme='blue'
                    w={['full', 'auto']}
                    mt={4}
                    alignSelf='end'
                >
                    Login
                </Button>
            </VStack>

        </Box>
    )
}

export default Login
