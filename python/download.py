# coding=utf-8
import requests
import urllib
import json
import jsonpath
import datetime
import os

# 导入模块库类似各种工具，有些是Python系统自带的，有些需要另外安装，在cmd命令行下
# pip install <模块库名称> 即可自动下载安装，之后再代码里 import 就可以调用了。

dayTime = datetime.datetime.now().strftime('%m%d')
hourTime = datetime.datetime.now().strftime('%H%M%S')
filename0 = str(dayTime)
dirs = './SourceImage/' + filename0 + '/'
# 根据系统时间定义时间戳，作用是利用时间戳来命名保存文件夹
if (not (os.path.exists("./SourceImage"))):
	os.mkdir("./SourceImage")
if (not (os.path.exists(dirs))):
	os.mkdir(dirs)

url = 'https://iien.cn/api/buyingshow/api'
# 采集地址，这是个典型的json接口，如果换其他网址，下列的代码也需要相应调整
ex_headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:23.0) Gecko/20100101 Firefox/23.0' }
# 模拟浏览器请求数据，因为有些服务器地址只针对浏览器的请求，其他的请求不返回数据
qq = requests.get(url, headers=ex_headers).text
# 请求得到text文本格式
ss = json.loads(qq)
# 将text 文本格式转为json格式（树形目录格式）
sss = jsonpath.jsonpath(ss, '$..data[*].pics[*].path')
# 查询data分支下,  所有包含pics分支的对象，获取该对象内path对应的值（图片的url）
names = jsonpath.jsonpath(ss, '$..data[*].title')
# 和上条语法相同，只是查询的 每组图片的标题

print(sss)
# for i in sss:
#   urllib.request.urlretrieve(i, dirs+filename0+i[-20:])
# sss 是获取的所有图片url 列表集合，再次依次请求下载sss内所有url
# i--每条url , dirs+filename0--开头定义过的保存路径，i[-20:]--url地址倒数20位字符作为图片名。

for var in names:
  print('采集', '【', var, '】', '成功')  # 输出下载集合名
print('共下载', len(sss), '张')  # 查询总下载张数
