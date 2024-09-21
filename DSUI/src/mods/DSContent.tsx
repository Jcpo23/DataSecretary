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
	let Icon = (modeinit) ? DSIconActive : DSIcon;
	//let nList = (modeinit) ? GetDisData() : [];
	let nList = ["1", "2", "3"];

	function togglePanel() {
		setModeinit(!modeinit);
		ModActive();
	}

	const [selpop, setSelpop] = useState(true);
	const [selser, setSelser] = useState(false);
	const [selind, setSelind] = useState(false);

	function toggleTab(tab: string) {
		if (tab == "popu") {
			setSelpop(true);
			setSelser(false);
			setSelind(false);

			console.log(selpop, selser, selind);
		}
		if (tab == "serv") {
			setSelpop(false);
			setSelser(true);
			setSelind(false);

			console.log(selpop, selser, selind);
		}
		if (tab == "indu") {
			setSelpop(false);
			setSelser(false);
			setSelind(true);

			console.log(selpop, selser, selind);
		}
	}

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
		if (selser) {
			return <Services NameList={aNameList} />;
		} if (selind) {
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
								{ [styles.sel]: selpop },
								styles.but1,
								styles.but,
							)}
							onSelect={() => toggleTab("popu")}
							selected={selpop}
						>
							<FormattedText className={styles.buttext} text="POPULATION" />
						</Button>
						<Button
							variant={"floating"}
							className={classNames(
								{ [styles.sel]: selser },
								styles.but2,
								styles.but,
							)}
							onSelect={() => toggleTab("serv")}
							selected={selser}
						>
							<FormattedText className={styles.buttext} text="SERVICES" />
						</Button>
						<Button
							variant={"floating"}
							className={classNames(
								{ [styles.sel]: selind },
								styles.but3,
								styles.but,
							)}
							onSelect={() => toggleTab("indu")}
							selected={selind}
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
