import { RepoStore } from './RepoStore';

export default class RootStore {
  repoStore: RepoStore;

  constructor() {
    this.repoStore = new RepoStore();
  }
}
