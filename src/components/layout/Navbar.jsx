import { Box, Flex, Heading,Avatar, AvatarGroup, Button, HStack, IconButton  } from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";
import {
  MenuContent,
  MenuItem,
  MenuItemCommand,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { PiDotsThreeOutlineVerticalLight } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import { green } from "@/theme";

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
        h={{ base: "50px", md: "60px" }}
        px={{ base: 3, md: 6 }}
        pt={{ base: 5, md: 7 }}
        alignItems="center"
        justifyContent="space-between"
        maxW="1200px"
        mx="auto"
      >
        <HStack spacing={{ base: 2, md: 4 }}>
        <AvatarGroup>
          <Avatar.Root color={'yellow.400'} size={{ base: "sm", md: "md" }}>
            <Avatar.Fallback name={user.name} />
            <Avatar.Image src={user.picture} />
          </Avatar.Root>
        </AvatarGroup>
        <Heading
           size={{ base: "sm", md: "md" }}
        >
          Hello, {firstname}
        </Heading>
        </HStack>
      {/* Menu Icon for Options */}
      <MenuRoot >
        <MenuTrigger asChild>
            <IconButton
              variant="outline"
              aria-label="Menu"
              size={{ base: "sm", md: "md" }}
              rounded={'full'}
              bg={green}
              color="black"
            ><PiDotsThreeOutlineVerticalLight  />
            </IconButton>
          </MenuTrigger>
      <MenuContent rounded="full">
        <MenuItem onClick={logout} rounded="full" value="logout" color="red.400"><CiLogout />
          Logout
        </MenuItem>
      </MenuContent>
    </MenuRoot>

      </Flex>
    </Box>
  );
};

export default Navbar;
