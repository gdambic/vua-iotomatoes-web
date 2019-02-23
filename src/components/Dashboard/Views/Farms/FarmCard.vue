<template>
  <div class="card">
    <div class="header mb-1">
      <h4 class="title pull-left">{{ farm.name }}</h4>
      <router-link
        class="btn btn-primary pull-right"
        v-if="edit"
        tag="button"
        :to="{ name: 'edit-farm', params: { id: farm.id } }"
      >
        <span class="ti-pencil icon"></span>Edit
      </router-link>
      <div class="clearfix"></div>
    </div>
    <div class="content content-fixed">
      <div class="row">
        <div class="col-lg-12">
          <google-map
            :longitude="farm.longitude"
            :latitude="farm.latitude"
            :title="farm.name"
            :height="220"
          />
        </div>
      </div>
      <div class="row mb-1">
        <div class="col-lg-6">
          <label>Address</label>
          <p>{{ farm.address }}</p>
        </div>
        <div class="col-lg-6">
          <label>City</label>
          <p>{{ farm.cityName }}</p>
        </div>
      </div>
      <div class="row mb-1">
        <div class="col-lg-6">
          <label>Date created</label>
          <p>
            <span class="d-block">{{ farm.dateCreated | date }}</span>
            <span>{{ farm.dateCreated | time }}</span>
          </p>
        </div>
        <div class="col-lg-6">
          <label>Date modified</label>
          <p>
            <span class="d-block">{{ farm.dateModified | date }}</span>
            <span>{{ farm.dateModified | time }}</span>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <label>Description</label>
          <p>{{ farm.description }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3">
          <label>Active ruleset</label>
          <p>{{ farm.ruleSetName | default }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    farm: Object,
    edit: Boolean
  }
};
</script>

<style scoped>
.content-fixed {
  height: 500px;
  overflow-y: scroll;
}

::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
