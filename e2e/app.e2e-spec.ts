import { ProplistingPage } from './app.po';

describe('proplisting App', () => {
  let page: ProplistingPage;

  beforeEach(() => {
    page = new ProplistingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
