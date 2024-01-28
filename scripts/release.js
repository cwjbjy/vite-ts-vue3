import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filenameNew = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filenameNew);

//执行git命令，获取当前 HEAD 指针所指向的提交的完整哈希值，并通过substring取前十个数字或字母
const hash = execSync('git rev-parse HEAD', { cwd: path.resolve(__dirname, '../') })
  .toString()
  .trim()
  .substring(0, 10);

//版本号：时间戳+git的hash值
const version = Date.now() + '_' + hash;

//.env.production文件路径
const envFile = path.join(__dirname, '../.env.production');

//读取目标文件，并通过正则判断.env.production文件中是否有VITE_APP_VERSION开头的环境变量
try {
  const data = fs.readFileSync(envFile, {
    encoding: 'utf-8',
  });
  const reg = /VITE_APP_VERSION=\d+_[\w-_+:]{7,14}/g;
  const releaseStr = `VITE_APP_VERSION=${version}`;
  let newData = '';
  if (reg.test(data)) {
    newData = data.replace(reg, releaseStr);
    fs.writeFileSync(envFile, newData);
  } else {
    newData = `${data}\n${releaseStr}`;
    fs.writeFileSync(envFile, newData);
  }
  console.log(`插入release版本信息到env完成，版本号：${version}`);
} catch (e) {
  console.error(e);
}
