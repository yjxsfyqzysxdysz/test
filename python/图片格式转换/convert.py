#!python3

import os
from PIL import Image

# 获取文件名列表
imgList = os.listdir("./")
# imgList = os.listdir("F:\\Downloads\\Chrome Downloads\\——")

# 函数：获取文件的后缀长度(例如 jpg 和 jpeg 的长度分别为 3 和 4 )
# def typeNameLengthCount(name):
#	count = 0
#	for i in range(1, len(name)):
#		if(name[-i] == '.'):
#			break
#		else:
#			count += 1
#	return count
# 修改：上面这是原来的代码，后来想起os库有现成的分离文件名和后缀名的函数，于是此自定义函数弃用

# 检查 ./SourceImage 目录是否存在，不存在则创建它
# if (not (os.path.exists("./SourceImage"))):
# 	os.mkdir("./SourceImage")
# 开始遍历文件
for name in imgList:
    try:
        # 尝试打开图片，如果不是可以打开的类型，则忽略（因为需要忽略代码文件本身及后面创建的SourceImage文件夹）
        #type_length = typeNameLengthCount(name)
        # file_type = name[-type_length:] #得到后缀的长度
        # 修改：用库方法替代自定义方法：
        file_name, file_type = os.path.splitext(name)

        if file_type == '.jpg' or file_type == '.jpeg':  # 如果已经是 .jpg 或 .jpeg 类型，则跳过
            continue
        else:
            print(file_name, file_type)
            #img.save("%s.jpg"%(name[0:(-type_length-1)]), 'jpeg')
            # 修改：改用下面这行代码：
            img = Image.open(name)
            img.save("%s.jpg" % (file_name), 'jpeg')

            # 移动原图片，此处用shutil.move( , ) 方法同样可行, 而且这个方法可以实现文件在磁盘间的移动
            os.rename(name, "./SourceImage/%s" % name)
    except IOError:
        print("one file was ignored", file_name)
  