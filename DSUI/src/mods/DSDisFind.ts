import { InfoRow, FormattedText, PanelSection, InfoSection } from "cs2/ui";
import {
	type Entity,
	infoview,
	toolbarBottom,
	cityInfo,
	policy,
	selectedInfo,
	TitleSection,
	ResidentsSection,
	Typed,
	SectionType,
	CustomName,
	NameType,
	SelectedInfoSections,
} from "cs2/bindings";

import styles from "mods/DSBinds.module.scss";
import { useValue, bindValue, ValueBinding, trigger } from "cs2/api";
import mod from "../../mod.json";

const DisList = bindValue<string>("DataSecretary", "DisList", "");
const ModActive = trigger.bind(null, "DataSecretary", "ModActive");

function GetDisData() {
	console.log(mod.id, "GetDisData 0");
	const EntList = useValue(DisList).split(",");
	EntList.length -= 1;

	console.log(mod.id, "GetDisData 1");
	const List = new Array<string>(EntList.length);

	EntList.forEach((element, iter) => {
		const ent: Entity = { index: Number.parseInt(element), version: 1 };

		selectedInfo.selectEntity(ent);

		const supersel = Object.assign({}, selectedInfo);
		List[iter] = JSON.stringify(supersel.selectedEntity$.value.index);

		selectedInfo.clearSelection();
		console.log(mod.id, "GetDisData 2-${iter}");
	});

	console.log(mod.id, "GetDisData 3");
	return (List);
}

export { GetDisData, ModActive };
