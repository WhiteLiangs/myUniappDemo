

export function auth (apiName, params, content = `没有设置提示文案`) {
  const grant = grantMap[apiName]
  if (!grant) {
    throw Error(
      `未配置[${apiName}]的api授权映射，请与bridge.js中的grantMap添加映射关系！`
    )
  }
  getSetting(grant.scope, {
    success: (isGrant) => {
      if (typeof isGrant === 'boolean' && !isGrant) {
        // 用户若已经不允许授权过了，则引导用户重新授权
        confirm({
          content: content,
          title: '温馨提示',
          options: [{}, {
            callback: _ => {
              openSetting()
            }
          }]
        })
      } else {
        // 若用户未授权过，或者已经授权允许了，则直接调 api
        wx[apiName](params)
      }
    }
  })
}

export default {
  auth
}
