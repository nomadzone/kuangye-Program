// 获取小程序的版本信息
const accountInfo = wx.getAccountInfoSync();

// 获取小程序的运行环境
const envVersion = accountInfo.miniProgram.envVersion;

// 根据不同环境做不同处理
switch (envVersion) {
    case 'develop':
        console.log('当前是开发环境 - env');
        // 开发环境的逻辑处理
        break;
    case 'trial':
        console.log('当前是体验版 - env');
        // 体验版的逻辑处理
        break;
    case 'release':
        console.log('当前是正式上线版本 - env');
        // 上线版本的逻辑处理
        break;
    default:
        console.log('未知环境 - env');
        // 未知环境的处理逻辑
        break;
}

export default envVersion