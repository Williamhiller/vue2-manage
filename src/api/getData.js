import Axios from '../config/axios';
import qs from 'qs'
/**
 * 登陆
 */

export const login = data => Axios.post('/admin/login', qs.stringify(data), {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
});

/**
 * 退出
 */

export const signout = () => Axios.get('/admin/signout');

/**
 * 获取用户信息
 */

export const getAdminInfo = () => Axios.get('/admin/info');

/**
 * api请求量
 */

export const apiCount = date => Axios.get('/statis/api/' + date + '/count');

/**
 * 所有api请求量
 */

export const apiAllCount = () => Axios.get('/statis/api/count');


/**
 * 获取用户列表
 */

export const getUserList = data => Axios.get('/v1/users/list', data);

/**
 * 获取用户数量
 */

export const getUserCount = data => Axios.get('/v1/users/count', data);
/**
 * 获取用户信息
 */

export const getUserInfo = user_id => Axios.get('/v1/user/' + user_id);

