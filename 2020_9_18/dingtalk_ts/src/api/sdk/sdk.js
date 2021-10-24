import microJssdkCore from '@micro-jssdk/micro-jssdk-core'
import ManageAuthErrorCode from '@micro-jssdk-error-pack/project-thinking'

import { instance } from '@micro-jssdk/project-thinking'
import * as auth from '@micro-jssdk/manage-auth'

// 配置环境
microJssdkCore.setMode('production')
microJssdkCore.setBaseUrl(process.env.VUE_APP_BASE_URL)

// 启用token管理 自动存储服务端 x-stream-id 并在后续的请求中自动添加进header
microJssdkCore.enableToken()

// 注册错误码管理
microJssdkCore.errorCodeManager.addCodeMap(ManageAuthErrorCode)

// 注册请求模块
instance.use(microJssdkCore.getInstance())
auth.instance.use(microJssdkCore.getInstance())
