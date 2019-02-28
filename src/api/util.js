import request from '@/utils/request'

export function getQiniuToken(params) {
  	return request({
	    url: 'http://www.lunzi.online/utils/getQiniuToken.json',
	    method: 'get',
	    params
  	})
}


