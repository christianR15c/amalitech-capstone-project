import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { ChevronDownIcon } from '@chakra-ui/icons'
import {
    Avatar,
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Box,
    Text,
    Tooltip,
    useDisclosure,
    DrawerCloseButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Input,
    useToast,
    Spinner
} from "@chakra-ui/react"
import { ChatState } from '../context/ChatProvider'
import { useNavigate } from 'react-router-dom'
import ChatLoading from './ChatLoading'
import axios from 'axios'
import UserListItem from '../userAvatar/UserListItem'


const SearchSideBar = () => {

    const { user, chats, setChats, setSelectedChat } = ChatState()
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState()

    const logoutHandler = () => {
        localStorage.removeItem('userInfo')
        navigate('/')
    }

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true)
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            }

            const { data } = await axios.post('/api/chat', { userId }, config)

            console.log(data);

            if (!chats.find((c) => c.id === data.id)) setChats([data, ...chats])

            setSelectedChat(data)
            setLoadingChat(false)
            onClose()
        } catch (error) {
            toast({
                title: 'Failed to load chat',
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'bottom-left'
            })
            setLoading(false)
        }
    }

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: 'Please Enter a search term',
                status: 'warning',
                isClosable: true,
                duration: 5000,
                position: 'top-left'
            })
            return
        }
        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.get(`/api/users/?term=${search}`, config);

            setLoading(false);
            setSearchResult(data);
        } catch (error) {
            toast({
                title: 'Failed to load the search results',
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'bottom-left'
            })
            setLoading(false)
        }
    }

    return (
        <>
            <Box
                display="flex"
                justifyContent='space-between'
                alignItems="center"
                m={3}
            >
                <Tooltip
                    label='search a user'
                    hasArrow placement='bottom-end'
                >
                    <Button variant='ghost' onClick={onOpen}>
                        <BsSearch />
                        <Text
                            display={{ base: "none", md: "flex" }}
                            pl={2}
                        >
                            Search User
                        </Text>
                    </Button>
                </Tooltip>
                <div>

                    <Menu>
                        <MenuButton p='1'
                            as={Button}
                            rightIcon={<ChevronDownIcon />} >
                            <Avatar size='sm' cursor='pointer'
                                name={user.name}
                                src={user.pic} />
                        </MenuButton>
                        <MenuList>
                            <Box
                                display='flex'
                                p={3}
                            >
                                <Text
                                    fontSize={20}
                                    fontWeight='bold'
                                >{user.name}</Text>
                            </Box>
                            <MenuItem onClick={logoutHandler}>
                                Logout
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>

            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
            // finalFocusRef={bt}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>Search a User</DrawerHeader>

                    <DrawerBody>
                        <Box display='flex' pb={2}>
                            <Input
                                type='text'
                                placeholder='Search by name or email'
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            <Button
                                onClick={handleSearch}
                            >Search</Button>
                        </Box>
                        {loading ? (
                            <ChatLoading />
                        ) : (
                            searchResult?.map(user => (
                                <UserListItem
                                    key={user.id}
                                    user={user}
                                    handleFunction={() => accessChat(user.id)}
                                />
                            ))
                        )}
                        {loadingChat && <Spinner ml='auto' display='flex' />}
                    </DrawerBody>

                    <DrawerFooter>

                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SearchSideBar
