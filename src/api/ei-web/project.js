import request from '@/utils/request'

export function projInfoDetailApp(projectId) {
  return request({
    url: `/projInfoDetailApp/${projectId}`,
    method: 'get'
  })
}

