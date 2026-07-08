export default defineAppConfig({
  ui: {
    button: {
      slots: {
        base: 'cursor-pointer disabled:cursor-not-allowed'
      }
    },
    select: {
      slots: {
        base: 'cursor-pointer disabled:cursor-not-allowed',
        item: 'cursor-pointer disabled:cursor-not-allowed'
      }
    },
    selectMenu: {
      slots: {
        base: 'cursor-pointer disabled:cursor-not-allowed',
        item: 'cursor-pointer disabled:cursor-not-allowed'
      }
    },
    accordion: {
      slots: {
        trigger: 'cursor-pointer disabled:cursor-not-allowed'
      }
    },
    table: {
      slots: {
        td: 'whitespace-normal break-words align-top'
      }
    }
  },
  global: {
    openToWork: true,
    workMeetingLink: 'https://calendly.com/drew-drux/30min'
  }
})
