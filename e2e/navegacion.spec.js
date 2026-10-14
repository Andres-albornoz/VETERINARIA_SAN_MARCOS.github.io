import {test, expect} from '@playwright/test';

test('Carga la pagina principal de la veterinaria', async ({page}) =>{

    await page.goto('/')
    await expect(page.locator('body')).toContainText(/veterinaria/i);
});