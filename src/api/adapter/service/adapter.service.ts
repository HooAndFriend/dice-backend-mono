// ** Nest Imporst
import { Injectable } from '@nestjs/common';

// ** Axios Imports
import axios, { AxiosInstance } from 'axios';

@Injectable()
export default class AdapterService {
  private API: AxiosInstance;

  constructor() {
    this.API = axios.create({});
  }
}
