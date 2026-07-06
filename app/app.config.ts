export default defineAppConfig({
  ui: {
    button: {
      slots: {
        base: 'cursor-pointer disabled:cursor-not-allowed'
      }
    },
    accordion: {
      slots: {
        trigger: 'cursor-pointer disabled:cursor-not-allowed'
      }
    }
  },
  global: {
    openToWork: true,
    meetingLink: 'https://calendly.com/drew-drux/30min'
  }
})
