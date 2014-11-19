# zetta-volos-analytics

An extension for Zetta to allow analytics via [volos](https://github.com/apigee-127/volos).

## Install

`npm install zetta-volos-analytics`

## Example

```js
var zetta = require('zetta');
var AnalyticsExtension = require('zetta-volos-analytics');
var inMemoryAnalytics = require('volos-analytics-memory');

var options = {
  bufferSize: 3,
  flushInterval: 1000,
  batchSize: 3
};

var analytics = inMemoryAnalytics.create(options);

analytics.spi.on('makeRecord', console.log);

zetta()
  .use(AnalyticsExtension(analytics))
  .listen(3000);
```

## License

MIT
