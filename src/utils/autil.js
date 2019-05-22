
// 获取url中的参数
// http://localhost/index.html?q1=abc&q2=efg&q3=h 的url，获取 q1 参数值的方法
// this.url_project_id = getUrlKey("keyValues")
function getUrlKey(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null
}

// url 拼接解析
function appendParams(url, params) {
  var newUrl = url
  if (url.indexOf('?') == -1) {
    newUrl = newUrl + '?'
  } else {
    newUrl = newUrl + '&'
  }
  if ($.isPlainObject(params)) {
    newUrl += $.param(params)
  } else {
    newUrl += params
  }
  return newUrl
}

module.exports = {
  getUrlKey: getUrlKey,
  appendParams: appendParams
}

