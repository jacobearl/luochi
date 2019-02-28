import request from '@/utils/request'

//获取左侧菜单
export function APIGetCommonMenu(params) { 
  	return request({
	    url: '/common/menu',
	    method: 'get',
	    params
  	})
}
// 获取生产线列表
export function APIGetProlineList(params) { 
    return request({
        url: '/pro_line/list',
        method: 'get',
        params
    })
}
// 根据生产线id获取生产线实时数据
export function APIGetProlineRealtime(params) { 
    return request({
        url: '/pro_line/real_time',
        method: 'get',
        params
    })
}
// 根据生产线id获取生产线k线
export function APIGetProlineKData(params) { 
    return request({
        url: '/pro_line/k_data',
        method: 'get',
        params
    })
}

// 根据设备名获取设备k线
export function APIGetEquipmentKData(params) { 
    return request({
        url: '/equipment/k_data',
        method: 'get',
        params
    })
}

// 根据设备名获取设备实时数据
export function APIGetEquipmentRealtime(params) { 
    return request({
        url: '/equipment/real_time',
        method: 'get',
        params
    })
}





export function sendProjectRemind(data) {
    return request({
        url: '/backManage/sendProjectRemind',
        method: 'post',
        data
    })
}





