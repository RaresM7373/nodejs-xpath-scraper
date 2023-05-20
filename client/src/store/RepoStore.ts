import { makeAutoObservable } from 'mobx';
import { Repo } from '../constants/types';
import repoApi from '../api/RepoApi';

export class RepoStore {
  repos: Repo[] = [];

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  async getRepos() {
    const response = await repoApi.getAll();
    this.repos = response.data;
  }
}
