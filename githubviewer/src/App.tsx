import { Heading, VStack, useColorMode,IconButton } from '@chakra-ui/react'
import FormX from './components/Form';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const App = () => {
  const {colorMode, toggleColorMode} = useColorMode();
  return (
    <>
      <VStack p={4}>
      <IconButton 
        icon={colorMode==='light'?<SunIcon/> : <MoonIcon />} 
        isRound="true"
        size="lg" 
        alignSelf="flex-end" 
        onClick={toggleColorMode}
        />
        <a href="/">
        <Heading 
        mb="8" 
        fontWeight="extrabold" 
        size="2xl" 
        bgGradient="linear(to-r, pink.500, pink.300, blue.500)" 
        bgClip="text"
        cursor="pointer"
        >
        GitHub Profile Viewer
        </Heading>
        </a>
        <FormX />
        </VStack>
    </>
  )
}

export default App