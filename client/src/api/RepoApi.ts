import { ApiService } from '.';
import { Repo } from '../constants/types';

class RepoApi extends ApiService<Repo> {}
const repoApi = new RepoApi('repo');

export default repoApi;
