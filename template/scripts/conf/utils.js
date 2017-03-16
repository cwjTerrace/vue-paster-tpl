import { env } from '../../config'
export const iuiAlias = {
  'iConfig': env.assetsPath('src/iconfig'),
  'iMixins': 'i-ui/src/minins',
  'iFiters': 'i-ui/src/fiters',
  'iUtil': 'i-ui/src/utils'
}

export const aliasObject = Object.assign(iuiAlias, {
  'src': env.assetsPath('src'),
  'assets': env.assetsPath('src/assets'),
  'actions': env.assetsPath('src/actions'),
  'components': env.assetsPath('src/components'),
  'units': env.assetsPath('src/units')
})