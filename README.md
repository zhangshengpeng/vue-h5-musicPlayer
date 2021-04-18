# msc

基于vue + muse—ui 写的一套h5端音乐播放器，实现了创建歌单，往歌单中上传音乐，收藏歌单或单曲等功能。
稍微算是下功夫的是，音乐文件的上传实现了大文件的分片上传和断点续传功能。
后端使用了node-id3插件，能够提取所上传的mp3文件文件的如封面、专辑、创作者等id3信息（暂时只支持mp3文件，经过实际测试发现手机QQ音乐app所下载mp3文件无法提取出id3信息）

演示地址(不兼容pc界面，pc上请打开开发这模式，将窗口切换至移动端模式):https://www.zsp.cool/ls
我的邮箱：1612977540@qq.com

手机扫码体验：
![](https://www.zsp.cool/img/23_259_70aebdd2300f053f210c0c5fe8b5b4d7_d293766769c876c3e22301f1e92f18c3.png)

配套后端项目地址：https://gitee.com/zhangshengpengBXH/firstLinuxService.git

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```



