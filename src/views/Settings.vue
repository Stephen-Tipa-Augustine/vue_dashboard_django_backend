
<template>
  <div class="wrapper">

    <SideNavBar />

		<div class="main">

      <TopNavBar />

			<main class="content">
				<div class="container-fluid p-0">

					<h1 class="h3 mb-3"><strong>Analytics</strong> Settings</h1>

				</div>
			</main>

			<Footer />
		</div>
	</div>
</template>

<script>
import TopNavBar from "../components/TopNavBar.vue";
import SideNavBar from "../components/SideNavBar.vue";
import Footer from "../components/Footer.vue";
export default {
  components: {TopNavBar, SideNavBar, Footer}
}


</script>
