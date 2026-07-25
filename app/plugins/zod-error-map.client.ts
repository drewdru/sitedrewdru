import { z } from 'zod/v4'
import type { Composer } from 'vue-i18n'

export default defineNuxtPlugin((nuxtApp) => {
  z.config({
    customError: (issue) => {
      const t = (nuxtApp.$i18n as Composer).t

      switch (issue.code) {
        case 'invalid_type':
          if (issue.input === undefined) {
            return t('validation.required')
          }

          return t('validation.invalid_type')

        case 'too_small':
          switch (issue.origin) {
            case 'string':
              return issue.exact
                ? t('validation.string_exact', {
                    minimum: issue.minimum
                  })
                : t('validation.string_min', {
                    minimum: issue.minimum
                  })

            case 'array':
              return issue.exact
                ? t('validation.array_exact', {
                    minimum: issue.minimum
                  })
                : t('validation.array_min', {
                    minimum: issue.minimum
                  })

            case 'number':
            case 'int':
              return t('validation.number_min', {
                minimum: issue.minimum
              })

            case 'date':
              return t('validation.date_min')

            default:
              return t('validation.too_small')
          }

        case 'too_big':
          switch (issue.origin) {
            case 'string':
              return issue.exact
                ? t('validation.string_exact_max', {
                    maximum: issue.maximum
                  })
                : t('validation.string_max', {
                    maximum: issue.maximum
                  })

            case 'array':
              return issue.exact
                ? t('validation.array_exact_max', {
                    maximum: issue.maximum
                  })
                : t('validation.array_max', {
                    maximum: issue.maximum
                  })

            case 'number':
            case 'int':
              return t('validation.number_max', {
                maximum: issue.maximum
              })

            case 'date':
              return t('validation.date_max')

            default:
              return t('validation.too_big')
          }

        case 'invalid_format':
          switch (issue.format) {
            case 'email':
              return t('validation.email')

            case 'url':
              return t('validation.url')

            case 'uuid':
              return t('validation.uuid')

            case 'regex':
              return t('validation.regex')

            case 'datetime':
              return t('validation.datetime')

            case 'date':
              return t('validation.date')

            case 'time':
              return t('validation.time')

            case 'duration':
              return t('validation.duration')

            case 'ipv4':
              return t('validation.ipv4')

            case 'ipv6':
              return t('validation.ipv6')

            case 'cidrv4':
              return t('validation.cidrv4')

            case 'cidrv6':
              return t('validation.cidrv6')

            case 'base64':
              return t('validation.base64')

            case 'jwt':
              return t('validation.jwt')

            case 'starts_with':
              return t('validation.starts_with')

            case 'ends_with':
              return t('validation.ends_with')

            case 'includes':
              return t('validation.includes')

            default:
              return t('validation.invalid_format')
          }

        case 'not_multiple_of':
          return t('validation.not_multiple_of', {
            divisor: issue.divisor
          })

        case 'unrecognized_keys':
          return t('validation.unrecognized_keys')

        case 'invalid_union':
          return t('validation.invalid_union')

        case 'invalid_key':
          return t('validation.invalid_key')

        case 'invalid_element':
          return t('validation.invalid_element')

        case 'invalid_value':
          return t('validation.invalid_value')

        case 'custom':
          return issue.message || t('validation.custom')

        default:
          return undefined
      }
    }
  })
})
