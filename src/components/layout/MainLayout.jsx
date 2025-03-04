import { Box, Flex } from '@chakra-ui/react'
import Navbar from './Navbar'
import BottomNav from './BottomNav'

const MainLayout = ({ children }) => {
  return (
    <Box
    minH="100vh"
    position="relative"
    _before={{
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background:'radial-gradient(circle at 80% 10%, rgba(200, 250, 23, 0.2) 10%, transparent 100%)',
      opacity: 0.3,
      zIndex: 1,
    }}
    >
      <Navbar />
      <Flex
        direction="column"
        pt="60px"
        pb="70px"
        px={4}
        maxW="1200px"
        mx="auto"
        minH="calc(100vh - 130px)"
      >
        {children}
      </Flex>
      <BottomNav />
    </Box>
  )
}

export default MainLayout