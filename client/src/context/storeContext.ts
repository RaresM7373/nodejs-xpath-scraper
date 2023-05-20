import { createContext } from 'react';
import RootStore from '../store/RootStore';

export const storeContext = createContext<RootStore>(new RootStore());
