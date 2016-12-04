const medium = require('medium-sdk');
export default class MediumBlog {
  constructor(){
    this.clientId = '1025544c3a03';
    this.clientSecret = 'a3523a238132f89bef53e0ca5271d07eb31ba661';
    this.accessToken = '2564bdb524c1e9aff8416ad1f1bbb581758cb156c0b41e6e4caa1f6ced187fd3e';
    this.scope = 'listPublications';
    this.state = 'BlogGirlCode';
    this.userId = '';
    this.endpoint = `https://api.medium.com/v1/users/${this.userId}/publications`;
    this.redirectUrl = 'http://girl-code.nl/blog';
  }

  init() {
    this.client = new medium.MediumClient({
      clientId: this.clientId,
      clientSecret: this.clientSecret
    });
    var url = this.client.getAuthorizationUrl(this.state, this.redirectUrl, [
      medium.Scope.BASIC_PROFILE, medium.Scope.LIST_PUBLICATIONS
    ]);
    //TODO authorize application and copy code
    window.open(url, 'Medium Authorization', 'width=800, height=600');

    console.log('init medium api', url);

    // this.client.setAccessToken(this.accessToken);
    this.client.exchangeAuthorizationCode('87f2e934b300', this.redirectUrl, (err, token) => {
      this.client.getUser((err, user) => {
        console.log(user);
        // import json with medium feeds
        this.client.getPublicationsForUser((err, user) => {
          //insert feeds into page
        })
      });
    });
  }
}
