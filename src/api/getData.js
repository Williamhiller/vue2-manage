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
 * 获取用户数量
 */

export const getUserCount = data => Axios.get('/v1/users/count', data);


