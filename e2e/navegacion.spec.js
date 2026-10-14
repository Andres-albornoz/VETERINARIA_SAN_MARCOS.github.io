import {test, expect} from '@playwright/test';

test('Test: Carga la pagina principal de la veterinaria', async ({page}) =>{

    await page.goto('/')
    await expect(page.locator('body')).toContainText(/veterinaria/i);
});

test('Test: Ir hacia la seccion de servicios', async({page}) =>{

    await page.goto('/');
    await page.getByRole('Link', {name: /servicios/i}).first().click();
    await expect(page).toHaveURL(/.*servicios/);
});

test('Test: ir hacia la seccion de contacto', async({page}) =>{

    await page.goto('/')
    await page.getByRole('Link',{name: /contacto/i}).first().click();
    await expect(page).toHaveURL(/.*contacto/);
})