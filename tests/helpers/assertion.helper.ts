export class SoftAssert {
    private errors: Error[] = [];

    async expect(assertion: () => void | Promise<void>, message?: string): Promise<void> {
        try {
            await (typeof assertion === 'function' ? assertion() : assertion);
        } catch (error) {
            const errorMessage = message || (error instanceof Error ? error.message : String(error));
            this.errors.push(new Error(errorMessage));
        }
    }

    assertAll(): void {
        if (this.errors.length === 0) return;
        const errorMessages = this.errors.map((err, idx) => `${idx + 1}: ${err.message}`).join('\n');
        throw new Error(`Soft Assertion Failures:\n${errorMessages}`);
    }

    clear(): void {
        this.errors = [];
    }
}
