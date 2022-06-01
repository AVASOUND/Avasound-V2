Moralis.Cloud.afterSave('TokenListed', async function (request) {
  if (request.object.get('confirmed') != true) {
    const tokenId = request.object.get('tokenId')

    const Album = Moralis.Object.extend('Album')
    const query = new Moralis.Query(Album)
    query.equalTo('token_id', tokenId)
    const result = await query.first({ useMasterKey: true })
    result.set('listing_id', request.object.get('listingId'))
    result.save(null, { useMasterKey: true })
  }
})

Moralis.Cloud.afterSave('AlbumCreated', async function (request) {
  const owner = request.object.get('owner')
  const recordId = request.object.get('record_ID')
  const Album = Moralis.Object.extend('Album')
  const query = new Moralis.Query(Album)
  query.equalTo('objectId', recordId)
  const logger = Moralis.Cloud.getLogger()
  logger.info(`The Parameters from contract ${JSON.stringify(request)}`)

  if (request.object.get('confirmed') != true) {
    logger.info(`The object is confirmed ${JSON.stringify(request)}`)

    const result = await query.first({ useMasterKey: true })
    result.set('owner', owner)
    result.set('token_id', request.object.get('downloadTokensID'))
    result.save(null, { useMasterKey: true })
  }
})

Moralis.Cloud.define('getDownloadTokens', async (request) => {
  const { owner, token_address } = request.params
  const query = new Moralis.Query('AlbumCreated')
  const pipeline = [
    {
      lookup: {
        from: 'AvaxNFTOwners',
        let: { owner: '$owner', token_id: '$downloadTokensID' },

        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$owner_of', '$$owner'] },
                  { $eq: ['$token_id', '$$token_id'] },
                ],
              },
            },
          },
        ],
        as: 'dt',
      },
    },
    { unwind: { path: '$dt' } },
    {
      project: {
        objectId: 1,
        record_ID: 1,
        owner_of: '$dt.owner_of',
        amount: '$dt.amount',
        uri: '$dt.token_uri',
        token_id: '$dt.token_id',
      },
    },
    {
      lookup: {
        from: 'Album',
        let: { objectId: '$record_ID' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$_id', '$$objectId'] },
                  { $eq: ['$listed', true] },
                ],
              },
            },
          },
        ],

        as: 'album',
      },
    },
    { unwind: { path: '$album' } },
    {
      project: {
        objectId: 1,
        record_ID: 1,
        owner_of: 1,
        amount: 1,
        uri: 1,
        token_id: 1,
        recordFiles: '$album.recordFiles',
        recordCover: '$album.recordCover',
        tracksIncluded: '$album.tracksIncluded',
        recordTitle: '$album.recordTitle',
        recordArtist: '$album.recordArtist',
        recordPrice: '$album.recordPrice',
        royaltyPrice: '$album.royaltyPrice',
        recordCount: '$album.recordCount',
        listing_id: '$album.listing_id',
      },
    },
    {
      lookup: {
        from: '_User',
        let: { owner: '$owner_of' },

        pipeline: [{ $match: { $expr: { $in: ['$$owner', '$accounts'] } } }],
        as: 'user',
      },
    },
    { unwind: { path: '$user' } },

    {
      project: {
        objectId: 1,
        record_ID: 1,
        owner: 1,
        amount: 1,
        uri: 1,
        token_id: 1,
        recordFiles: 1,
        recordCover: 1,
        tracksIncluded: 1,
        recordTitle: 1,
        recordArtist: 1,
        recordPrice: 1,
        royaltyPrice: 1,
        recordCount: 1,
        username: '$user.username',
        listing_id: 1,
      },
    },
  ]

  return query.aggregate(pipeline)
})

Moralis.Cloud.define('getDownloadTokensPurchased', async (request) => {
  const { owner, token_address } = request.params
  const query = new Moralis.Query('TokenSold')
  query.equalTo('buyer', owner)
  query.equalTo('contractAddress', token_address)
  const pipeline = [
    {
      lookup: {
        from: 'AlbumCreated',
        let: { owner: '$buyer', token_id: '$tokenId' },

        pipeline: [
          {
            $match: {
              $expr: { $and: [{ $eq: ['$downloadTokensID', '$$token_id'] }] },
            },
          },
        ],
        as: 'ac',
      },
    },
    { unwind: { path: '$ac' } },

    {
      project: {
        objectId: 1,
        downloadTokensID: '$ac.downloadTokensID',
        owner: '$ac.owner',
        buyer: owner,
      },
    },
    {
      lookup: {
        from: 'AvaxNFTOwners',
        let: { buyer: '$buyer', token_id: '$downloadTokensID' },

        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$owner_of', '$$buyer'] },
                  { $eq: ['$token_id', '$$token_id'] },
                ],
              },
            },
          },
        ],
        as: 'dt',
      },
    },
    { unwind: { path: '$dt' } },
    {
      project: {
        objectId: 1,
        record_ID: '$ac.record_ID',
        owner_of: '$dt.owner_of',
        amount: '$dt.amount',
        uri: '$dt.token_uri',
        token_id: '$dt.token_id',
      },
    },
    {
      lookup: {
        from: 'Album',
        let: { objectId: '$record_ID', token_id: '$token_id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$token_id', '$$token_id'] },
                  { $eq: ['$listed', true] },
                ],
              },
            },
          },
        ],

        as: 'album',
      },
    },
    { unwind: { path: '$album' } },
    {
      project: {
        objectId: 1,
        record_ID: 1,
        owner_of: 1,
        amount: 1,
        uri: 1,
        token_id: 1,
        recordFiles: '$album.recordFiles',
        recordCover: '$album.recordCover',
        tracksIncluded: '$album.tracksIncluded',
        recordTitle: '$album.recordTitle',
        recordArtist: '$album.recordArtist',
        recordPrice: '$album.recordPrice',
        royaltyPrice: '$album.royaltyPrice',
        recordCount: '$album.recordCount',
        listing_id: '$album.listing_id',
      },
    },
    {
      lookup: {
        from: '_User',
        let: { owner: '$owner_of' },

        pipeline: [{ $match: { $expr: { $in: ['$$owner', '$accounts'] } } }],
        as: 'user',
      },
    },
    { unwind: { path: '$user' } },

    {
      project: {
        objectId: 1,
        record_ID: 1,
        owner: 1,
        amount: 1,
        uri: 1,
        token_id: 1,
        recordFiles: 1,
        recordCover: 1,
        tracksIncluded: 1,
        recordTitle: 1,
        recordArtist: 1,
        recordPrice: 1,
        royaltyPrice: 1,
        recordCount: 1,
        username: '$user.username',
        listing_id: 1,
      },
    },
  ]

  return query.aggregate(pipeline)
})

Moralis.Cloud.define('api', async (request) => {
  const id = request.params.id
  const Album = Moralis.Object.extend('Album')
  const query = new Moralis.Query(Album)
  query.equalTo('token_id', id)
  const results = await query.first({ useMasterKey: true })
  if (results) {
    return {
      title: 'Asset Metadata',
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: results.get('recordTitle'),
        },
        description: {
          type: 'string',
          description: results.get('tracksIncluded'),
        },
        files: {
          type: 'string',
          description: results.get('recordFiles'),
        },
        image: {
          type: 'string',
          description: results.get('recordCover'),
        },
      },
    }
  } else return {}
})
