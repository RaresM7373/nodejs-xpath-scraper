import { Center, Heading } from '@chakra-ui/react';
import { ScrapeTable } from '../components/ScrapeTable';

const RootScreen = () => {
  return (
    <Center p={12} flexDirection={'column'}>
      <Heading mb={12}>Exam - Modure Rares</Heading>
      <ScrapeTable />
    </Center>
  );
};

export default RootScreen;
