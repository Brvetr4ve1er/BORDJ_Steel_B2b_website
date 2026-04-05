import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Verify Galvanisation page
        print("Visiting Galvanisation page...")
        await page.goto('http://localhost:3000/products/galvanisation')
        await page.wait_for_load_state('networkidle')
        await page.screenshot(path='/home/jules/verification/galvanisation.png', full_page=True)
        print("Saved galvanisation screenshot.")

        # Verify Charpente Metallique page
        print("Visiting Charpente Metallique page...")
        await page.goto('http://localhost:3000/products/charpente-metallique')
        await page.wait_for_load_state('networkidle')
        await page.screenshot(path='/home/jules/verification/charpente-metallique.png', full_page=True)
        print("Saved charpente metallique screenshot.")

        # Verify Blog page
        print("Visiting Blog page...")
        await page.goto('http://localhost:3000/media-center/blog')
        await page.wait_for_load_state('networkidle')
        await page.screenshot(path='/home/jules/verification/blog.png', full_page=True)
        print("Saved blog screenshot.")

        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
