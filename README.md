# test

## 本人测试、学习专用项目

## github发布人不识别问题

[官方链接](https://help.github.com/cn/github/using-git/changing-author-info)

```
git filter-branch -f --env-filter '
OLD_EMAIL="错误的邮箱"
OLD_NAME="错误的用户名"
CORRECT_NAME="正确的用户名"
CORRECT_EMAIL="创建项目时的邮箱"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_COMMITTER_NAME" = "$OLD_NAME" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_NAME" = "$OLD_NAME" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```


```
git push --force --tags origin 'refs/heads/*'
```

> 或者
> ```
> git filter-branch -f --env-filter "
> GIT_AUTHOR_NAME='newName';
> GIT_AUTHOR_EMAIL='newEmail';
> GIT_COMMITTER_NAME='newName';
> GIT_COMMITTER_EMAIL='newEmail'
> " HEAD
> ```



> 查看提交日志 `git log`

> 不可逆提交  
> 查找日志 `git log`  
> 还原 `git reset --hard commit ID`  
> 提交 `git push -f`

> 可逆提交  
> 还原某个文件到某次commit `git checkout  commitID fileName`




