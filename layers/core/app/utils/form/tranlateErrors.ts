export const translateFormErrors = (
  t: (text: string) => string,
  errors?: { name: string, message: string }[]
) => (errors ?? []).map(item => ({
  ...item,
  message: t(`serverErrors.validation.${item.message}`)
}))

export const translateServerErrors = (
  t: (text: string) => string,
  statusCode: number | undefined,
  errorCode: string | undefined
) => {
  switch (statusCode) {
    case 400:
      return {
        title: t('serverErrors.validation.VALIDATION_ERROR'),
        description: t(errorCode ? `serverErrors.validation.${errorCode}` : 'SomethingWentWrong')
      }
    case 403:
      return {
        title: t('serverErrors.forbidden.FORBIDDEN_ERROR'),
        description: t(errorCode ? `serverErrors.forbidden.${errorCode}` : 'SomethingWentWrong')
      }
    case 404:
      return {
        title: t('serverErrors.validation.VALIDATION_ERROR'),
        description: t(errorCode ? `serverErrors.notFound.${errorCode}` : 'SomethingWentWrong')
      }
    case 409:
      return {
        title: t('serverErrors.conflict.CONFLICT_ERROR'),
        description: t(errorCode ? `serverErrors.conflict.${errorCode}` : 'SomethingWentWrong')
      }
    case 500:
      return {
        title: t('serverErrors.internal.INTERNAL_SERVER_ERROR'),
        description: t(errorCode ? `serverErrors.internal.${errorCode}` : 'SomethingWentWrong')
      }
    default:
      return {
        title: t('Error'),
        description: t('SomethingWentWrong')
      }
  }
}
