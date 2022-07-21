# Excel 工作表编辑密码位数为12位 范围是AAAAAAAAAAA (注意A后面有个空格)至BBBBBBBBBBB~ 拥有194560个组合
# 支持xlsx, 支持wps
# 原理:
# 在保护工作表或者工作簿时，如果你设置了密码（图2），那么无论该密码的长度是多少，Excel都会将其转换成包含12个字符的特殊序列，并将这个经过转换的密码保存在Excel中。因此，虽然很难猜测出原始密码，但我们可以分析这12个字符序列。
# 假如Excel将所设置的密码转换后与包含12个字符的序列匹配，那么就相当于获取了原来由密码所限制的权限，实际上就是破解了设置的密码。也就是说，你设置的密码是什么都没有关系，存储在Excel中的实际上就是这12个字符序列组合之一。由于这12个字符可以组合成大约200000个（95*2 ^ 11 = 194560）不同的序列，可以通过遍历这些序列来破解密码，实际上是解除Excel给用户设置的限制。


import win32com.client

a = []
b = []
c = []
ProtectPass = []
for i in range(2048):
   # 生成2^11次的组合列表，因为11位密码有2^11种排列组合方式，将排列组合列表作为成员添加到列表中，此时生成的是二进制0和1
  a.append(list('{:011b}'.format(i)))
# print(a)
for i in a:  # 遍历列表中的所有组合
   for j in i:  # 对排列组合列表中的各个成员值进行遍历
    b.append(int(j)+65)  # 对各个成员进行加65操作 0加65等于本身 1加65=66
  c.append(b)  # 生成包含65和66的所有排列可能
  b = []
for k in c:  # 对所有的排列可能进行遍历 得到每组排列组合的列表形式
      # print(k)
  m = list(k)  # 转换成列表
  m.append(0)  # 末尾再加一组成员0，因为要对其进行复制，末尾成员的值范围不是65或者66
   for n in range(32, 127):
    m[len(m)-1] = n  # 末尾成员的赋值，范围是32-126
    # print(m)
    list2 = [chr(i) for i in m]  # 将int类型转化成ascii码，也就是字符
    str = ''.join(list2)  # 将字符列表转成字符串
    ProtectPass.append(str)  # 最后将每一串字符串作为列表成员放入列表 方便破解密码

xlsx = win32com.client.Dispatch('Excel.Application')  # 获得Excel对象
# 这里的Password是Excel文件打开密码 也可以使用穷举
wb = xlsx.Workbooks.Open(r'C:\Users\Administrator\Desktop\hello.xlsx', False, False, None, Password=\"\")
xlsx.Visible = True  # 是否可见Excel界面
ws = wb.Sheets[1]  # 获取第二张工作表，因为我设置了第二张工作表里面 第一张表则填0
# 如果是需要跑活动工作表的密码 可以使用 wb.ActiveSheet
for EditPass in ProtectPass:
   try:
    ws.Unprotect(EditPass)
    print(f\"成功了 密码是{EditPass}\") # 成功以后则直接跳出
     break
  except:  # 出现异常就代表密码错误  此时需要无视异常继续试下一个密码
     continue
