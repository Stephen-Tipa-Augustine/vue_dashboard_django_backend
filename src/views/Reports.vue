
<template>
  <div class="wrapper">

    <SideNavBar />

		<div class="main">

      <TopNavBar />

			<main class="content">
				<div class="container-fluid p-0">

					<h1 class="h3 mb-3"><strong>Analytics</strong> Reports</h1>

          <div class="container-fluid">
            <div class="row">
              <div co></div>
            </div>
          </div>

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
