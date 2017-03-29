/* global window, __BUILD__ */

const analytics = window.analytics || [];

// analytics shim to inject global values
// further reading: https://segment.com/docs/sources/website/analytics.js

const pageProps = JSON.parse(__BUILD__.SEGMENT_PAGE_PROPERTIES);

export default {
  track(event, properties, options, callback) {
    return analytics.track(event, properties, options, callback);
  },
  identify(userId, traits, options, callback) {
    return analytics.identify(userId, traits, options, callback);
  },
  page(category, name, properties, options, callback) {
    return analytics.page(category, name, Object.assign(pageProps, properties), options, callback);
  },
  group(groupId, traits, options, callback) {
    return analytics.group(groupId, traits, options, callback);
  },
  alias(userId, previousId, options, callback) {
    return analytics.alias(userId, previousId, options, callback);
  },
  ready(callback) {
    return analytics.ready(callback);
  },
};
