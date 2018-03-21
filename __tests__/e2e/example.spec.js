import puppeteer from 'puppeteer';

jest.setTimeout(30000);

describe('Example website', () => {
  let page;
  let browser;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 80
    });
    page = await browser.newPage();
    await page.goto('https://example.org');
  });

  test('visual regression', async () => {
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot({
      failureThreshold: '0.01',
      failureThresholdType: 'percent'
    });
  });

  test('title', async () => {
    const pageTitle = await page.title();

    expect(pageTitle).toEqual('Example Domain');
  });

  test('header', async () => {
    const header = await page.$eval('h1', (el) => el.textContent);

    expect(header).toEqual('Example Domain');
  });

  afterAll(() => {
    browser.close();
  });
});
