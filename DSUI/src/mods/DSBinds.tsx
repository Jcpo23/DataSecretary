import { InfoRow, FormattedText, PanelSection, InfoSection } from "cs2/ui";
import { useValue, bindValue, ValueBinding } from "cs2/api";
import {
	infoview,
	toolbarBottom,
	cityInfo,
	Entity,
	policy,
	selectedInfo,
	TitleSection,
	LocalizedName,
	ResidentsSection,
	Typed,
	SectionType,
	CustomName,
	NameType,
	SelectedInfoSections,
	SelectedInfoSectionBase,
} from "cs2/bindings";

import stylesb from "mods/DSBinds.module.scss";

export function Population(): JSX.Element {
	return (
		<div style={stylesb.divtable}>
			<table>
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Hapiness</th>
						<th scope="col">Policies</th>
						<th scope="col">Housolds</th>
						<th scope="col">Homes</th>
						<th scope="col">Population</th>
						<th scope="col">Pets</th>
						<th scope="col">Wealth</th>
						<th scope="col">Employees</th>
						<th scope="col">Positions</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row">bis</th>
						<td>{}</td>
						<td>{}</td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
						<td>{useValue(infoview.workers$)}</td>
						<td>{useValue(infoview.worksplaces$)}</td>
					</tr>
				</tbody>
				<tfoot>
					<tr>
						<th scope="row">{useValue(toolbarBottom.cityName$)}</th>
						<td>{useValue(cityInfo.happiness$)}</td>
						<td>{}</td>
						<td></td>
						<td></td>
						<td>{useValue(toolbarBottom.population$)}</td>
						<td></td>
						<td></td>
						<td>{useValue(infoview.employed$)}</td>
						<td>{useValue(infoview.jobs$)}</td>
					</tr>
				</tfoot>
			</table>
		</div>
	);
}
export function Services({ NameList }: { NameList: string[] }): JSX.Element {
	return (
		<div style={stylesb.divtable}>
			<FormattedText text={NameList[1]} />
			<FormattedText text={"nope"} />
			<FormattedText text={""} />
		</div>
	);
}
export function Industry(): JSX.Element {
	return <div></div>;
}
