import { Center, Heading } from '@chakra-ui/react';

import ScrapeTable from '../components/ScrapeTable';
import { AddRepoForm } from '../components/AddRepoForm';
import { DeleteRepoForm } from '../components/DeleteRepoForm';

const RootScreen = () => {
  return (
    <Center p={12} flexDirection={'column'}>
      <Heading mb={12}>Exam - Modure Rares</Heading>
      <ScrapeTable />
      <AddRepoForm />
      <DeleteRepoForm />
    </Center>
  );
};

export default RootScreen;
