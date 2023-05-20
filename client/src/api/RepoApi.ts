import { ApiService } from '.';
import { Repo } from '../constants/types';

class RepoApi extends ApiService<Repo> {
  deleteByName(name: string) {
    return this.api.delete(`${this.url}/${name}`);
  }
}
const repoApi = new RepoApi('repo');

export default repoApi;
