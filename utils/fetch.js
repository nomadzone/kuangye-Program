import env from './env.js';

const BASE_URL = {
    develop: 'https://www.kuangyeonline.com/api/web',
    trial: 'https://www.kuangyeonline.com/api/web',
    release: '',
}[env]; // 可以将基本URL单独管理

export const prefixUrl = BASE_URL
let timer = null

const httpRequest = (url, method = 'GET', data = null, headers = {}) => {
    if (!BASE_URL) {
        uni.showModal({
            title: '提示',
            content: '环境env不明导致BASE_URL为空'
        });
        return; // Make sure to stop execution if BASE_URL is not set
    }

    return new Promise((resolve, reject) => {
        uni.request({
            url: `${BASE_URL}${url}`, // Combine base URL with endpoint
            method,
            data,
            header: {
                'Content-Type': 'application/json',
                'token': uni.getStorageSync('token'),
                ...headers
            },
            success: (res) => {
                if (res.statusCode === 200) {
                    resolve(res.data);
                } else if (res.statusCode == 401){
                    showModal()
                    reject(res)
                    return
                } {
                    if (res?.data?.msg?.indexOf('重新登录') > -1) {
                        showModal()
                        return
                    }
                    reject(res);
                }
            },
            fail: (err) => {
                console.error('Request Error:', err);
                reject(err);
            }
        });
    });
};

function showModal() {
    // showCancel: false,

    timer && clearTimeout(timer)
    timer = setTimeout(() => {
        uni.showModal({
            title: '提示',
            content: '请先登录',
            success: (res) => {
                if (res.confirm) {
                    uni.navigateTo({
                        url: '/pages/login/index'
                    })
                }
            },
            fail: () => {
            console.log('showModal fail')
                }
            })
    }, 1500)
    
}

// GET 方法封装
export const get = (url, data, headers = {}) => {
    return httpRequest(url, 'GET', data, headers);
};

// POST 方法封装
export const post = (url, data, headers = {}) => {
    return httpRequest(url, 'POST', data, headers);
};

// PUT 方法封装
export const put = (url, data, headers = {}) => {
    return httpRequest(url, 'PUT', data, headers);
};

// DELETE 方法封装
export const del = (url, headers = {}) => {
    return httpRequest(url, 'DELETE', null, headers);
};
