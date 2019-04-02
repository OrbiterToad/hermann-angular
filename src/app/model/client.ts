import {Image} from './image';

export class Client {
  id: number;
  name: string;

  nickname: string;
  pcUser: string;
  os: string;
  ip: string;
  clientArch: string;
  command: string;
  lastseen: string;

  images: Image[];
}
