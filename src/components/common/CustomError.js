class CustomError extends Error {
    constructor(componentName, message) {
        super(message);
        this.name = 'CustomError';
        this.componentName = componentName;
        this.message = message || 'Something went wrong';
    }
}

export default CustomError;