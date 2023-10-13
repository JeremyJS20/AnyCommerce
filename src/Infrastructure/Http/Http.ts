import axios, { AxiosStatic } from "axios";

export interface HttpCommonMethods {
  get: (route: string, headers?: any) => Promise<any>;
  // post: (route:string, data:t) => Promise<t>
  // put: (route:string, data:t) => Promise<t>
  // patch: (route:string, data:t) => Promise<t>
}

export type HttpResponse<t> = {
    success: boolean,
    statusCode: number,
    data?: t[] | t,
    message?: string
}

class HttpClient implements HttpCommonMethods {
  private axiosInstance: any | undefined;
  private defaultHeaders = {};

  constructor() {
    this.axiosInstance = axios.create({
        baseURL: "",
        headers: this.defaultHeaders
      });
  };

  get(route: string, headers?: any): Promise<any> {
    return new Promise<HttpResponse<any>>(async (resolve, reject) => {
      try {
        const result = await (this.axiosInstance as AxiosStatic).get(route, {headers: {...this.defaultHeaders, ...headers}});
        resolve({
            success: true,
            statusCode: result.status,
            data: result.data,
            message: ''
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  // post: (route: string, data: t) => Promise<t>
  // put: (route: string, data: t) => Promise<t>
  // patch: (route: string, data: t) => Promise<t>
}

export const HttpClientInstance = new HttpClient();
