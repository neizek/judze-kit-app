	export interface ImageInterface {
		src: string;
		alt: string;
		bgColor?: string;
	}

	export interface DetailType {
		tag: string;
		title?: string;
		text?: string;
		class?: string;
		children?: DetailType[];
	}