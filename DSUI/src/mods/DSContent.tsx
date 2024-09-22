import {
	infoview,
	toolbarBottom,
	cityInfo,
	type Entity,
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

import {
	Button,
	Panel,
	PanelSection,
	FormattedText,
	FloatingButton,
	Tooltip,
	InfoRow,
	InfoSection,
} from "cs2/ui";

import { useValue, bindValue, ValueBinding } from "cs2/api";
import classNames from "classnames";
import { useEffect, useState, useMemo, memo, useRef } from "react";

import mod from "../../mod.json";

import DSIconActive from "images/DSIconActive-orig.svg";
import DSIcon from "images/DSIcon.svg";
import styles from "mods/DSContent.module.scss";

import { Population, Services, Industry } from "mods/DSBinds";
import { ModActive, GetDisData } from "mods/DSDisFind";

export default () => {


	const [modeinit, setModeinit] = useState(false);
	const Icon = (modeinit) ? DSIconActive : DSIcon;
	//const nList = (modeinit) ? GetDisData() : [];
	const nList = ["1", "2", "3"];

	function togglePanel() {
		setModeinit(!modeinit);
		ModActive();
	}

	const [sel, setSel] = useState("popu");

	function DSbut(): JSX.Element {
		return (
			<Tooltip tooltip="DSUI">
				<FloatingButton onClick={togglePanel} src={Icon} tinted={modeinit} />
			</Tooltip>
		);
	}
	function Headertext(): JSX.Element {
		return (
			<div className={styles.divhead}>
				<FormattedText className={styles.title} text={"Data Secretary"} />
				<button
					className={classNames(
						styles.exitbut,
						"button_bvQ button_bvQ close-button_wKK",
					)}
					onClick={togglePanel}
				>
					<div
						className="tinted-icon_iKo"
						style={{
							maskImage: "url(Media/Glyphs/Close.svg)",
							width: "var(--iconWidth)",
							height: "var(--iconHeight)",
						}}
					></div>
				</button>
			</div>
		);
	}
	function Footertext(): JSX.Element {
		return <FormattedText className={styles.footer} text={"VersionAlpha"} />;
	}
	function Tab({ aNameList }: { aNameList: string[] }): JSX.Element {
		if (sel==="serv") {
			return <Services NameList={aNameList} />;
		} if (sel==="indu") {
			return <Industry />;
		} 
		return <Population />;
	}
	
	if (modeinit) {
		return (
			<>
				<DSbut />
				<Panel
					header={<Headertext />}
					footer={<Footertext />}
					className={styles.mainpanel}
					allowFocusExit={true}
				>
					<PanelSection className={styles.butsect}>
						<Button
							variant={"floating"}
							className={classNames(
								{ [styles.sel]: (sel==="popu") },
								styles.but1,
								styles.but,
							)}
							onSelect={() => setSel("popu")}
							selected={(sel === "popu")}
						>
							<FormattedText className={styles.buttext} text="POPULATION" />
						</Button>
						<Button
							variant={"floating"}
							className={classNames(
								{ [styles.sel]: (sel === "serv") },
								styles.but2,
								styles.but,
							)}
							onSelect={() => setSel("serv")}
							selected={(sel === "serv")}
						>
							<FormattedText className={styles.buttext} text="SERVICES" />
						</Button>
						<Button
							variant={"floating"}
							className={classNames(
								{ [styles.sel]: (sel === "indu") },
								styles.but3,
								styles.but,
							)}
							onSelect={() => setSel("indu")}
							selected={(sel === "indu")}
						>
							<FormattedText className={styles.buttext} text="INDUSTRY" />
						</Button>
					</PanelSection>
					<PanelSection className={styles.tabsect}>
						<Tab aNameList={nList} />
					</PanelSection>
				</Panel>
			</>
		);
	}
		return (
			<>
				<DSbut />
			</>
		);
	
};
