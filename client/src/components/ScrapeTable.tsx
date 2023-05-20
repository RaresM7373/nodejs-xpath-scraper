import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { useStore } from '../hooks/useStore';
import { useEffect } from 'react';
import { Repo } from '../constants/types';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';

const ScrapeTable = () => {
  const {
    repoStore: { getRepos, repos },
  } = useStore();

  useEffect(() => {
    getRepos();
  }, [getRepos]);

  return (
    <TableContainer w={1200} mb={16}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Technology</Th>
            <Th isNumeric>Last Updated</Th>
          </Tr>
        </Thead>
        <Tbody>
          {toJS(repos).map((repo: Repo) => (
            <Tr key={repo.title}>
              <Td>{repo.title}</Td>
              <Td>{repo.technology}</Td>
              <Td isNumeric>{repo.lastUpdated}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default observer(ScrapeTable);
