import { Box } from '@chakra-ui/react'
import React from 'react'
import SearchSideBar from '../components/SearchSideBar'
import ChatBox from '../components/ChatBox'
import MyChats from '../components/MyChats'
import { ChatState } from '../context/ChatProvider'

const ChatPage = () => {

    const { user } = ChatState()

    return (
        <div style={{ width: '100%' }}>
            {user && <SearchSideBar />}
            <Box
                display='flex'
                justifyContent="space-between"
                w="100%"
                h="91.5vh"
                p="10px"
                bgColor='#E0F2F1'
            >
                {user && <MyChats />}
                {user && <ChatBox />}
            </Box>
        </div>
    )
}

export default ChatPage
