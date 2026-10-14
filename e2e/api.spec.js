import{test,expect} from '@playwright/test';

test('Intercepta peticion fetch y muestra datos simulados (mock)', async ({page}) =>{
    await page.route('**/*', async(route) => {
        if(route.request().resourceType() == 'fetch'){
            await route.fulfill({
                status:200,
                contentType: 'application/json',
                body: JSON.stringify([
                    {id: 1,nombre: 'Consulta simulada'}
                ])
            });
        } else{
            await route.continue();
        }
    });

    await page.goto('/#/servicios');
    await expect(page.locator('body')).toContainText(/consulta|vacunacion/i);
});

test('Verifica la carga del contenedor de datos', async ({page}) =>{
    await page.goto('/#/servicios');
    await expect(page.locator('body')).toBeVisible();
});