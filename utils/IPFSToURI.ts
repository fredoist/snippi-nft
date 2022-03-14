export const IPFSToURI = (uri: string): string => {
  return uri.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/');
};
