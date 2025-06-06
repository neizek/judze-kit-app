<script lang="ts">
	import {
		onDestroy,
		onMount,
		tick,
		type ComponentType,
		type SvelteComponent,
	} from "svelte";
	import Button from "../../../components/ui/Button.svelte";
	import FormItem from "../../../components/ui/FormItem.svelte";
	import Input from "../../../components/ui/Input.svelte";
	import Select from "../../../components/ui/Select/Select.svelte";
	import SelectButtons from "../../../components/ui/SelectButtons.svelte";
	import celestialObjects from "./celestialObjects.json";
	import CoordinatesInput from "../../../components/ui/CoordinatesInput.svelte";
	import DateTimeInput from "../../../components/ui/DateTimeInput.svelte";
	import { title } from "$lib/meta";
	// import { Geolocation } from "@capacitor/geolocation";
	import VariationInput from "../../../components/ui/VariationInput.svelte";
	import Section from "../../../components/ui/Section.svelte";
	import EqualGrid from "../../../components/ui/EqualGrid.svelte";
	import { browser } from "$app/environment";
	import NewDateTimeInput from "../../../components/ui/NewDateTimeInput.svelte";
	import { formatToCompassError } from "$lib/string";
	import type { GeolocationPlugin } from "@capacitor/geolocation";

	let object: string;
	let givenDateTime: Date = new Date();
	let longitude: number = 24;
	let latitude: number = 57;
	let azimuth: number;
	let LHA: number;
	let GHA: number;
	let declination: number;
	let GC: number;
	let GB: number;
	let variation: number;
	let MC: number;
	let givenStarOrPlanet: string | undefined;

	$: TC = GC && azimuth && GB ? GC - (azimuth - GB) : undefined;

	let solarSystemObjects = [
		{
			value: "sun",
			icon: "sunny",
			label: "Sun",
		},
		{
			value: "moon",
			icon: "dark_mode",
			label: "Moon",
		},
		{
			value: "stars",
			icon: "star",
			label: "Star",
		},
		{
			value: "planets",
			icon: "adjust",
			label: "Planet",
		},
	];

	function dateToExcelSerial(date: Date) {
		const excelBaseDate = new Date(Date.UTC(1900, 0, 1));
		const timeDifference = Number(date) - Number(excelBaseDate);
		return Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 2;
	}

	const toRadians = (angle: number) => angle * (Math.PI / 180);
	const toDegrees = (radians: number) => radians / (Math.PI / 180);
	const mod = (number: number, divider: number) =>
		((number % divider) + divider) % divider;

	function getAzimuth(
		LHA: number,
		declination: number,
		givenSHA: number | undefined = undefined
	) {
		// const LHACorr = 0; // IF SUN!!!
		const P = LHA + (givenSHA ?? 0);

		const SHA = givenSHA ?? 0;
		const LHASHA = (LHA + SHA) % 360;

		const G26 = LHASHA > 90 && LHASHA < 270 ? 1 : 0;
		const H26 = Math.abs(
			Math.tan(toRadians(Math.abs(latitude))) / Math.tan(toRadians(Math.abs(P)))
		);

		const A = (() => {
			if (G26 === 0) {
				return latitude > 0 ? -H26 : H26;
			} else {
				return latitude > 0 ? H26 : -H26;
			}
		})();

		const preB = Math.abs(
			Math.tan(toRadians(declination)) / Math.sin(toRadians(LHASHA))
		);
		const B = declination > 0 ? +preB : -preB;

		const C = A + B;
		const fullAzimuth = Math.abs(
			toDegrees(Math.atan(1 / (Math.cos(toRadians(Math.abs(latitude))) * C)))
		);

		if (C < 0) {
			if (LHASHA < 180) {
				return 180 + fullAzimuth;
			} else {
				return 180 - fullAzimuth;
			}
		} else {
			if (LHASHA < 180) {
				return 360 - fullAzimuth;
			} else {
				return fullAzimuth;
			}
		}
	}

	const getLHA = (GHA: number) => mod(GHA + longitude, 360);

	const getLST = (time: number) => {
		const d = 360 - ((280.46061837 + 360.98564736629 * time) % 360);
		return 180 - d;
	};

	function getSolarData(time: number) {
		const t = time / 36525;
		// const d = 360 - ((280.46061837 + 360.98564736629 * time) % 360);
		const e = (23.4393 - 0.0000003563 * time) % 360;
		const L2 = (280.461 + 0.9856474 * time) % 360;
		const G = (357.528 + 35999.05 * t) % 360;
		const ec =
			1.915 * Math.sin(toRadians(G)) + 0.02 * Math.sin(toRadians(2 * G));
		const l = L2 + ec;
		const X = Math.cos(toRadians(l));
		const Y = Math.cos(toRadians(e)) * Math.sin(toRadians(l));

		const a = (() => (toDegrees(Math.atan(Y / X)) + (X < 0 ? 180 : 0)) % 360)();

		// const LST = 180 - d;
		const LST = getLST(time);
		const GHA = (LST - a + 180) % 360; // GHA completed

		const LHA = getLHA(GHA);

		const declination = toDegrees(
			Math.asin(Math.sin(toRadians(e)) * Math.sin(toRadians(l)))
		); // Declination completed

		const azimuth = getAzimuth(LHA, declination); // Azimuth completed

		return {
			GHA,
			LHA,
			declination,
			azimuth,
		};
	}

	function getMoonData(time: number) {
		const Ms = toRadians(356.047 + 0.9856002585 * (time + 1.5)) % (2 * Math.PI);
		const ws = toRadians(282.9404 + 0.0000470935 * (time + 1.5));
		const ls = Ms + ws;
		const Nm = toRadians(125.1228 - 0.0529538083 * (time + 1.5));
		const wm = toRadians(318.0634 + 0.1643573223 * (time + 1.5));
		const Mm =
			toRadians(115.3654 + 13.0649929509 * (time + 1.5)) % (2 * Math.PI);
		const Lm = Nm + wm + Mm;
		const D = Lm - ls;
		const Em = Mm + 0.0549 * Math.sin(Mm) * (1 + 0.0549 * Math.cos(Mm));
		const xvm = 60.2666 * (Math.cos(Em) - 0.0549);
		const yvm = 60.2666 * (Math.sqrt(1 - 0.0549 * 0.0549) * Math.sin(Em));
		const sunrm = Math.sqrt(xvm * xvm + yvm * yvm); // rm in excel
		const rml = sunrm - 0.58 * Math.cos(Mm - 2 * D);
		const rm = rml - 0.46 * Math.cos(2 * D);
		const F = Lm - Nm;

		const dlo1 = -1.274 * Math.sin(Mm - 2 * D);
		const dlo2 = dlo1 + 0.658 * Math.sin(2 * D);
		const dlo3 = dlo2 - 0.186 * Math.sin(Ms);
		const dlo4 = dlo3 - 0.059 * Math.sin(2 * Mm - 2 * D);
		const dlo5 = dlo4 - 0.057 * Math.sin(Mm - 2 * D + Ms);
		const dlo6 = dlo5 + 0.053 * Math.sin(Mm + 2 * D);
		const dlo7 = dlo6 + 0.046 * Math.sin(2 * D - Ms);
		const dlo8 = dlo7 + 0.041 * Math.sin(Mm - Ms);
		const dlo9 = dlo8 - 0.035 * Math.sin(D);
		const dlo10 = dlo9 - 0.031 * Math.sin(Mm + Ms);
		const dlo11 = dlo10 - 0.015 * Math.sin(2 * F - 2 * D);
		const dlo12 = dlo11 + 0.011 * Math.sin(Mm - 4 * D);

		const vm = (() => {
			let vm;
			if (xvm > 0) {
				vm = toDegrees(Math.atan(yvm / xvm));
			} else {
				if (xvm === 0) {
					vm = yvm < 0 ? -90 : 90;
				} else {
					vm = toDegrees(Math.atan(yvm / xvm)) + 180;
				}
			}

			return toRadians(vm) % (2 * Math.PI);
		})();

		const im = toRadians(5.1454);
		const xh =
			sunrm *
			(Math.cos(Nm) * Math.cos(vm + wm) -
				Math.sin(Nm) * Math.sin(vm + wm) * Math.cos(im));
		const yh =
			sunrm *
			(Math.sin(Nm) * Math.cos(vm + wm) +
				Math.cos(Nm) * Math.sin(vm + wm) * Math.cos(im));
		const zh = sunrm * (Math.sin(vm + wm) * Math.sin(im));
		const x = Math.sqrt(xh * xh + yh * yh);

		const loneclm = (() => {
			let loneclm;
			if (xh > 0) {
				loneclm = toDegrees(Math.atan(yh / xh));
			} else {
				if (xh === 0) {
					loneclm = yh < 0 ? -90 : 90;
				} else {
					loneclm = toDegrees(Math.atan(yh / xh)) + 180;
				}
			}
			return toDegrees(toRadians(loneclm));
		})();
		const lonm = toRadians(dlo12 + loneclm);
		const dla1 = -0.173 * Math.sin(F - 2 * D);
		const dla2 = dla1 - 0.055 * Math.sin(Mm - F - 2 * D);
		const dla3 = dla2 - 0.046 * Math.sin(Mm + F - 2 * D);
		const dla4 = dla3 + 0.033 * Math.sin(F + 2 * D);
		const dla5 = dla4 + 0.017 * Math.sin(2 * Mm + F);

		const latecl = (() => {
			let latecl;

			if (x > 0) {
				latecl = toDegrees(Math.atan(zh / x));
			} else {
				if (x === 0) {
					latecl = zh < 0 ? -90 : 90;
				} else {
					latecl = toDegrees(Math.atan(zh / x)) + 180;
				}
			}

			return toDegrees(toRadians(latecl));
		})();

		const latm = toRadians(latecl + dla5);
		const xg = rm * Math.cos(lonm) * Math.cos(latm);
		const zg = rm * Math.sin(latm);
		const ecl = toRadians((23.4393 - 0.0000003563 * (time + 1.5)) % 360);
		const yg = rm * Math.sin(lonm) * Math.cos(latm);
		const ye = yg * Math.cos(ecl) - zg * Math.sin(ecl);

		const Ram = (() => {
			let ram;
			if (xg > 0) {
				ram = toDegrees(Math.atan(ye / xg));
			} else {
				if (xg === 0) {
					ram = ye < 0 ? -90 : 90;
				} else {
					ram = toDegrees(Math.atan(ye / xg)) + 180;
				}
			}

			return toDegrees(toRadians(ram));
		})();

		const LST = getLST(time);
		const GHA = mod(LST - Ram - 180, 360);

		const decX = Math.sqrt(xg * xg + ye * ye);
		const ze = yg * Math.sin(ecl) + zg * Math.cos(ecl);
		const declination = (() => {
			let declination;

			if (decX > 0) {
				declination = toDegrees(Math.atan(ze / decX));
			} else {
				if (decX === 0) {
					declination = ze < 0 ? -90 : 90;
				} else {
					declination = toDegrees(Math.atan(ze / decX)) + 180;
				}
			}
			return toDegrees(toRadians(declination));
		})();

		const LHA = getLHA(GHA);

		return {
			GHA,
			LHA: LHA,
			declination: declination,
			azimuth: getAzimuth(LHA, declination),
		};
	}

	function getStarData(time: number, givenStar?: string) {
		const t = time / 36525;
		const d = 360 - ((280.46061837 + 360.98564736629 * time) % 360);
		const Om = (125.04452 - 1934.136261 * t) % 360;
		const L = (280.4665 + 36000.7698 * t) % 360;
		const L1 = (218.3165 + 481267.8813 * t) % 360;
		const e = (23.4393 - 0.0000003563 * time) % 360;
		const de =
			9.2 * Math.cos(toRadians(Om)) +
			0.57 * Math.cos(toRadians(2 * L)) +
			0.1 * Math.cos(toRadians(2 * L1)) -
			0.09 * Math.cos(toRadians(2 * Om));
		const dp = -(17.2 * Math.sin(toRadians(Om)) -
			1.32 * Math.sin(toRadians(2 * L)) -
			0.23 * Math.sin(toRadians(2 * L1)) +
			0,
		21 * Math.sin(toRadians(2 * Om)));

		const corr = (dp * Math.cos(toRadians(e + de))) / 3600;

		const GHA = (360 - d - corr) % 360; // GHA Aries
		const LHA = getLHA(GHA);

		const starData = celestialObjects.stars.find(
			(star) => star.value === givenStar
		);

		if (!starData) {
			return;
		}

		const date = dateToExcelSerial(givenDateTime);
		const dec2000 = Number(starData.dec2000);
		const ra2000 = Number(starData.ra2000);
		const nutdl =
			-17.3 * Math.sin(toRadians(125 - 0.05295 * (date - 2451545))) -
			1.4 * Math.sin(toRadians(200 + 1.97129 * (date - 2451545)));
		const nutde =
			9.4 * Math.cos(toRadians(125 - 0.05295 * (date - 2451545))) +
			0.7 * Math.cos(toRadians(200 + 1.97129 * (date - 2451545)));
		const decpr =
			dec2000 +
			(20.04 * Math.cos(toRadians(ra2000 * 15)) * (date - 36526)) / 365 / 3600;
		const declination =
			decpr +
			(0.3978 * Math.cos(toRadians(ra2000 * 15)) * nutdl +
				Math.sin(toRadians(ra2000)) * nutde) /
				3600;
		const SHApr = mod(
			360 -
				(ra2000 +
					((3.075 +
						1.336 *
							Math.sin(toRadians(ra2000)) *
							Math.tan(toRadians(dec2000))) *
						(date - 36526)) /
						365 /
						3600) *
					15,
			360
		);
		const SHA =
			SHApr +
			(0.9175 +
				0.3978 *
					Math.sin(toRadians(ra2000 * 15) * Math.tan(toRadians(dec2000))) *
					nutdl -
				Math.cos(toRadians(ra2000 * 15)) *
					Math.tan(toRadians(dec2000)) *
					nutde) /
				3600;

		return {
			GHA,
			LHA,
			declination,
			azimuth: getAzimuth(LHA, declination, SHA),
		};
	}

	function getSolarCoordinates(time: number) {
		const ws = toRadians(282.9404 + 0.0000470935 * (time + 1.5));
		const es = 0.016709 - 0.000000001151 * (time + 1.5);
		const Ms = mod(
			toRadians(356.047 + 0.9856002585 * (time + 1.5)),
			2 * Math.PI
		);
		const Es = Ms + es * Math.sin(Ms) * (1 + es * Math.cos(Ms));
		const xv = Math.cos(Es) - es;
		const yv = Math.sqrt(1 - es * es) * Math.sin(Es);
		const vs = (() => {
			let vs;

			if (xv > 0) {
				vs = toDegrees(Math.atan(yv / xv));
			} else {
				if (xv === 0) {
					vs = yv < 0 ? -90 : 90;
				} else {
					vs = toDegrees(Math.atan(yv / xv)) + 180;
				}
			}

			return mod(toRadians(vs), 2 * Math.PI);
		})();

		const rs = Math.sqrt(xv * xv + yv * yv);
		const lons = vs + ws;
		const e = mod(23.4393 - 0.0000003563 * time, 360);
		return {
			rs,
			lons,
			e,
		};
	}

	function calculatePlanetData(
		time: number,
		N: number,
		i: number,
		w: number,
		e: number,
		a: number,
		M: number,
		loncorr: number
	) {
		const E = M + e * Math.sin(M) * (1 + e * Math.cos(M));

		const xv = a * (Math.cos(E) - e);
		const yv = a * (Math.sqrt(1 - e * e) * Math.sin(E));
		const v = (() => {
			let v;

			if (xv > 0) {
				v = toDegrees(Math.atan(yv / xv));
			} else {
				if (xv === 0) {
					v = yv < 0 ? -90 : 90;
				} else {
					v = toDegrees(Math.atan(yv / xv)) + 180;
				}
			}

			return mod(toRadians(v), 2 * Math.PI);
		})();

		const r = Math.sqrt(xv * xv + yv * yv);

		const xh =
			r *
			(Math.cos(N) * Math.cos(v + w) -
				Math.sin(N) * Math.sin(v + w) * Math.cos(i));
		const yh =
			r *
			(Math.sin(N) * Math.cos(v + w) +
				Math.cos(N) * Math.sin(v + w) * Math.cos(i));
		const zh = r * (Math.sin(v + w) * Math.sin(i));

		const lonecl = (() => {
			let lonecl;

			if (xh > 0) {
				lonecl = toDegrees(Math.atan(yh / xh));
			} else {
				if (xh === 0) {
					lonecl = yh < 0 ? -90 : 90;
				} else {
					lonecl = toDegrees(Math.atan(yh / xh)) + 180;
				}
			}

			return toDegrees(toRadians(lonecl)) + loncorr;
		})();

		const x = Math.sqrt(xh * xh + yh * yh);

		const latecl = (() => {
			let latecl;

			if (x > 0) {
				latecl = toDegrees(Math.atan(zh / x));
			} else {
				if (x === 0) {
					latecl = zh < 0 ? -90 : 90;
				} else {
					latecl = toDegrees(Math.atan(zh / x)) + 180;
				}
			}

			return toDegrees(toRadians(latecl));
		})();

		const XH = r * Math.cos(toRadians(lonecl)) * Math.cos(toRadians(latecl));
		const YH = r * Math.sin(toRadians(lonecl)) * Math.cos(toRadians(latecl));
		const ZH = r * Math.sin(toRadians(latecl));

		const sun = getSolarCoordinates(time);

		const xs = sun.rs * Math.cos(sun.lons + toRadians(loncorr));
		const ys = sun.rs * Math.sin(sun.lons + toRadians(loncorr));

		const xg = XH + xs;
		const yg = YH + ys;
		const zg = ZH;

		const xe = xg;
		const ye =
			yg * Math.cos(toRadians(sun.e)) - zg * Math.sin(toRadians(sun.e));
		const ze =
			yg * Math.sin(toRadians(sun.e)) + zg * Math.cos(toRadians(sun.e));

		const X = Math.sqrt(xe * xe + ye * ye);

		const declination = (() => {
			let declination;

			if (X > 0) {
				declination = toDegrees(Math.atan(ze / X));
			} else {
				if (X === 0) {
					declination = ze < 0 ? -90 : 90;
				} else {
					declination = toDegrees(Math.atan(ze / X)) + 180;
				}
			}

			return toDegrees(toRadians(declination));
		})();

		const LST = getLST(time);

		const Ra = (() => {
			let Ra;

			if (xg > 0) {
				Ra = toDegrees(Math.atan(ye / xg));
			} else {
				if (xg === 0) {
					Ra = ye < 0 ? -90 : 90;
				} else {
					Ra = toDegrees(Math.atan(ye / xg)) + 180;
				}
			}

			return toDegrees(toRadians(Ra));
		})();

		const GHA = mod(LST - Ra - 180, 360);
		const LHA = getLHA(GHA);

		return {
			GHA,
			LHA,
			declination,
			azimuth: getAzimuth(LHA, declination),
		};
	}

	function getPlanetData(time: number, planet?: string) {
		const date = dateToExcelSerial(givenDateTime);
		let N: number = 0;
		let i: number = 0;
		let w: number = 0;
		let a: number = 0;
		let e: number = 0;
		let M: number = 0;
		let loncorr: number = 0;

		switch (planet) {
			case "mars":
				N = toRadians(49.5574 + 0.0000211081 * (time + 1.5));
				i = toRadians(1.8497 - 0.0000000178 * (time + 1.5));
				w = toRadians(286.5016 + 0.0000292961 * (time + 1.5));
				a = 1.523688;
				e = 0.093405 + 0.000000002516 * (time + 1.5);
				M = mod(toRadians(18.6021 + 0.5240207766 * (time + 1.5)), 2 * Math.PI);
				loncorr =
					0.0000382394 *
					(365.2422 * (2000 - (36526 - date) / 365 - 2000) - (time + 1.5));
				break;

			case "venus":
				N = toRadians(76.6799 + 0.000024659 * (time + 1.5));
				i = toRadians(3.3946 + 0.0000000275 * (time + 1.5));
				w = toRadians(54.891 + 0.0000138374 * (time + 1.5));
				a = 0.72333;
				e = 0.006773 - 0.000000001302 * (time + 1.5);
				M = mod(toRadians(48.0052 + 1.6021302244 * (time + 1.5)), 2 * Math.PI);
				loncorr =
					0.0000382394 *
					(365.2422 * (2000 - (36526 - date) / 365 - 2000) - (time + 1.5));
				break;

			case "jupiter":
				N = toRadians(100.4542 + 0.0000276854 * (time + 1.5));
				i = toRadians(1.303 - 0.0000001557 * (time + 1.5));
				w = toRadians(273.8777 + 0.0000164505 * (time + 1.5));
				a = 5.20256;
				e = 0.048498 + 0.000000004469 * (time + 1.5);
				M = mod(toRadians(19.895 + 0.0830853001 * (time + 1.5)), 2 * Math.PI);
				loncorr =
					0.0000382394 *
					(365.2422 * (2000 - (36526 - date) / 365 - 2000) - (time + 1.5));
				break;

			case "saturnus":
				N = toRadians(113.6634 + 0.000023898 * (time + 1.5));
				i = toRadians(2.4886 - 0.0000001081 * (time + 1.5));
				w = toRadians(339.3939 + 0.0000297661 * (time + 1.5));
				a = 9.55475;
				e = 0.055546 - 0.000000009499 * (time + 1.5);
				M = mod(toRadians(316.967 + 0.0334442282 * (time + 1.5)), 2 * Math.PI);
				loncorr =
					0.0000382394 *
					(365.2422 * (2000 - (36526 - date) / 365 - 2000) - (time + 1.5));
				break;
		}

		return calculatePlanetData(time, N, i, w, e, a, M, loncorr);
	}

	function performCalculations() {
		const date = dateToExcelSerial(givenDateTime);
		const hours = givenDateTime.getUTCHours();
		const minutes = givenDateTime.getUTCMinutes();
		const seconds = givenDateTime.getUTCSeconds();

		const time =
			-36525 + date - 1.5 + (hours + minutes / 60 + seconds / 3600) / 24;
		// const b = -36525 + date - 1.5 + hours / 24;
		// const c = -36525 + date - 1.5 + (hours + 1) / 24;

		latitude = Number(latitude);
		longitude = Number(longitude);

		const objectData = (() => {
			switch (object) {
				case "sun":
					return getSolarData(time);
				case "moon":
					return getMoonData(time);
				case "stars":
					return getStarData(time, givenStarOrPlanet);
				case "planets":
					return getPlanetData(time, givenStarOrPlanet);
			}
		})();

		if (!objectData) {
			return;
		}

		azimuth = Number(objectData.azimuth);
		LHA = Number(objectData.LHA);
		declination = Number(objectData.declination);
		GHA = Number(objectData.GHA);
	}

	onMount(() => {
		performCalculations();
	});

	function transformToCoordinates(
		number: number,
		direction: "x" | "y" | undefined = undefined
	) {
		const sign = (() => {
			if (!direction) {
				return "";
			}
			if (direction === "y") {
				return number < 0 ? "S" : "N";
			} else {
				return number < 0 ? "W" : "E";
			}
		})();
		number = number > 0 ? number : -number;
		return `${Math.trunc(number)}°${((number - Math.floor(number)) * 60).toFixed(1)} ${sign}`;
	}

	let field: SvelteComponent;
	$: {
		if (field && !givenStarOrPlanet) {
			field.openRemotely();
		}
	}

	let Geolocation: GeolocationPlugin | undefined = undefined

	async function getCurrentPosition() {
		return Geolocation?.getCurrentPosition();
	}

	let isLoadingPosition: boolean = false;
	let positionObtained = false;

	function updatePosition() {
		isLoadingPosition = true;
		getCurrentPosition()
			.then((position) => {
				if (position) {
					longitude = Number(position.coords.longitude);
					latitude = Number(position.coords.latitude);
					positionObtained = !positionObtained;
					performCalculations();
				}
			})
			.finally(() => {
				isLoadingPosition = false;
			});
	}

	onMount(async () => {
		if (browser) {
			const geoModule = await import("@capacitor/geolocation");
			Geolocation = geoModule.Geolocation;
		}

		Geolocation?.checkPermissions()
		.then((result) => {
			if (result.location === 'granted') {
				updatePosition();
			}
		});
	})

	title.set("Gyro Error");
