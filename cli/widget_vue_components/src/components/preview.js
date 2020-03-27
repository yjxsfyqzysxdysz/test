// import axios from 'axios'
export const openFlow = async (pluginDom, data) => {
  console.log('data', data)
  // 本级预览开流
  // {devIp: "192.168.20.36", devPort: 3721, channel: 1, streamType: "main"}
  let obj = {
    devIp: data.devIp,
    devPort: data.devPort,
    dport: data.dport,
    channel: data.channel,
    streamType: data.streamType || 'main'
  }
  // 给插件传参
  // let params = {
  //   port: "6003",
  //   ip: "192.168.20.7",
  //   cmdStr: "{\"streamType\":\"main\",\"devIp\":\"192.168.20.42\",\"channel\":1,\"devPort\":\"3721\"}"
  // }
  let params = {
    port: "6003",
    ip: "192.168.20.7",
    cmdStr: JSON.stringify(obj)
  }
  return pluginDom.OpenRealStreamEx(JSON.stringify(params))
}