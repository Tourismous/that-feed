import { Box, Flex, Heading,Avatar, AvatarGroup, Button, HStack  } from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";
import {
  MenuContent,
  MenuItem,
  MenuItemCommand,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu"
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";

const Navbar = () => {

  const { user, logout } = useAuth();
  const firstname = user.name.split(' ')[0]

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={10}
    >
      <Flex
        h="60px"
        px={4}
        pt={7}
        alignItems="center"
        justifyContent="space-between"
        maxW="1200px"
        mx="auto"
      >
        <HStack>
        <AvatarGroup>
          <Avatar.Root color={'yellow.400'} size={"2xl"} >
            <Avatar.Fallback name={user.name} />
            <Avatar.Image src={user.picture} />
          </Avatar.Root>
        </AvatarGroup>
        <Heading
          size="md"
        >
          Hello, {firstname}
        </Heading>
        </HStack>

      <MenuRoot >
      <MenuTrigger asChild>
      <PiDotsThreeOutlineVerticalLight size={25} />
      </MenuTrigger>
      <MenuContent rounded="full">
        <MenuItem onClick={logout} rounded="full" value="logout" color="red.400">
          <CiLogout />
          Logout
        </MenuItem>
      </MenuContent>
    </MenuRoot>

      </Flex>
    </Box>
  );
};

export default Navbar;
