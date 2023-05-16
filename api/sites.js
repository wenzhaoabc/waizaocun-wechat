const http = require('../utils/http')
const MyLocation = {
  lat: 31.286709,
  lng: 121.211982
}

module.exports = {
  getSitesByCId(communityId) {
    return http.get('/site/get-community', { id: communityId }, { noLogin: false });
  },

  getNearbySites(lat, lng) {
    return http.get('/site/get-distance', { lon: lng, lat }, { noLogin: false });
  },

  searchSitesByName(key) {
    return http.get('/site/get-name', { name: key });
  },

  getCommunityInfo(id) {
    return http.get('/community/get-id', { id }, {});
  },

  getDesignItemApi() {
    return http.get(`/design/all-item`, {}, {});
  }
}