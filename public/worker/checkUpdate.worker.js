const portList = []; // 存储端口
const visiblePorts = []; //存储页面可见情况
let intervalId = null;

// eslint-disable-next-line no-undef
onconnect = function (e) {
  const port = e.ports[0];
  // 存储端口
  portList.push(port);

  // 监听port推送
  port.onmessage = async function (e) {
    // 取数据
    const data = e.data || {};
    const type = data.type || '';

    switch (type) {
      case 'init':
        //初始化时，visibilitychange不会触发，需主动添加一条
        visiblePorts.push(true);
        break;
      case 'start': //开启轮询
        visiblePorts.push(true);
        if (intervalId !== null) {
          clearInterval(intervalId);
        }
        intervalId = setInterval(() => {
          getETag().then((etag) => {
            sendMessage({
              type: 'reflectGetEtag',
              data: etag,
            });
          });
        }, 3000);
        break;
      case 'stop': //停止轮询
        visiblePorts.shift();
        if (intervalId !== null && visiblePorts.length === 0) {
          clearInterval(intervalId);
          intervalId = null;
        }
        break;
      case 'close': //关闭当前端口
        {
          const index = portList.indexOf(port);
          if (index > -1) {
            portList.splice(index, 1);
          }
        }
        break;
      case 'getEtag': //立即获取ETag
        {
          const data = await getETag();
          sendMessage({
            type: 'reflectGetEtag',
            data,
          });
        }
        break;
      default:
        sendMessage({ type: 'error', message: 'Unknown message type' });
        break;
    }
  };
};

// 发送消息
function sendMessage(message) {
  portList.forEach((port) => {
    port.postMessage(message);
  });
}

const getETag = async () => {
  try {
    const response = await fetch(location.origin, {
      method: 'HEAD',
      cache: 'no-cache',
    });

    return response.headers.get('etag') || response.headers.get('last-modified');
  } catch (error) {
    throw new Error(`Fetch failed: ${error.message}`);
  }
};
