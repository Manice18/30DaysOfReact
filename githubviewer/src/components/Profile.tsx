import { useState, useEffect } from 'react';
import { Box,Spinner, Heading, Image, Link,Text, Alert, AlertIcon,useColorMode,Stack} from '@chakra-ui/react';
import axios from 'axios';
import { ExternalLinkIcon } from '@chakra-ui/icons'

const ProfileViewer = ({data}) => {
  const [user, setUser] = useState(null);
  const [stats,setStats] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  const {colorMode,setColorMode}=useColorMode();

  useEffect(() => {
    const fetchUser = async () => {
      console.log(data?.name)
      try {
        const response = await axios.get(`https://api.github.com/users/${data?.name}`);
        console.log(response)
        setUser(response.data);
        setStats(`https://github-readme-stats.vercel.app/api?username=${response.data.name}&show_icons=true&theme=tokyonight`)
        setLoading(false);
      } catch (error) {
        setError("Request Failed because this username was not found");
        setLoading(false);
      }
    };
    setTimeout(fetchUser,1000);
  }, []);

  if (loading) {
    return <Spinner
    thickness='4px'
    speed='0.65s'
    emptyColor='gray.200'
    color='blue.500'
    size='xl'
  />;
  }

  if (error) {
    return <Alert status='error'>
    <AlertIcon />
    {error}
  </Alert>;
  }

  if (!user) {
    return null;
  }

  return (
    <><Box maxW='sm' borderWidth='2px' borderRadius='lg' >
      <Heading>{user.name}</Heading>
      <Stack spacing={3}>
      <Image src={user.avatar_url} alt="user avatar" boxSize="150px" objectFit="cover" />
      <Text as='b'>Username: {user.login}</Text>
      <Text as='b'>Location: {user.location}</Text>
      <Text as='b'>Followers: {user.followers}</Text>
      <Text as='b'>Repositories: {user.public_repos}</Text>
      <Text as='b'>Profile Url: <Link color={colorMode==='dark'?'teal.400' : 'blue.500'} href={user.html_url} isExternal>{user.html_url} <ExternalLinkIcon mx='2px' /></Link> </Text>
      <img src={stats} alt="stats" />
      </Stack>
    </Box>
    </>
  );
};

export default ProfileViewer;