import { IntermediateTheme, LegacyTheme, PolyTheme } from "./def";

function appendKey(key: string) {
    if (!key.endsWith("0") && !key.endsWith("5")) key = `${key}_500`
    return key;
}

export function legacyToIntermediate(legacy: LegacyTheme): IntermediateTheme {
    // Use undefined to structure the object layout
    const intermediate: IntermediateTheme = {
        name: legacy.name,
        description: legacy.description,
        authors: undefined,
        semanticColors: legacy.theme_color_map,
    };

    if (!legacy.theme_color_map.CHAT_BACKGROUND && intermediate.semanticColors)
        intermediate.semanticColors.CHAT_BACKGROUND =
            legacy.theme_color_map.BACKGROUND_PRIMARY;

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

        // TODO: This is bad
        // https://github.com/compilekaiten/enmity-Themes-Color-Map#colours-object
        for (let [key, value] of Object.entries(legacy.colors)) {
            if (key.startsWith("PRIMARY_DARK")) key = appendKey(key.replace("_DARK", ""));
            else if (key.startsWith("PRIMARY_LIGHT")) key = appendKey(key.replace("_LIGHT", ""));
            else if (key.startsWith("BRAND_NEW")) key = appendKey(key.replace("_NEW", ""));
            else if (key.startsWith("STATUS")) key = appendKey(key.replace("STATUS_", ""));
            else if (key === "WHITE") key = appendKey(key);

            intermediate.rawColors[key] = value;
        }
    }

    return intermediate;
}

export const intermediateToPolyTheme = (
    intermediate: IntermediateTheme
): PolyTheme => ({ ...intermediate, spec: 2 });

// TODO: In future, consider intermediateToLegacy alongside polyThemeToIntermediate