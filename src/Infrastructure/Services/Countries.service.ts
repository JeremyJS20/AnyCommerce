import {
  HttpClientInstance,
  HttpCommonMethods,
  HttpResponse,
} from "../Http/Http";

interface CountriesHttpMethods extends HttpCommonMethods {
    getStates: (countryCode: string) => Promise<any>;
    getCities: (countryCode: string, stateCode: string) => Promise<any>;
    getCountryStates: (isoCode: string) => Promise<any>;
}

class Countries implements CountriesHttpMethods {
    private apiKey = 'WGlUTU9WY2pPN0drellMcDRQSWVSZjJmNXZxc0NxS255b21DT3NvTA==';
    

  get<t>() {
    return new Promise<HttpResponse<t>>(async (resolve, reject) => {
      try {
        const result: HttpResponse<t> = await HttpClientInstance.get(
          "https://api.countrystatecity.in/v1/countries",
          {
            "X-CSCAPI-KEY": this.apiKey,
          }
        );

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  getStates<t>(countryCode: string) {
    return new Promise<HttpResponse<t>>(async (resolve, reject) => {
      try {
        const result: HttpResponse<t> = await HttpClientInstance.get(
          `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
          {
            "X-CSCAPI-KEY": this.apiKey,
          }
        );

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  getCities<t>(countryCode: string, stateCode: string) {
    return new Promise<HttpResponse<t>>(async (resolve, reject) => {
      try {
        const result: HttpResponse<t> = await HttpClientInstance.get(
          `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
          {
            "X-CSCAPI-KEY": this.apiKey,
          }
        );

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  getCountryStates<t>(isoCode: string) {
    return new Promise<HttpResponse<t>>(async (resolve, reject) => {
      try {
        const result: HttpResponse<t> = await HttpClientInstance.get(
          `https://api.countrystatecity.in/v1/countries/${isoCode}/states`,
          {
            "X-CSCAPI-KEY": this.apiKey,
          }
        );

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export const CountriesService = new Countries();
