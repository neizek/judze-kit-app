<script lang="ts">
	import { formatDateSimple } from '$lib/utils/datetime';
	import type { DocumentType } from '$lib/utils/documents';
	import Button from '$ui/Button.svelte';

	export let document: DocumentType;
</script>

<div class="vertical-flex space-l">
	<div class="vertical-flex space">
		<span class="text-size-m">{document.name}</span>
		<span>
			Valid from {formatDateSimple(document.issueDate)} to {formatDateSimple(
				document.expiryDate
			)}
		</span>
	</div>
	<Button type="dangerous" label="Delete Document" icon="delete" />
</div>
