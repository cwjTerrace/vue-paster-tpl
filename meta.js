module.exports = {
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "项目名称"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "项目描述",
      "default": "A vue-parster-tpl project"
    },
    "author": {
      "type": "string",
      "message": "作者"
    },
    "cdn": {
      "type": "list",
      "message": "使用cdn资源",
      "choices": [
        "yes",
        "no"
      ]
    },
    "vuex": {
      "type": "list",
      "message": "状态管理机(vuex)",
      "choices": [
        "yes",
        "no"
      ]
    },
    "growingIO": {
      "type": "list",
      "message": "GrowingIO(埋点)",
      "choices": [
        "yes",
        "no"
      ]
    },
    "analytics": {
      "type": "list",
      "message": "灰灰的网络监控",
      "choices": [
        "yes",
        "no"
      ]
    },
    "extends": {
      "type": "checkbox",
      "message": "选择您需要的扩展",
      "choices": [
        "swiper",
        "pixi"
      ]
    }
  },
  "filters": {
    "node_modules/**": false,
    "src/stores/*.js": "vuex === 'yes'"
  },
  "skipInterpolation": "src/**/*.vue",
  'completeMessage': 'cd {{destDirName}}\n'
}