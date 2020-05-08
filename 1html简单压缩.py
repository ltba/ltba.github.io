import os
import re

total = 0

def getFiles(dir, suffix):
    res = []
    for root, directory, files in os.walk(dir):
        for filename in files:
            name, suf = os.path.splitext(filename)
            if suf == suffix:
                res.append(os.path.join(root, filename))
    return res

def delete(string):
    res = string.replace("\n","")
    return res

for file in getFiles(r"D:\blog\public", '.html'):
    if file == r"D:\blog\public\404.html":
        print("404.html没有压缩！")
        continue
    if file == r"D:\blog\public\JavaScript.html":
        print("JavaScript.html没有压缩")
        continue
    if file == r"D:\blog\public\JavaScript-站长通道.html":
        print("JavaScript-站长通道.html没有压缩")
        continue
    if file == r"D:\blog\public\music\index.html":
        print("music/没有压缩")
        continue
    if file == r"D:\blog\public\zwdzjs\index.html":
        print("植物大战僵尸/没有压缩")
        continue
    if file == r"D:\blog\public\html.html":
        print("html.html/没有压缩")
        continue
    
    path = file.replace("\\","\\\\")

    long = 0
    short = 0
    
    text_list = []
    with open(path,"r",encoding="UTF-8") as f:
        
        Not_Change = False
        for each in f.readlines():
            long += len(each)

            if "<script" in each and "</script>" in each:
                text_list.append(each)
                continue

            if "<style" in each and "</style>" in each:
                text_list.append(each)
                continue
                
            if "<script" in each:
                Not_Change = True
                text_list.append(each)
                continue

            if "</script>" in each:
                Not_Change = False
                text_list.append(delete(each))
                continue

            if "<style" in each:
                Not_Change = True
                text_list.append(each)
                continue

            if "</style>" in each:
                Not_Change = False
                text_list.append(delete(each))
                continue
            
            
            if Not_Change:
                text_list.append(each)
            else:
                text_list.append(delete(each))

    with open(path,"w",encoding="UTF-8") as f:
        rep=""
        for each in text_list:
            rep+=each
        rep=re.sub("<!--.*?-->","",rep,flags=re.S)
        short += len(rep)
        f.write(rep)
        
    print(file + "   压缩完成！一共节省了" + str(long-short) + "个字符！")
    total += long-short

total=total/1024
print("本次压缩共节省了%sK" %total)
input("回车退出！")
