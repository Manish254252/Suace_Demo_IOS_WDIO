
export class BasePage {

    
    async scroll(direction: 'up' | 'down') {
        await this.swipeF(direction, 1200);
    }

      

    

async  swipeF(direction: 'up' | 'down' | 'left' | 'right', percent = 0.7) {
    const { width, height } = await driver.getWindowSize();

    const startX = width / 2;
    const startY = height / 2;

    let endX = startX;
    let endY = startY;

    const move = percent / 2;

    switch (direction) {
        case 'up':
            endY = height * (0.5 - move);
            break;
        case 'down':
            endY = height * (0.5 + move);
            break;
        case 'left':
            endX = width * (0.5 - move);
            break;
        case 'right':
            endX = width * (0.5 + move);
            break;
    }

    await driver.performActions([
        {
            type: 'pointer',
            id: 'finger1',
            parameters: { pointerType: 'touch' },
            actions: [
                { type: 'pointerMove', duration: 0, x: startX, y: startY },
                { type: 'pointerDown', button: 0 },
                { type: 'pause', duration: 100 },
                { type: 'pointerMove', duration: 600, x: endX, y: endY },
                { type: 'pointerUp', button: 0 }
            ]
        }
    ]);

    await driver.releaseActions();
}

async  swipeUpUntilVisible(
    element: WebdriverIO.Element,
    maxSwipes = 5
) {
    for (let i = 0; i < maxSwipes; i++) {
        if (await element.isDisplayed()) {
            return;
        }

        await this.swipeF('up',0.2); // reuse your swipe method
        await browser.pause(500);
    }

    throw new Error('Element not visible after swiping');
}



}
