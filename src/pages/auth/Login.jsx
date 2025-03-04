import { useEffect } from 'react';
import { Box, Button, Text, VStack, Heading, Flex, Icon, Grid } from '@chakra-ui/react';
import { AuthProvider } from '@/context/AuthProvider';
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFlagCheckered, FaCarSide,  FaTrophy } from "react-icons/fa6";
import { useAuth } from '@/hooks/useAuth';
import { Toaster, toaster } from "@/components/ui/toaster"

const Login = () => {
  const { login, isAuthenticated, loading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home"); // Redirect to Home after login
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if(error){
      toaster.create({
        title: "Google SignIn Error!",
        type: "error",
      })
    }
  })

  const accentColor = "#C8FA17";
  return (
    <>
    <Box
      minH="100vh"
      w="100%"
      position="relative"
      overflow="hidden"
    >
      {/* Main content */}
      <VStack
        spacing={8}
        w="100%"
        h="100vh"
        justify="center"
        align="center"
        p={{ base: 6, md: 8 }}
        position="relative"
        zIndex="1"
      >
        <Text
          fontWeight="bold"
          fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
          textAlign="center"
          textTransform="uppercase"
          letterSpacing="wide"
          mb={2}
        >
          Get your daily motorsports feed right here!
        </Text>

        {/* Login button */}
        <VStack w="100%" maxW="md" spacing={4}>
          <Button
            width="100%"
            height={{ base: "54px", md: "60px" }}
            bg={accentColor}
            size="lg"
            rounded='full'
            fontWeight="bold"
            onClick={login}
            loading={loading}
            spinner={<BeatLoader size={10} color="black" />}
            letterSpacing="wide"
          >
            <Flex align="center">
              <Box mr={3} p={1}>
                <FaGoogle />
              </Box>
              CONTINUE WITH GOOGLE
            </Flex>
          </Button>

          <Text fontSize="sm" pt={2}>
            By continuing, you agree to our Terms of Service
          </Text>
        </VStack>
      </VStack>
      <Toaster/>
    </Box>
    </>

  );
};

export default Login;