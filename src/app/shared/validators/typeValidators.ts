import { IInputObject } from "../interfaces/IInputObject";
import { logger } from "../logger";
const tag = "template-be:typeValidators";
export class TypeValidators {
    public arePhones(inputObjects: IInputObject[]): any {
        try {
            const regexWithoutPlus = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
            const regexWithPlus = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
            const errorMessages = [];
            for (const inputObject of inputObjects) {
                if (!inputObject.value || !inputObject.value.match(regexWithPlus) && !inputObject.value.match(regexWithoutPlus)) {
                    errorMessages.push(`${inputObject.key} is not a phone number`);
                }
            }
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const arePhonesErrorMessage = { tag: tag + ":arePhones", message: "internal server error", error, status: 500 };
            logger(arePhonesErrorMessage);
        }
    }
    public areEmails(inputObjects: IInputObject[]): any {
        try {
            const regex = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
            const errorMessages = [];
            for (const inputObject of inputObjects) {
                if (!inputObject.value || String(inputObject.value).search(regex) === -1) errorMessages.push(`${inputObject.key} is not an email address`);
            }
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const areEmailsErrorMessage = { tag: tag + ":areEmails", message: "internal server error", error, status: 500 };
            logger(areEmailsErrorMessage);
        }
    }
    public areNumbers(inputObjects: IInputObject[]): any {
        try {
            const errorMessages = [];
            for (const inputObject of inputObjects) {
                if (!inputObject.value || typeof inputObject.value !== "number") errorMessages.push(`${inputObject.key} must be a number`);
            }
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const areNumbersErrorMessage = { tag: tag + ":areNumbers", message: "internal server error", error, status: 500 };
            logger(areNumbersErrorMessage);
        }
    }
    public areArrays(inputObjects: IInputObject[]): any {
        try {
            const errorMessages = [];
            for (const inputObject of inputObjects) {
                if (!inputObject.value || !Array.isArray(inputObject.value)) errorMessages.push(`${inputObject.key} must be an array`);
            }
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const areArraysErrorMessage = { tag: tag + ":areArrays", message: "internal server error", error, status: 500 };
            logger(areArraysErrorMessage);
        }
    }
    public areObjects(inputObjects: IInputObject[]): any {
        try {
            const errorMessages = [];
            for (const inputObject of inputObjects) {
                if (!inputObject.value || typeof inputObject.value !== "object") errorMessages.push(`${inputObject.key} must be an object`);
            }
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const areObjectsErrorMessage = { tag: tag + ":areObjects", message: "internal server error", error, status: 500 };
            logger(areObjectsErrorMessage);
        }
    }
    public areStrings(inputObjects: IInputObject[]): any {
        try {
            const errorMessages = [];
            for (const inputObject of inputObjects) {
                if (!inputObject.value || typeof inputObject.value !== "string") errorMessages.push(`${inputObject.key} must be a string`);
            }
            return !errorMessages.length ? true : { errorMessages };
        } catch (error) {
            const areStringsErrorMessage = { tag: tag + ":areStrings", message: "internal server error", error, status: 500 };
            logger(areStringsErrorMessage);
        }
    }
}
