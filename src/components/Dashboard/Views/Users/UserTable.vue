<template>
  <div class="card" style="height: 700px;">
    <div class="content table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th class="idenitifer">#</th>
            <th>First name</th>
            <th>Last name</th>
            <th>E-mail</th>
            <th>Active</th>
            <th>Created</th>
            <th>Modified</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="identifier">{{ user.id }}</td>
            <td>{{ user.firstName | default }}</td>
            <td>{{ user.lastName | default }}</td>
            <td>{{ user.email | default }}</td>
            <td>{{ user.active ? 'Yes' : 'No' | default }}</td>
            <td>{{ user.dateCreated  | datetime | default }}</td>
            <td>{{ user.dateModified | datetime | default }}</td>
            <td>
              <router-link
                tag="button"
                class="btn btn-secondary mr-1"
                :to="{ name: 'edit-user', params: { id: user.id }}"
              >
                <span class="ti-pencil icon"></span>Edit
              </router-link>
              <button :class="`btn ${user.active ? 'btn-danger' : 'btn-success'} btn-wd`" @click="$emit('updateStatus', user.id)">
                <span :class="`${user.active ? 'ti-close' : 'ti-check' } icon`"></span>
                <span>{{ user.active ? 'Disable' : 'Activate' }}</span>
              </button>
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
    users: {
      type: Array,
      required: true
    }
  }
};
</script>

<style>
</style>
