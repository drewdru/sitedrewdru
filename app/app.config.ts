export default defineAppConfig({
  ui: {
    prose: {
      h1: {
        slots: {
          base: 'my-0 font-heading text-5xl leading-tight font-bold tracking-tight'
        }
      },
      h2: {
        slots: {
          base: 'my-0 font-heading text-4xl leading-tight font-bold tracking-tight'
        }
      },
      h3: {
        slots: {
          base: 'my-0 font-heading text-3xl leading-tight font-semibold'
        }
      },
      h4: {
        slots: {
          base: 'my-0 font-heading text-2xl leading-tight font-semibold'
        }
      },
      h5: {
        slots: {
          base: 'my-0 font-heading text-xl leading-tight font-semibold'
        }
      },
      h6: {
        slots: {
          base: 'my-0 font-heading text-lg leading-tight font-semibold'
        }
      },
      p: {
        slots: {
          base: 'my-0'
        }
      }
    },
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
