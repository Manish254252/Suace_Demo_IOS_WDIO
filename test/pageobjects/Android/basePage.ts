import homeScreen, { HomePage } from "./home.screen";


export class BasePage {

    async swipe(
        direction: 'up' | 'down' | 'left' | 'right',
        duration = 600
    ) {
        const { width, height } = await driver.getWindowRect();

        const top = height * 0.2;
        const bottom = height * 0.8;
        const left = width * 0.2;
        const right = width * 0.8;
        const centerX = width / 2;
        const centerY = height / 2;

        switch (direction) {
            case 'up':
                await this.performTouchGesture(centerX, bottom, centerX, top, duration);
                break;
            case 'down':
                await this.performTouchGesture(centerX, top, centerX, bottom, duration);
                break;
            case 'left':
                await this.performTouchGesture(right, centerY, left, centerY, duration);
                break;
            case 'right':
                await this.performTouchGesture(left, centerY, right, centerY, duration);
                break;
        }
    }

    async scroll(direction: 'up' | 'down') {
        await this.swipe(direction, 1200);
    }

    async drawLine(
        startX: number,
        startY: number,
        endX: number,
        endY: number
    ) {
        await this.performTouchGesture(
            startX,
            startY,
            endX,
            endY,
            1200 // slow move for drawing
        );
    }

    async dragAndDrop(
        startX: number,
        startY: number,
        endX: number,
        endY: number
    ) {
        await this.performTouchGesture(
            startX,
            startY,
            endX,
            endY,
            800,
            500 // hold before move
        );
    }


    async performTouchGesture(
        startX: number,
        startY: number,
        endX: number,
        endY: number,
        moveDuration = 800,
        holdDuration = 0
    ) {
        const actions: any[] = [
            {
                type: 'pointerMove',
                duration: 0,
                origin: 'viewport',
                x: startX,
                y: startY
            },
            {
                type: 'pointerDown',
                button: 0
            }
        ];

        // Optional hold (long press / drag start)
        if (holdDuration > 0) {
            actions.push({
                type: 'pause',
                duration: holdDuration
            });
        }

        // Move gesture
        actions.push({
            type: 'pointerMove',
            duration: moveDuration,
            origin: 'viewport',
            x: endX,
            y: endY
        });

        actions.push({
            type: 'pointerUp',
            button: 0
        });

        await driver.performActions([{
            type: 'pointer',
            id: 'finger',
            parameters: { pointerType: 'touch' },
            actions
        }]);

        await driver.releaseActions();
    }

    /**
 * Switch to a specific Appium context (WEBVIEW or NATIVE_APP)
 * @param {'WEBVIEW' | 'NATIVE_APP'} target
 * @param {number} timeout
 */
 async  switchContext(target = 'WEBVIEW', timeout = 15000) {
    console.log(await driver.getContexts())
  if (target === 'NATIVE_APP') {
    await driver.switchContext('NATIVE_APP');
    return;
  }
  
  
  await driver.switchContext("WEBVIEW_com.swaglabsmobileapp");
  console.log("Current Context :"+await driver.getContext());
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
    element=homeScreen.swipeItem,
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
