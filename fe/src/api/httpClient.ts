type ResponseType = 'json' | 'text' | 'blob';
const baseUrl = 'http://localhost:3001';

export class HttpClient {
  private getUrl(relativeUrl: string) {
    return `${baseUrl}${relativeUrl}`;
  }

  public get(
    relativeUrl: string,
    headers = {},
    responseType: ResponseType = 'json'
  ) {
    return fetch(this.getUrl(relativeUrl), {
      credentials: 'include',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    }).then((res) => this.status(res, responseType));
  }

  public post(
    relativeUrl: string,
    body: object,
    headers = {},
    responseType: ResponseType = 'json'
  ) {
    return fetch(this.getUrl(relativeUrl), {
      body: JSON.stringify(body),
      credentials: 'include',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then((res) => this.status(res, responseType));
  }

  private status(res: any, responseType: ResponseType) {
    if (!res.ok) {
      throw res
    }
    if (responseType === 'text') {
      return res.text();
    }

    if (responseType === 'blob') {
      return res.blob();
    }

    return res.json();
  }
}

export const httpClient = new HttpClient();
