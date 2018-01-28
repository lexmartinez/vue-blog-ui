<template>
  <transition name="fade">
  <article class="post">
    <header>
      <div class="title">
        <h2>
          <i class="fa fa-tags"></i> Tags
        </h2>

      </div>
      <div style="margin-right:50px; margin-top: 40px;">
        <a class="button" style="cursor: pointer"  @click="detailModal({})"><i class="fa fa-plus fa-lg"></i> New Tag</a>
      </div>
    </header>

    <table>
      <thead>
      <tr>
        <th style="width: 200px;">
          <a style="cursor: pointer"  @click="setColumn('id')">ID</a>
          <a style="cursor: pointer; margin-left: 20px"  @click="setOrder(order==='ASC'?'DESC':'ASC')" v-if="column==='id'"><i class="fa" :class="{ 'fa-caret-down': order==='ASC', 'fa-caret-up': order==='DESC' }" aria-hidden="true"></i></a>
        </th>
        <th>
          <a style="cursor: pointer"  @click="setColumn('name')">NAME</a>
          <a style="cursor: pointer; margin-left: 20px"  @click="setOrder(order==='ASC'?'DESC':'ASC')" v-if="column==='name'"><i class="fa" :class="{ 'fa-caret-down': order==='ASC', 'fa-caret-up': order==='DESC' }" aria-hidden="true"></i></a>
        </th>
        <th style="width: 300px; text-align: center">ACTIONS</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="tag in tags">
          <td>{{tag.id}}</td>
          <td>{{tag.name}}</td>
          <td style="text-align: center">
            <a class="button" style="cursor: pointer"  @click="detailModal(tag)"><i class="fa fa-pencil fa-lg"></i> Edit</a>
            <a class="button" style="cursor: pointer"  @click="deleteModal(tag)"><i class="fa fa-trash fa-lg"></i> Delete</a>
          </td>
        </tr>
      </tbody>
    </table>

    <div style="text-align: right">
    <a class="button" style="cursor: pointer"  @click="previous()"><i class="fa fa-chevron-left fa-lg"></i> Previous </a>
    <a class="button" style="cursor: pointer"  @click="next()">Next <i class="fa fa-chevron-right fa-lg"></i> </a>
    </div>

    <modal name="detail-modal" :height="'auto'" :adaptive="true">
      <div style="margin:30px">
        <h2>Tag Detail</h2>
        <p style="text-align: justify;">ID: <input type="text" v-model="tag.id" readonly></p>
        <p style="text-align: justify;">NAME: <input type="text" v-model="tag.name"></p>
        <p style="text-align: right;">
          <a class="button small" style="cursor: pointer"  @click="closeModal"><i class="fa fa-times fa-lg"></i> CANCEL</a>
          <a class="button small" style="cursor: pointer"  @click="saveData"><i class="fa fa-floppy-o fa-lg"></i> SAVE DATA</a>
        </p>
      </div>
    </modal>

    <modal name="delete-modal" :height="'auto'" :adaptive="true">
      <div style="margin:30px">
        <h2>Delete Tag</h2>
        <p style="text-align: center;">Are you sure you want delete this item?</p>
        <p style="text-align: right;">
          <a class="button small" style="cursor: pointer"  @click="closeModal"><i class="fa fa-times fa-lg"></i> CANCEL</a>
          <a class="button small" style="cursor: pointer"  @click="deleteData"><i class="fa fa-check fa-lg"></i> CONFIRM</a>
        </p>
      </div>
    </modal>

  </article>
  </transition>
</template>

<script>
import service from '@/services/TagService'
import VueNotifications from 'vue-notifications'

export default {
  name: 'blog-tags',
  resource: 'BlogTags',
  data () {
    return {
      tags: [],
      tag: {},
      total: 0,
      limit: 10,
      offset: 0,
      order: 'ASC',
      column: 'name'
    }
  },
  methods: {
    load () {
      this.$Progress.start()
      service.page(this.offset, this.limit, this.column, this.order)
        .then(response => {
          this.$Progress.finish()
          this.tags = response.data
          this.total = Number(response.headers['x-total-rows'])
        })
        .catch(e => {
          this.$Progress.fail()
          this.showErrorMsg({message: '... we got problems fetching list', title: 'Uh oh!', timeout: 5000})
        })
    },
    detailModal (obj) {
      this.tag = JSON.parse(JSON.stringify(obj))
      this.$modal.show('detail-modal')
    },
    next () {
      if ((this.offset + this.limit) < this.total) {
        this.offset = this.offset + this.limit
        this.load()
      }
    },
    previous () {
      if (this.offset > 0) {
        this.offset = this.offset - this.limit
        this.load()
      }
    },
    deleteModal (obj) {
      this.tag = obj
      this.$modal.show('delete-modal')
    },
    setColumn (column) {
      this.column = column
      this.load()
    },
    setOrder (order) {
      this.order = order
      this.load()
    },
    closeModal () {
      this.tag = {}
      this.$modal.hide('detail-modal')
      this.$modal.hide('delete-modal')
    },
    saveData () {
      if (this.tag.name && /^([a-z0-9-])+$/.test(this.tag.name)) {
        this.$Progress.start()
        if (this.tag.id) {
          service.update(this.tag.id, this.tag)
            .then(response => {
              this.$Progress.finish()
              this.$modal.hide('detail-modal')
              this.tag = {}
              this.load()
            })
            .catch(e => {
              this.$Progress.fail()
              this.showErrorMsg({message: '... we got problems updating data', title: 'Uh oh!', timeout: 5000})
            })
        } else {
          service.create(this.tag)
            .then(response => {
              this.$Progress.finish()
              this.$modal.hide('detail-modal')
              this.tag = {}
              this.load()
            })
            .catch(e => {
              this.$Progress.fail()
              this.showErrorMsg({message: '... we got problems saving data', title: 'Uh oh!', timeout: 5000})
            })
        }
      }
    },
    deleteData () {
      this.$Progress.start()
      service.delete(this.tag.id)
        .then(response => {
          this.$Progress.finish()
          this.$modal.hide('delete-modal')
          this.tag = {}
          this.load()
        })
        .catch(e => {
          this.$Progress.fail()
          this.showErrorMsg({message: '... we got problems deleting data', title: 'Uh oh!', timeout: 5000})
        })
    }
  },
  notifications: {
    showSuccessMsg: {
      type: VueNotifications.types.success
    },
    showInfoMsg: {
      type: VueNotifications.types.info
    },
    showWarnMsg: {
      type: VueNotifications.types.warn
    },
    showErrorMsg: {
      type: VueNotifications.types.error
    }
  },
  created () {
    this.limit = 10
    this.offset = 0
    this.load()
  }
}
</script>
