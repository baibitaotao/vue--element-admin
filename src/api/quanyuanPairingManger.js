import request from '@/utils/request'
  
export function stockReserveListStockReserve(data) {
    return request({
      url: '/stockReserve/listStockReserve',
      method: 'post',
      data
    })
  }


export function stockMatchTradeAdd(data) {
    return request({
      url: `/stockMatchTrade/add?reserveId=${data.reserveId}`,
      method: 'post',
      data
    })
  }  