import { makeAutoObservable } from 'mobx';
import { Repo } from '../constants/types';
import repoApi from '../api/RepoApi';

export class RepoStore {
  repos: Repo[] = [];

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  setRepos(data: Repo[]) {
    this.repos = [...data];
  }

  async getRepos() {
    const response = await repoApi.getAll();
    this.setRepos(response.data.repos);
  }

  async createRepo(data: Repo) {
    const response = await repoApi.create(data);
    this.setRepos([...this.repos, data]);
    return response;
  }

  async deleteRepo(name: string) {
    const response = await repoApi.deleteByName(name);
    console.log('response', response);
  }
}
