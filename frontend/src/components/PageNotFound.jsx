import { Box, Button, Image, Text } from '@chakra-ui/react';
import React from 'react'
import { Link } from 'react-router-dom';
//import pagenotfound image
import pagenotfoundImage from "../pagenotfound.jpg";
//react router dom




const PageNotFound = () => {
    return (
        <Box
            w={['full', 'md']}
            p={[8, 10]}
            mt={[20, '10vh']}
            mx='auto'
        >
            <Text mb={6}>
                <Link to='/'>
                    <Button variant='link' colorScheme='blue' >Go back home</Button></Link>            </Text>
            <div className="pageNotFound">

                <Text>Oops..! 404 Page Not Found</Text>
                <Text>Looks like you came to wrong page on our server</Text>
                <Image src={pagenotfoundImage} objectFit='cover' boxSize={['full', '500']} alt="not found" />
            </div>
        </Box>
    )
}

export default PageNotFound;