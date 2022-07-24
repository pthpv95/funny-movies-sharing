type ResponseType = 'json' | 'text' | 'blob';
const baseUrl = import.meta.env.VITE_API_HOST;

export class HttpClient {
  private getUrl(relativeUrl: string) {
    return `${baseUrl}${relativeUrl}`;
  }

  getHeader() {
    let token = sessionStorage.getItem('access_token')
    let header = {
      'Content-Type': 'application/json',
    }

    if (!token) {
      return header
    }

    return {
      ...header,
      'Authorization': `Bearer ${token}`
    }
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
        ...this.getHeader()
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
        ...this.getHeader()
      },
      method: 'POST',
    }).then((res) => this.status(res, responseType));
  }

  private status(res: any, responseType: ResponseType) {
    if (!res.ok) {
      if (res.status === 401) {
        sessionStorage.clear();
        window.location.reload();
      }
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
