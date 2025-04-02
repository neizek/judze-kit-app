<script lang="ts">
	import { formatDateSimple } from "$lib/datetime";
	import type { DocumentType } from "$lib/documents";
	import Button from "../../../components/ui/Button.svelte";

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
