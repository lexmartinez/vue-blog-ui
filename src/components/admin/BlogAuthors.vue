<template>
  <transition name="fade">
    <article class="post">
      <header>
        <div class="title">
          <h2>
            <i class="fa fa-coffee"></i> Authors
          </h2>

        </div>
        <div style="margin-right:50px; margin-top: 40px;">
          <a class="button" style="cursor: pointer"  @click="detailModal({})"><i class="fa fa-plus fa-lg"></i> New Author</a>
        </div>
      </header>

      <table>
        <thead>
        <tr>
          <th style="width: 200px;">
            <a style="cursor: pointer"  @click="setColumn('id')">ID</a>
            <a style="cursor: pointer; margin-left: 20px"  @click="setOrder(order==='ASC'?'DESC':'ASC')" v-if="column==='id'"><i class="fa" :class="{ 'fa-caret-down': order==='ASC', 'fa-caret-up': order==='DESC' }" aria-hidden="true"></i></a>
          </th>
          <th></th>
          <th><a style="cursor: pointer"  @click="setColumn('alias')">ALIAS</a>
            <a style="cursor: pointer; margin-left: 20px"  @click="setOrder(order==='ASC'?'DESC':'ASC')" v-if="column==='alias'"><i class="fa" :class="{ 'fa-caret-down': order==='ASC', 'fa-caret-up': order==='DESC' }" aria-hidden="true"></i></a></th>
          <th><a style="cursor: pointer"  @click="setColumn('name')">NAME</a>
            <a style="cursor: pointer; margin-left: 20px"  @click="setOrder(order==='ASC'?'DESC':'ASC')" v-if="column==='name'"><i class="fa" :class="{ 'fa-caret-down': order==='ASC', 'fa-caret-up': order==='DESC' }" aria-hidden="true"></i></a></th>
          <th style="width: 300px; text-align: center">ACTIONS</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="author in authors">
          <td>{{author.id}}</td>
          <td style="vertical-align: middle">
            <img :src="author.avatar" class="about-avatar" style="width: 50px; height: 50px"/>
          </td>
          <td>{{author.alias}}</td>
          <td>{{author.name}}</td>
          <td style="text-align: center">
            <a class="button" style="cursor: pointer"  @click="detailModal(author)"><i class="fa fa-pencil fa-lg"></i> Edit</a>
            <a class="button" style="cursor: pointer"  @click="deleteModal(author)"><i class="fa fa-trash fa-lg"></i> Delete</a>
          </td>
        </tr>
        </tbody>
      </table>

      <modal name="detail-modal" :height="'auto'" :width="'80%'" :adaptive="true">
        <div style="margin:30px">
          <h2>Author Detail</h2>
          <div style="width:48%; float:left">
            <p style="text-align: justify;">ID: <input type="text" v-model="author.id" readonly></p>
            <p style="text-align: justify;">ALIAS: <input type="text" v-model="author.alias"></p>
            <p style="text-align: justify;">NAME: <input type="text" v-model="author.name"></p>
            <p style="text-align: justify;">AVATAR: <input type="text" v-model="author.avatar"></p>
          </div>
          <div style="width:48%; float:right; margin-left:4%">
            <p style="text-align: justify;">GITHUB: <input type="text" v-model="author.github"></p>
            <p style="text-align: justify;">TWITTER: <input type="text" v-model="author.twitter"></p>
            <p style="text-align: justify;">BIO: <textarea v-model="author.bio" style="resize: none;"></textarea></p>
          </div>

          <p style="text-align: right;">
            <a class="button small" style="cursor: pointer"  @click="closeModal"><i class="fa fa-times fa-lg"></i> CANCEL</a>
            <a class="button small" style="cursor: pointer"  @click="saveData"><i class="fa fa-floppy-o fa-lg"></i> SAVE DATA</a>
          </p>
        </div>
      </modal>

      <modal name="delete-modal" :height="'auto'" :adaptive="true">
        <div style="margin:30px">
          <h2>Delete Author</h2>
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
  import service from '@/services/AuthorService'
  import VueNotifications from 'vue-notifications'

  export default {
    name: 'blog-authors',
    resource: 'BlogAuthors',
    data () {
      return {
        authors: [],
        author: {},
        order: 'ASC',
        column: 'name'
      }
    },
    methods: {
      load () {
        this.$Progress.start()
        service.page(this.column, this.order)
          .then(response => {
            this.$Progress.finish()
            this.authors = response.data
          })
          .catch(e => {
            this.$Progress.fail()
            this.showErrorMsg({message: '... we got problems fetching list', title: 'Uh oh!', timeout: 5000})
          })
      },
      setColumn (column) {
        this.column = column
        this.load()
      },
      setOrder (order) {
        this.order = order
        this.load()
      },
      detailModal (obj) {
        this.author = JSON.parse(JSON.stringify(obj))
        this.$modal.show('detail-modal')
      },
      deleteModal (obj) {
        this.author = obj
        this.$modal.show('delete-modal')
      },
      closeModal () {
        this.author = {}
        this.$modal.hide('detail-modal')
        this.$modal.hide('delete-modal')
      },
      saveData () {
        this.$Progress.start()
        if (this.author.github === '') {
          this.author.github = null
        }
        if (this.author.twitter === '') {
          this.author.twitter = null
        }
        if (this.author.id) {
          service.update(this.author.id, this.author)
            .then(response => {
              this.$Progress.finish()
              this.$modal.hide('detail-modal')
              this.author = {}
              this.load()
            })
            .catch(e => {
              this.$Progress.fail()
              this.showErrorMsg({message: '... we got problems updating data', title: 'Uh oh!', timeout: 5000})
            })
        } else {
          service.create(this.author)
            .then(response => {
              this.$Progress.finish()
              this.$modal.hide('detail-modal')
              this.author = {}
              this.load()
            })
            .catch(e => {
              this.$Progress.fail()
              this.showErrorMsg({message: '... we got problems saving data', title: 'Uh oh!', timeout: 5000})
            })
        }
      },
      deleteData () {
        this.$Progress.start()
        service.delete(this.author.id)
          .then(response => {
            this.$Progress.finish()
            this.$modal.hide('delete-modal')
            this.author = {}
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
      this.load()
    }
  }
</script>
