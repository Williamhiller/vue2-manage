import Axios from '../config/axios';

let parseParams = function (params) {
    let queryAll = '';
    for(let key in params) {
        let queryItem = key + '=' + params[key];
        if(params[key]) {
            // 为空则前缀为？ 不为空则添加&
            queryAll += (queryAll === '')? '?' : '&';
            queryAll += queryItem;
        }
    }
    return queryAll
};
/**
 * 登陆
 */
export const login = data => Axios.post('/admin/login', data);

/**
 * 退出
 */

export const signout = () => Axios.get('/admin/signout');

/**
 * 获取用户信息
 */

export const getAdminInfo = () => Axios.get('/admin/info');
/**
 * 保存文章
 */
export const uploadArticle = data => Axios.post('/article/upload', data);
/**
 * 保存分析
 */
export const getCodeData = code => Axios.get(`/analyze/qiutan/${code}`);
/**
 * 删除分析
 */
export const deleteAnalyze = code => Axios.delete(`/analyze/delete/${code}`);
/**
 * 获取分析内容
 */
export const getAnalyzeList = data => Axios.get(`/analyze/list` + parseParams(data));
/**
 * 获取比赛列表
 */
export const getMatchList = () => Axios.get(`/match/list`);
/**
 * 获取分析内容
 */
export const getAnalyzeByCode = code => Axios.get(`/analyze/${code}`);
/**
 * 保存分析
 */
export const uploadAnalyze = data => Axios.post('/analyze/upload', data);
/**
 * 复盘
 */
export const uploadReplay = data => Axios.post('/analyze/replay', data);
/**
 * api请求量
 */

export const apiCount = data => Axios.get('/statis/api/' + data + '/count');

/**
 * 获取用户列表
 */

export const getUserList = data => Axios.get('/v1/users/list', data);

/**
 * 获取推送信息
 */

export const getPushList = () => Axios.get('/push/list',);

/**
 *  创建推送信息
 */

export const setPush = data => Axios.post('/push/set', data);
/**
 *  创建推送信息
 */

export const deletePush = id => Axios.delete(`/push/delete/${id}`);
/**
 *  开启或关闭
 */

export const changeSwitch = data => Axios.post(`/push/toggle`, data);
