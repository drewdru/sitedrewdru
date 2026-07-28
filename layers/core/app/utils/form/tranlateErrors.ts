export const translateFormErrors = (
  t: (text: string) => string,
  errors?: {name: string, message: string}[],
) => (errors ?? []).map((item) => ({
      ...item,
      message: t(`validation.${item.message}`)
    }))