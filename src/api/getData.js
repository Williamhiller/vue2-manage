import Axios from '../config/axios';
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
 * 保存文章
 */
export const uploadMyArticle = data => Axios.post('/analyze/upload', data);
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
