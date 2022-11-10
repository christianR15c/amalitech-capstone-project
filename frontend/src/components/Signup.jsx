import React from 'react'
import { Box, VStack, Heading, Text, Input, FormControl, FormLabel, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'


const Signup = () => {
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
                    <FormLabel>Email</FormLabel>
                    <Input rounded='none' variant='filled' />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input rounded='none' variant='filled' type='password' />
                </FormControl>
                <FormControl id="pic">
                    <FormLabel>Upload your Picture</FormLabel>
                    <Input
                        variant='filled'
                        type="file"
                        p={1.5}
                        accept="image/*"
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
                >
                    Signup
                </Button>
            </VStack>

        </Box>
    )
}

export default Signup