export const obfuscatedFields = {
  visitorId: {
    needs: { visitorId: true },
    compute(data: { visitorId: string }) {
      return `#${data.visitorId.slice(0, 8)}`
    }
  }
}
