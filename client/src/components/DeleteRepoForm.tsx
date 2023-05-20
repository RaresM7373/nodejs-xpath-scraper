import { useState } from 'react';
import { Button, Input, Stack } from '@chakra-ui/react';
import { useStore } from '../hooks/useStore';

export const DeleteRepoForm = () => {
  const [name, setName] = useState('');

  const {
    repoStore: { deleteRepo },
  } = useStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async () => {
    deleteRepo(name);
  };

  return (
    <Stack spacing={2} w={'100%'} direction={'row'}>
      <Input
        placeholder="Type in the repository title"
        value={name}
        onChange={handleChange}
      />

      <Button colorScheme="red" onClick={handleSubmit} px={12}>
        Delete repository
      </Button>
    </Stack>
  );
};
