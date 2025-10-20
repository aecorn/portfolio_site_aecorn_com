export async function getPyPiPackageCount(username) {
  if (!username) return null

  const xmlrpc = await import('xmlrpc')

  const client = xmlrpc.createSecureClient('https://pypi.org/pypi')

  return new Promise((resolve) => {
    client.methodCall('user_packages', [username], (error, result) => {
      if (error) {
        console.error('Failed to fetch PyPI packages', error)
        resolve(null)
        return
      }
      if (!Array.isArray(result)) {
        resolve(null)
        return
      }
      resolve(result.length)
    })
  })
}
