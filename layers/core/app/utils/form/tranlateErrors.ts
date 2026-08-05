export const translateFormErrors = (
  t: (text: string) => string,
  errors?: { name: string, message: string }[]
) => (errors ?? []).map(item => ({
  ...item,
  message: t(`validation.${item.message}`)
}))

export const translateServerErrors = (
  t: (text: string) => string,
  statusCode: number | undefined,
  errorCode: string | undefined
) => {
  switch (statusCode) {
    case 400:
      return {
        title: t('VALIDATION_ERROR'),
        description: t(errorCode ? `validation.${errorCode}` : 'SomethingWentWrong')
      }
    case 403:
      return {
        title: t('FORBIDDEN_ERROR'),
        description: t(errorCode ?? 'SomethingWentWrong')
      }
    case 404:
      return {
        title: t('VALIDATION_ERROR'),
        description: t(errorCode ?? 'SomethingWentWrong')
      }
    case 500:
      return {
        title: t('INTERNAL_SERVER_ERROR'),
        description: t(errorCode ?? 'SomethingWentWrong')
      }
    default:
      return {
        title: t('Error'),
        description: t(errorCode ?? 'SomethingWentWrong')
      }
  }
}
