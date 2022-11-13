import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    useToast,
    FormControl,
    Input
} from '@chakra-ui/react'
import axios from 'axios'
import { ChatState } from '../context/ChatProvider'

const GroupChatModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName] = useState()
    const [loading, setLoading] = useState(false)

    const toast = useToast()

    const { user, groupChats, setGroupChats } = ChatState()

    const handleSubmit = async () => {
        if (!groupChatName) {
            toast({
                title: 'Please add a group name',
                description: 'Please fill all the fields below',
                status: 'warning',
                isClosable: true,
                duration: 5000,
                position: 'bottom-left'
            })
            return
        }

        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.post('/api/chat/group', {
                chatName: groupChatName,
            },
                config
            )
            setLoading(false)
            setGroupChats([data, ...groupChats])
            onClose()
            toast({
                title: 'New Group created!',
                status: 'success',
                isClosable: true,
                duration: 5000,
                position: 'top-center',
            })
        } catch (error) {
            toast({
                title: 'Failed to create new group',
                description: error.response.data.error,
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'bottom-left'
            })
        }
    }

    return (
        <>
            <span onClick={onOpen}>{children}</span>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize='35px'
                        fontFamily='Work Sans'
                        display='flex'
                        justifyContent='center'
                    >
                        Create Group Chat
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display='flex'
                        flexDir='column'
                        alignItems='center'
                    >
                        <FormControl >
                            <Input
                                placeholder='Chat Name'
                                mb={3}
                                onChange={(e) => setGroupChatName(e.target.value)}
                            />
                        </FormControl>

                    </ModalBody>

                    <ModalFooter
                        display='flex'
                        flexDir='column'
                        alignItems='center'
                    >
                        <Button
                            colorScheme='green'
                            mr={3}
                            px={8}
                            onClick={handleSubmit}
                            isLoading={loading}
                        >
                            Create Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModal
