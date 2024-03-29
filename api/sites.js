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
  },

  getArModelApi() {
    return http.get('/design/ar', {}, {});
  },

  addMySiteDesign(siteDesign) {
    return http.post('/design/site-add', siteDesign, { noLogin: false })
  },

  getInProcessVote(cId = 1) {
    return http.get('/vote/in-process', { cId: cId }, { noLogin: false })
  },

  getAllVotes(cId = 1) {
    return http.get('/vote/all', { cId: cId }, { noLogin: false })
  },

  voteDesign(voteId) {
    return http.post('/vote/vote', voteId.toString(), { noLogin: false })
  },
}