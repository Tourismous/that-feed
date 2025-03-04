import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { FiHome, FiBell, FiUser, FiSettings } from 'react-icons/fi'
import { MdRssFeed } from "react-icons/md";
import { green } from '@/theme';
import { RiHomeWifiLine } from "react-icons/ri";

const BottomNav = () => {
  const navigate = useNavigate()

  const navItems = [
    { name: 'Home', icon: RiHomeWifiLine, path: '/home' },
    { name: 'Notifications', icon: FiBell, path: '/notifications' },
    { name: 'Profile', icon: FiUser, path: '/profile' },
    { name: 'Settings', icon: FiSettings, path: '/settings' },
  ]

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      zIndex={10}
    >
      <Flex h="100px" justifyContent="space-around" alignItems="center" p={2} pb={10}>
      {navItems.map((item) => (
      <Flex
        key={item.name}
        direction="column"
        align="center"
        justify="center"
        w={{ base: "16", md: "20" }}
        h={{ base: "16", md: "20" }}
        cursor="pointer"
        onClick={() => navigate(item.path)}
        color={location.pathname === item.path ? "black" : "white"}
        border={location.pathname === item.path ? "4px solid" : "none"}
        borderColor={location.pathname === item.path ? green : "transparent"}
        bg={location.pathname === item.path ? green : "none"}
        rounded="full"
      >
        <Icon
          color={location.pathname === item.path ? "black" : "white"}
          as={item.icon}
          boxSize={{ base: 7, md: 9 }}
        />
      </Flex>
    ))}

      </Flex>
    </Box>
  )
}

export default BottomNav