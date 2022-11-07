import home from '../Pages/homePage';

fixture `My fixture`
    .page `http://localhost:3001/`;

test('clicking add device', async t => {
    await t
        .click(home.deviceType)
        .click(home.sortBy)
		.click(home.addDevice);
});