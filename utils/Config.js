const TimeHelper = require('./TimeHelper');
class Config {
  constructor(settings, instances){
    this.timestamp = TimeHelper.YYYYMMDDHHmmss();
    this.senderNetwork = settings.senderNetwork;
    this.recipientNetwork = settings.senderNetwork;
    this.senderAddress = settings.sender.address;
    this.burnAddress = instances.burnAccount.address;
    this.recipientAddress = settings.recipient.address;
    this.amount = settings.tokenAmount;
    this.transactionId = '';
    this.creationUtc = instances.senderAgent.creationTime;
    this.expired = false;
    this.seedInits(settings, instances);
    this.seedTxs(settings, instances);
  }

  seedInits(settings, instances){
    this.inits = [
      {
        instance: 'senderAgent',
        method: 'registerContract',
        args: [
          instances.recipientAgent.address
        ],
      },
      {
        instance: 'recipientAgent',
        method: 'registerContract',
        args: [
          instances.senderAgent.address
        ],
      },
      {
        instance: 'senderToken',
        method: 'transfer',
        args: [
          instances.senderAgent.address,
          1000
        ],
      },
      {
        instance: 'recipientToken',
        method: 'transfer',
        args: [
          instances.recipientAgent.address,
          1000
        ],
      },

    ];
  }

  seedTxs(settings, instances){
    this.txs = [
      {
        preTimeout: true,
        instance: 'senderToken',
        method: 'approve',
        args: [
          instances.senderAgent.address,
          settings.tokenAmount
        ],
      },
      {
        preTimeout: true,
        instance: 'senderAgent',
        method: 'exitTransaction',
        args: [
          instances.burnAccount.address,
          instances.hashPair.hash,
          instances.senderAgent.timer.periodEndSeconds,
          instances.senderToken.address,
          settings.tokenAmount

        ],
      },
      {
        preTimeout: false,
        instance: 'senderAgent',
        method: 'reclaimTransaction',
        args: [
          settings.transactionId
        ],
      },
      {
        preTimeout: true,
        instance: 'recipientAgent',
        method: 'add',
        args: [
          instances.senderAgent.address,
          settings.transactionId,
          instances.burnAccount.address,
          instances.hashPair.hash,
          instances.senderAgent.timer.periodEndSeconds,
          instances.recipientToken.address,
          settings.tokenAmount

        ],
      },
      {
        preTimeout: true,
        instance: 'recipientAgent',
        method: 'entryTransaction',
        args: [
          settings.tokenAmount,
          settings.recipient.address,
          settings.transactionId,
          instances.hashPair.secret

        ],
      },
      {
        preTimeout: true,
        instance: 'senderAgent',
        method: 'update',
        args: [
          instances.recipientAgent.address,
          settings.transactionId,
          instances.hashPair.secret,
        ],
      },
    ]
  }
}

module.exports = Config;