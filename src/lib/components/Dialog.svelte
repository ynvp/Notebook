<script>
	export let dialog;

</script>
<dialog bind:this={dialog} on:close style="position: fixed;
    width: 50%;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    animation: fadeIn 0.3s;">
	<slot/>

</dialog>
