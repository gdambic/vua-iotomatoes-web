<template>
  <div class="card" style="height: 700px;">
    <div class="content table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th class="identifier">#</th>
            <th>Name</th>
            <th>User</th>
            <th>Address</th>
            <th>City</th>
            <th>Created</th>
            <th>Modified</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="farm in farms" :key="farm.id">
            <td class="identifier">{{ farm.id }}</td>
            <td>{{ farm.name }}</td>
            <td>{{ farm.userFullName | default }}</td>
            <td>{{ farm.address }}</td>
            <td>{{ farm.cityName }}</td>
            <td>{{ farm.dateCreated | datetime }}</td>
            <td>{{ farm.dateModified | datetime }}</td>
            <td>
              <router-link
                tag="button"
                class="btn btn-secondary"
                :to="{ name: 'edit-farm', params: { id: farm.id }}"
              >
                <span class="ti-pencil icon"></span>Edit
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    farms: {
      type: Array,
      required: true
    }
  }
};
</script>

<style>
</style>
