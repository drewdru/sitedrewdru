export default {
  Error: 'Error',
  ErrorLoadingData: 'Error loading data',
  SomethingWentWrong: 'Something went wrong..',
  SomethingWentWrongReloadPage: 'Something went wrong. Try to reload page.',

  serverErrors: {
    internal: {
      INTERNAL_SERVER_ERROR: 'Something went wrong..'
    },

    forbidden: {
      FORBIDDEN_ERROR: 'Forbidden',
      INVALID_SESSION: 'Access to certain features has been temporarily restricted',
    },

    notFound: {
      NOT_FOUND: 'Not found',
      ROOM_NOT_FOUND: 'This room is no longer available'
    },

    conflict: {
      CONFLICT_ERROR: 'Conflict',
      ROOM_IS_FULL: 'Room is full'
    },

    validation: {
      VALIDATION_ERROR: 'Incorrect data',

      required: 'This field is required',
      invalid_type: 'Invalid value',

      too_small: 'Value is too small',
      too_big: 'Value is too large',

      string_min: 'Minimum length: {minimum} characters',
      string_max: 'Maximum length: {maximum} characters',
      string_exact: 'Length must be exactly {minimum} characters',
      string_exact_max: 'Length must be exactly {maximum} characters',

      array_min: 'Minimum number of items: {minimum}',
      array_max: 'Maximum number of items: {maximum}',
      array_exact: 'Number of items must be exactly {minimum}',
      array_exact_max: 'Number of items must be exactly {maximum}',

      number_min: 'Minimum value: {minimum}',
      number_max: 'Maximum value: {maximum}',

      date_min: 'Date is too early',
      date_max: 'Date is too late',

      invalid_format: 'Invalid format',
      email: 'Please enter a valid email address',
      url: 'Please enter a valid URL',
      uuid: 'Invalid UUID',
      regex: 'Invalid format',
      datetime: 'Invalid date and time',
      date: 'Invalid date',
      time: 'Invalid time',
      duration: 'Invalid duration',
      ipv4: 'Invalid IPv4 address',
      ipv6: 'Invalid IPv6 address',
      cidrv4: 'Invalid IPv4 network',
      cidrv6: 'Invalid IPv6 network',
      base64: 'Invalid Base64 string',
      jwt: 'Invalid JWT token',
      starts_with: 'Value must start with the specified text',
      ends_with: 'Value must end with the specified text',
      includes: 'Value must contain the specified text',

      not_multiple_of: 'Value must be a multiple of {divisor}',

      unrecognized_keys: 'Unknown fields are not allowed',
      invalid_union: 'Value does not match any of the allowed options',
      invalid_key: 'Invalid key',
      invalid_element: 'Invalid element',
      invalid_value: 'Invalid value',

      custom: 'Invalid value'
    }
  }
}