</script>

<!-- <section class="Celestial equal-flex mobile space-xl max-width"> -->
<EqualGrid --desktopColumnsQty="{3}" --mobileColumnsQty="{1}" --tabletColumnsQty="{1}" >
	<div class="vertical-flex max-width space-xl">
		<Section title="General data">
			<FormItem label="Choose object">
				<SelectButtons
					items={solarSystemObjects}
					bind:selectedItem={object}
					on:choose={() => {
						givenStarOrPlanet = undefined;
						if (object === "sun" || object === "moon") performCalculations();
					}}
				/>
			</FormItem>
			{#key object}
				{#if object === "planets" || object === "stars"}
					<Select
						bind:this={field}
						items={celestialObjects[object]}
						bind:value={givenStarOrPlanet}
						placeholder="Choose object"
						on:select={performCalculations}
					></Select>
				{/if}
			{/key}
			<NewDateTimeInput
				bind:value={givenDateTime}
				on:change={performCalculations}
			/>
			<FormItem label="Latitude">
				{#key positionObtained}
					<CoordinatesInput
						coordinatesType="latitude"
						bind:value={latitude}
						on:change={performCalculations}
					/>
				{/key}
			</FormItem>
			<FormItem label="Longitude">
				{#key positionObtained}
					<CoordinatesInput
						coordinatesType="longitude"
						bind:value={longitude}
						on:change={performCalculations}
					/>
				{/key}
			</FormItem>
			<Button
				icon="location_on"
				label="Set current position"
				on:click={updatePosition}
				isLoading={isLoadingPosition}
				maxwidth
			/>
		</Section>
		<Section title="Ship's heading">
			<FormItem label="True course">
				{#if GC && azimuth && GB}
					<span>{(GC - (azimuth - GB)).toFixed(1)}&#176;</span>
				{:else}
					<span>-</span>
				{/if}
			</FormItem>
			<FormItem label="Gyro course">
				<Input
					type="number"
					bind:value={GC}
					min={0}
					max={360}
					step={0.1}
					placeholder="181.0"
				/>
			</FormItem>
			<FormItem label="Standard course">
				<Input
					type="number"
					bind:value={MC}
					min={0}
					max={360}
					step={0.1}
					placeholder="182.0"
				/>
			</FormItem>
		</Section>
	</div>
	<div class="vertical-flex max-width space-xl">
		<Section title="Object's bearing">
			<FormItem label="True">
				{#if azimuth}
					<span>{azimuth.toFixed(1)}&#176;</span>
				{:else}
					<span>-</span>
				{/if}
			</FormItem>
			<FormItem label="Gyro">
				<Input
					type="number"
					bind:value={GB}
					min={0}
					max={360}
					step={0.1}
					placeholder="242.3"
				/>
			</FormItem>
			<FormItem label="Standard">
				{#if MC && TC && azimuth}
					<span>{(azimuth + (MC - TC)).toFixed(1)}&#176;</span>
				{:else}
					<span>-</span>
				{/if}
			</FormItem>
		</Section>
		<Section title="Corrections">
			<FormItem label="Gyro Error">
				{#if azimuth && GB}
					 <span>{ formatToCompassError(azimuth - GB) }</span>
				{:else}
					<span>-</span>
				{/if}
			</FormItem>
			<FormItem label="Standard">
				{#if MC && TC && azimuth}
					 <span>{ formatToCompassError(TC - MC) }</span>
				{:else}
					<span>-</span>
				{/if}
			</FormItem>
			<FormItem label="Variation">
				<VariationInput bind:value={variation} />
			</FormItem>
			<FormItem label="Deviation">
				{#if TC && MC && variation}
					 <span>{formatToCompassError(TC - MC - variation)}</span>
				{:else}
					<span>-</span>
				{/if}
			</FormItem>
		</Section>
	</div>
	<Section title="Calculated data">
		<EqualGrid --mobileColumnsQty="2" --tabletColumnsQty="{2}" --desktopColumnsQty={2}>
			<FormItem label="GHA">
				<span class="text-size-m">{transformToCoordinates(GHA)}</span>
			</FormItem>
			<FormItem label="LHA">
				<span class="text-size-m">{transformToCoordinates(LHA)}</span>
			</FormItem>
			<FormItem label="Declination">
				<span class="text-size-m"
					>{transformToCoordinates(declination, "y")}</span
				>
			</FormItem>
			<FormItem label="Azimuth">
				<span class="text-size-m">{Number(azimuth).toFixed(1)}&#176;</span>
			</FormItem>
		</EqualGrid>
	</Section>
	</EqualGrid>
<!-- </section> -->
