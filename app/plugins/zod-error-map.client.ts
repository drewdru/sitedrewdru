import { z } from 'zod/v4'
import type { Composer } from 'vue-i18n'

export default defineNuxtPlugin((nuxtApp) => {
  z.config({
    customError: (issue) => {
      const t = (nuxtApp.$i18n as Composer).t

      switch (issue.code) {
        case 'invalid_type':
          if (issue.input === undefined) {
            return t('serverErrors.validation.required')
          }

          return t('serverErrors.validation.invalid_type')

        case 'too_small':
          switch (issue.origin) {
            case 'string':
              return issue.exact
                ? t('serverErrors.validation.string_exact', {
                    minimum: issue.minimum
                  })
                : t('serverErrors.validation.string_min', {
                    minimum: issue.minimum
                  })

            case 'array':
              return issue.exact
                ? t('serverErrors.validation.array_exact', {
                    minimum: issue.minimum
                  })
                : t('serverErrors.validation.array_min', {
                    minimum: issue.minimum
                  })

            case 'number':
            case 'int':
              return t('serverErrors.validation.number_min', {
                minimum: issue.minimum
              })

            case 'date':
              return t('serverErrors.validation.date_min')

            default:
              return t('serverErrors.validation.too_small')
          }

        case 'too_big':
          switch (issue.origin) {
            case 'string':
              return issue.exact
                ? t('serverErrors.validation.string_exact_max', {
                    maximum: issue.maximum
                  })
                : t('serverErrors.validation.string_max', {
                    maximum: issue.maximum
                  })

            case 'array':
              return issue.exact
                ? t('serverErrors.validation.array_exact_max', {
                    maximum: issue.maximum
                  })
                : t('serverErrors.validation.array_max', {
                    maximum: issue.maximum
                  })

            case 'number':
            case 'int':
              return t('serverErrors.validation.number_max', {
                maximum: issue.maximum
              })

            case 'date':
              return t('serverErrors.validation.date_max')

            default:
              return t('serverErrors.validation.too_big')
          }

        case 'invalid_format':
          switch (issue.format) {
            case 'email':
              return t('serverErrors.validation.email')

            case 'url':
              return t('serverErrors.validation.url')

            case 'uuid':
              return t('serverErrors.validation.uuid')

            case 'regex':
              return t('serverErrors.validation.regex')

            case 'datetime':
              return t('serverErrors.validation.datetime')

            case 'date':
              return t('serverErrors.validation.date')

            case 'time':
              return t('serverErrors.validation.time')

            case 'duration':
              return t('serverErrors.validation.duration')

            case 'ipv4':
              return t('serverErrors.validation.ipv4')

            case 'ipv6':
              return t('serverErrors.validation.ipv6')

            case 'cidrv4':
              return t('serverErrors.validation.cidrv4')

            case 'cidrv6':
              return t('serverErrors.validation.cidrv6')

            case 'base64':
              return t('serverErrors.validation.base64')

            case 'jwt':
              return t('serverErrors.validation.jwt')

            case 'starts_with':
              return t('serverErrors.validation.starts_with')

            case 'ends_with':
              return t('serverErrors.validation.ends_with')

            case 'includes':
              return t('serverErrors.validation.includes')

            default:
              return t('serverErrors.validation.invalid_format')
          }

        case 'not_multiple_of':
          return t('serverErrors.validation.not_multiple_of', {
            divisor: issue.divisor
          })

        case 'unrecognized_keys':
          return t('serverErrors.validation.unrecognized_keys')

        case 'invalid_union':
          return t('serverErrors.validation.invalid_union')

        case 'invalid_key':
          return t('serverErrors.validation.invalid_key')

        case 'invalid_element':
          return t('serverErrors.validation.invalid_element')

        case 'invalid_value':
          return t('serverErrors.validation.invalid_value')

        case 'custom':
          return issue.message || t('serverErrors.validation.custom')

        default:
          return undefined
      }
    }
  })
})
