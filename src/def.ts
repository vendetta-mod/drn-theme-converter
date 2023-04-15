export interface Author {
    name: string;
    id?: string;
}

export interface IntermediateTheme {
    name: string;
    description?: string;
    authors?: Author[];
    /**
     * Colors for text and most background elements. Each property must have a color for dark mode, a color for light mode, and optionally a color for AMOLED, in that order.
     */
    semanticColors?: Record<string, [string, string, string]>;
    /**
     * Colors used throughout Discord.
     */
    rawColors?: Record<string, string>;
    background?: {
        url: string;
        blur?: number;
        /**
         * The alpha value of the background.
         * `CHAT_BACKGROUND` of semanticColors alpha value will be ignored when this is specified 
         */
        alpha?: number;
    }
}


export interface LegacyTheme {
    name: string;
    description?: string;
    /**
     * Color of the theme in settings. Only Enmity supported this.
     */
    color?: string;
    version?: string;
    authors?: Array<Author | string>;
    /**
     * Colors for text and most background elements. Each property must have a color for dark mode, a color for light mode, and optionally a color for AMOLED, in that order.
     * 
     * NOTE: Enmity V2 (currently) does not support the AMOLED color in themes.
     */
    theme_color_map: Record<string, [string, string, string]>;
    /**
     * Colors used throughout Discord.
     */
    colors?: Record<string, string>;
    /**
     * Colours used throughout Discord.
     */
    colours?: Record<string, string>;
    unsafe_colors?: Record<string, string>;
    background?: {
        url: string;
        blur?: number;
        alpha?: number;
    }
}

export interface PolyTheme extends IntermediateTheme {
    /**
     * Theme specification version
     */
    spec: number;
}