import type { AliasToken } from 'antd/es/theme/internal'

import colorConfig from './colorConfig'

const token: Partial<AliasToken> | undefined = {
  colorPrimary: colorConfig.rsa.primaryDark,
  colorSuccess: colorConfig.semantic.success,
  colorWarning: colorConfig.semantic.warning,
  colorError: colorConfig.semantic.error,
  colorInfo: colorConfig.semantic.information,
  colorInfoBg: colorConfig.semantic.informationBG,
  colorSuccessBg: colorConfig.semantic.successBG,
  colorWarningBg: colorConfig.semantic.warningBG,
  colorErrorBg: colorConfig.semantic.errorBG,
}

export const themeColor = colorConfig
export default token
