import puppeteer from 'puppeteer';

jest.setTimeout(10000);

describe('Example website', () => {
  let page;
  let browser;
  const width = 1920;
  const height = 1080;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 80,
      args: [`--window-size=${width},${height}`]
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
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
