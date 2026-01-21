/**
 * Hide iOS keyboard using predicate string to find the Return button
 */
export async function hideKeyboardByReturnPredicate(): Promise<void> {
    try {
        // Using predicate: type is button AND name or label is "Return"
        const returnBtn = await $(`~Return`);
        
        if (driver.isIOS && await returnBtn.isDisplayed()) {
            await returnBtn.click();
            console.log('Keyboard dismissed using predicate Return button');
        }
    } catch (error) {
        console.warn('Return button not found via predicate. Keyboard might already be hidden.');
    }
}
