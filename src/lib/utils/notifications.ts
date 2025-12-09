import { LocalNotifications } from "@capacitor/local-notifications";

export function initNotifications() {
	LocalNotifications.checkPermissions()
		.then((status) => {
			if (status.display === 'prompt' || status.display === 'prompt-with-rationale') {
				LocalNotifications.requestPermissions().catch((err) => {
					console.warn('Notification permission request error:', err);
				});
			}
		})
		.catch((err) => {
			console.warn('Failed to check notification permissions:', err);
		});
}