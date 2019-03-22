module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 第1个2是指统一缩进2个空格，第2个1是指1倍缩进
    'vue/script-indent': ['error', 2, {'baseIndent': 1}],
    // 函数()前不加空格
    'space-before-function-paren': 0
  },
  // 关闭 vue 文件的缩进检查? 解决 vue 文件 script 标签下代码缩进问题
  overrides: [
    {
      'files': ['*.vue'],
      'rules': {
        'indent': 'off'
      }
    }
  ],
  parserOptions: {
    parser: 'babel-eslint'
  }
}
