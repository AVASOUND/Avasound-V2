export const MarketplaceABI = [
  "function listToken(address contractAddress, uint256 tokenId, uint256 amount, uint256 price) public nonReentrant",
  "function purchaseToken(uint256 listingId, uint256 amount) public payable nonReentrant",
];

export const marketplaceAddress = "0x53B499CE8191ddDcE9b1F4Bc07a404c06f9B1bE7";
