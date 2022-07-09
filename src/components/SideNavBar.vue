<template>
<nav id="sidebar" class="sidebar js-sidebar">
			<div class="sidebar-content js-simplebar">
        <div style="width: 100%;">
          <img src="/img/icons/logo.png" class="logo-img" alt="Logo">
        </div>

				<a class="sidebar-brand" style="text-align: center;" href="#">
          <span class="align-middle">Dashboard Demo</span>
        </a>

				<ul class="sidebar-nav">

					<li class="sidebar-item" v-bind:class="{active: 'dashboard' === this.$route.name}">
						<a class="sidebar-link" href="/">
              <i class="align-middle fa-solid fa-search fa-1x"></i> <span class="align-middle side-nav-bar-labels">Dashboard</span>
            </a>
					</li>

					<li class="sidebar-item" v-bind:class="{active: 'reports' === this.$route.name}">
						<a class="sidebar-link" href="/reports">
              <i class="align-middle fa-brands fa-gripfire fa-1x"></i> <span class="align-middle side-nav-bar-labels">Reports</span>
            </a>
					</li>

					<li class="sidebar-item" v-bind:class="{active: 'statistics' === this.$route.name}">
						<a class="sidebar-link" href="/statistics">
              <i class="align-middle fa-solid fa-line-chart fa-1x"></i> <span class="align-middle side-nav-bar-labels">Statistics</span>
            </a>
					</li>

          <li class="sidebar-item" v-bind:class="{active: 'calender' === this.$route.name}">
						<a class="sidebar-link" href="/calender" v-bind:class="{}">
              <i class="align-middle fa-solid fa-calendar fa-1x"></i> <span class="align-middle side-nav-bar-labels">Calender</span>
            </a>
					</li>

          <li class="sidebar-item" v-bind:class="{active: 'maps' === this.$route.name}">
						<a class="sidebar-link" href="/maps">
              <i class="align-middle fa-solid fa-map fa-1x"></i> <span class="align-middle side-nav-bar-labels">Maps</span>
            </a>
					</li>

          <li class="sidebar-item" v-bind:class="{active: 'settings' === this.$route.name}">
						<a class="sidebar-link" href="/settings">
              <i class="align-middle fa-solid fa-cog fa-1x"></i> <span class="align-middle side-nav-bar-labels">Settings</span>
            </a>
					</li>

          <li class="sidebar-item" v-bind:class="{active: 'notifications' === this.$route.name}">
						<a class="sidebar-link" href="/notifications">
              <i class="align-middle fa-solid fa-bell fa-1x"></i> <span class="align-middle side-nav-bar-labels">Notifications</span>
            </a>
					</li>

				</ul>
			</div>
		</nav>
</template>

<script>
export default {
  name: "SideNavBar"
}
</script>

<style scoped>
.side-nav-bar-labels {
  font-size: larger;
}

.logo-img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
  width: 50%;
  border-radius: 50%;
}
</style>
