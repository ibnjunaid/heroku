export declare function findPlaceByWoeid(Woeid: number): {
    name: string;
    woeid: number;
    placeType: {
        name: string;
        code: number;
    };
    country: string;
    url: string;
    countryCode: string;
    parentid: number;
} | {
    name: string;
    placeType: {
        name: string;
        code: number;
    };
    woeid: number;
    country: string;
    url: string;
    countryCode: null;
    parentid: number;
} | undefined;
export declare function replaceSpaceAndDotsWith_(name: string): string;
