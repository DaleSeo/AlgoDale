<script>
	import MaxWidthWrapper from '$lib/components/MaxWidthWrapper.svelte';
	import Logo from '$lib/components/FooterLogo.svelte';
	import Social from '$lib/components/Social.svelte';
</script>

<div>
	<MaxWidthWrapper>
		<footer>
			<section class="left">
				<Logo />
				<Social />
			</section>
			<section>
				<p>© 2021-{new Date().getFullYear()} AlgoDale. All Rights Reserved.</p>
			</section>
		</footer>
	</MaxWidthWrapper>
</div>

<style>
	div {
		isolation: isolate;
		transition: background 350ms ease 0s;
		background: var(--color-background);
	}

	footer {
		padding: var(--spacing-8);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
	}

	section.left {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-4);
		justify-content: space-around;
		align-items: center;
	}

	p {
		text-align: center;
		font-size: var(--font-size-3);
		font-weight: var(--font-weight-regular);
		color: var(--color-gray);
	}
</style>
