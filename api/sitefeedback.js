const http = require('../utils/http');

module.exports = {
  submitFeedBack(feedback) {
    return http.post("/site/feedback", feedback, { noLogin: false });
  },

  getMyFeedback() {
    return http.get("/site/my-feedback", {}, { noLogin: false });
  }
}