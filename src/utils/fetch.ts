import queryString from 'query-string';

import { CODE_TOKEN_EXPIRED } from '@/settings/code';
import { TOKEN } from '@/settings/localStorage';
import { LOGIN } from '@/settings/routerMap';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface Props {
  url: string;
  method: Method;
  params?: Record<string, any>;
}

const baseURL = import.meta.env.VITE_APP_BASEURL;

class FetchClient {
  /**
   * 请求拦截器
   */
  interceptorsRequest({ url, method, params }: Props) {
    let data = '';

    //增加token
    const headers = {
      authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
    };

    if (method === 'GET' || method === 'DELETE') {
      //fetch对GET请求等，不支持将参数传在body上，只能拼接url
      if (params) {
        data = queryString.stringify(params);
        url = `${url}?${data}`;
      }
    } else {
      //非form-data传输JSON数据格式
      if (!['[object FormData]', '[object URLSearchParams]'].includes(Object.prototype.toString.call(params))) {
        Object.assign(headers, { 'Content-Type': 'application/json' });
        data = JSON.stringify(params);
      }
    }

    const options = {
      method,
      headers,
      body: method !== 'GET' && method !== 'DELETE' ? data : undefined,
    };

    return {
      url: baseURL + url,
      options,
    };
  }

  /**
   * 响应拦截器
   */

  interceptorsResponse<T>(res: Response): Promise<T> {
    if (res.ok) {
      return res.json() as Promise<T>;
    } else {
      const { status } = res;
      /* token过期，重定向到首页 */
      if ([CODE_TOKEN_EXPIRED].includes(status)) {
        window.location.href = LOGIN;
      }
      throw new Error('Request failed');
    }
  }

  /**
   * 代理模式
   */
  async httpFactory<T>({ url = '', params = {}, method }: Props): Promise<T> {
    const req = this.interceptorsRequest({
      url,
      method,
      params,
    });
    const res = await fetch(req.url, req.options); //网络请求
    return this.interceptorsResponse(res);
  }

  async request<T>(method: Method, url: string, params?: Record<string, any>): Promise<T> {
    return this.httpFactory<T>({ url, params, method });
  }

  /**
   * 适配器模式
   */
  get<T>(url: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>('GET', url, params);
  }

  post<T>(url: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>('POST', url, params);
  }

  put<T>(url: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>('PUT', url, params);
  }

  delete<T>(url: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>('DELETE', url, params);
  }

  patch<T>(url: string, params?: Record<string, any>): Promise<T> {
    return this.request<T>('PATCH', url, params);
  }
}

export default new FetchClient();
