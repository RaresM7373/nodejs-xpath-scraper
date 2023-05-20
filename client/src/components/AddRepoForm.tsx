import { useState } from 'react';
import { Button, Input, Stack } from '@chakra-ui/react';
import { Repo } from '../constants/types';
import { useStore } from '../hooks/useStore';

const DEFAULT_REPO = {
  title: '',
  technology: '',
  lastUpdated: '',
};

export const AddRepoForm = () => {
  const [repo, setRepo] = useState<Repo>(DEFAULT_REPO);

  const {
    repoStore: { createRepo },
  } = useStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRepo({ ...repo, [name]: value });
  };

  const handleSubmit = async () => {
    const res = await createRepo(repo);
    if (res.status === 200) setRepo(DEFAULT_REPO);
  };

  return (
    <Stack spacing={2} w={'100%'} mb={16}>
      <Input
        placeholder="Add repository title"
        value={repo.title || ''}
        name="title"
        onChange={handleChange}
      />
      <Input
        placeholder="Add repository technology"
        value={repo.technology || ''}
        name="technology"
        onChange={handleChange}
      />
      <Input
        placeholder="Add create / update date"
        value={repo.lastUpdated || ''}
        name="lastUpdated"
        onChange={handleChange}
      />
      <Button colorScheme="green" onClick={handleSubmit}>
        Save repository
      </Button>
    </Stack>
  );
};
