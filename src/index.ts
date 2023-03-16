import { IntermediateTheme, LegacyTheme, PolyTheme } from "./def";
import { conversions, appendKey, without } from "./utils";

export function legacyToIntermediate(legacy: LegacyTheme): IntermediateTheme {
    // Use undefined to structure the object layout
    const intermediate: IntermediateTheme = {
        name: legacy.name,
        description: legacy.description,
        authors: undefined,
        semanticColors: legacy.theme_color_map,
    };

    if (!legacy.theme_color_map.CHAT_BACKGROUND && intermediate.semanticColors) {
        intermediate.semanticColors.CHAT_BACKGROUND = legacy.theme_color_map.BACKGROUND_PRIMARY;
    }

    if (legacy.authors && legacy.authors.length !== 0) {
        intermediate.authors = [];

        for (let author of legacy.authors) {
            if (typeof author === "object") {
                intermediate.authors.push(author);
            } else {
                intermediate.authors.push({
                    name: author,
                });
            }
        }
    }

    // damn britlanders
    legacy.colors ??= legacy.colours;

    if (legacy.colors) {
        intermediate.rawColors = {};

        // https://github.com/compilekaiten/enmity-Themes-Color-Map#colours-object
        for (let [key, value] of Object.entries(legacy.colors)) {
            for (let [start, toReplace] of Object.entries(conversions)) {
                if (key.startsWith(start)) key = appendKey(key.replace(toReplace, ""));
            };

            if (key === "WHITE" || key === "BLACK") key = appendKey(key);
            intermediate.rawColors[key] = value;
        }
    }

    return intermediate;
}

export const intermediateToPolyTheme = (intermediate: IntermediateTheme): PolyTheme => ({ ...intermediate, spec: 2 });

// TODO: In future, consider intermediateToLegacy alongside polyThemeToIntermediate
