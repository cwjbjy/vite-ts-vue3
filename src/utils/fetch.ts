import qs from 'qs';

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
    let conf = {};
    let data = '';

    //增加token
    const token = localStorage.getItem(TOKEN);
    const headers = Object.assign(
      {},
      {
        authorization: `Bearer ${token}`,
      },
    );

    if (method === 'GET' || method === 'DELETE') {
      //fetch对GET请求等，不支持将参数传在body上，只能拼接url
      data = qs.stringify(params, {
        arrayFormat: 'repeat',
      }) as string;
      url = `${url}?${data}`;
    } else {
      //非form-data传输JSON数据格式
      if (!['[object FormData]', '[object URLSearchParams]'].includes(Object.prototype.toString.call(params))) {
        Object.assign(headers, { 'Content-Type': 'application/json' });
        data = JSON.stringify(params);
      }
      conf = {
        body: data,
      };
    }
    return {
      url,
      options: Object.assign(
        {},
        {
          method,
          headers,
        },
        conf,
      ),
    };
  }

  /**
   * 响应拦截器
   */
  interceptorsResponse(res: Response) {
    return new Promise((resolve, reject) => {
      if (res.ok) {
        try {
          return resolve(res.json());
        } catch {
          return resolve({
            status: 'ok',
          });
        }
      } else {
        const { status } = res;
        /* token过期，重定向到首页 */
        if ([CODE_TOKEN_EXPIRED].includes(status)) {
          window.location.href = LOGIN;
        }
      }
      console.error('网络错误，请稍后重试');
      reject(res);
    });
  }

  /**
   * 代理模式
   */
  async httpFactory({ url = '', params = {}, method }: Props) {
    const req = await this.interceptorsRequest({
      url: baseURL + url,
      method,
      params,
    });
    const res = await fetch(req.url, req.options); //网络请求
    const rst = await this.interceptorsResponse(res);
    return rst;
  }

  /**
   * 适配器模式
   */
  async get(url: string, params?: Record<string, any>): Promise<any> {
    return await this.httpFactory({
      url,
      params,
      method: 'GET',
    });
  }

  async post(url: string, params?: Record<string, any>): Promise<any> {
    return await this.httpFactory({
      url,
      params,
      method: 'POST',
    });
  }

  async put(url: string, params?: Record<string, any>): Promise<any> {
    return await this.httpFactory({
      url,
      params,
      method: 'PUT',
    });
  }

  async delete(url: string, params?: Record<string, any>): Promise<any> {
    return await this.httpFactory({
      url,
      params,
      method: 'DELETE',
    });
  }

  async patch(url: string, params?: Record<string, any>): Promise<any> {
    return await this.httpFactory({
      url,
      params,
      method: 'PATCH',
    });
  }
}

export default new FetchClient();
