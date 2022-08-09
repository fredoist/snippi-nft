export const IPFSToURI = (uri: string): string => {
  if (uri && uri.startsWith('ipfs://')) {
    return uri.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')
  } else {
    return uri
  }
}
