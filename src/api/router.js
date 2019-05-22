export const ayscRouterMap = [
  {
    'path': '/example',
    'component': 'Layout',
    'redirect': '/example/table',
    'name': 'Example',
    'meta': {
      'title': '案例',
      'icon': 'example'
    },
    'children': [{
      'path': 'table',
      'name': 'Table',
      'component': 'table/index',
      'meta': {
        'title': '表格',
        'icon': 'table'
      }
    }]
  }
]
