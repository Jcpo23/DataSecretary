import type { ModRegistrar } from "cs2/modding";
import DSContent from "mods/DSContent";

const register: ModRegistrar = (moduleRegistry) => {
	moduleRegistry.append("GameTopLeft", DSContent);
};

export default register;