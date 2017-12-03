<template>
  <transition name="fade">
    <article class="post" v-if="!edit">
      <header>
        <div class="title">
          <h2>
            <i class="fa fa-newspaper-o"></i> Articles
          </h2>

        </div>
        <div style="margin-right:50px; margin-top: 40px;">
          <a class="button" style="cursor: pointer"  @click="detailModal({})"><i class="fa fa-plus fa-lg"></i> New Article</a>
        </div>
      </header>

      <table>
        <thead>
        <tr>
          <th style="width: 100px;">ID</th>
          <th style="width: 430px;">TITLE</th>
          <th>AUTHOR</th>
          <th style="width: 50px;">PUBLISHED</th>
          <th style="width: 300px; text-align: center">ACTIONS</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="article in articles">
          <td>{{article.id}}</td>
          <td><a :href="'http://lexmartinez.com/read/' + article.key" target="_blank">{{article.title}}</a></td>
          <td>{{article.author.name}} &nbsp; &lt;&#064;{{article.author.alias}}&gt;</td>
          <td style="text-align: center"><i class="fa fa-check-square-o" v-if="article.publishedAt"></i></td>
          <td style="text-align: center">
            <a class="button" style="cursor: pointer"  @click="detailModal(article)"><i class="fa fa-pencil fa-lg"></i> Edit</a>
            <a class="button" style="cursor: pointer"  @click="deleteModal(article)"><i class="fa fa-trash fa-lg"></i> Delete</a>
          </td>
        </tr>
        </tbody>
      </table>
      <modal name="delete-modal"  :height="200" :adaptive="true">
        <div style="margin:30px">
          <h2>Delete Article</h2>
          <p style="text-align: center;">Are you sure you want delete this item?</p>
          <p style="text-align: right;">
            <a class="button small" style="cursor: pointer"  @click="closeModal"><i class="fa fa-times fa-lg"></i> CANCEL</a>
            <a class="button small" style="cursor: pointer"  @click="deleteData"><i class="fa fa-check fa-lg"></i> CONFIRM</a>
          </p>
        </div>
      </modal>
    </article>
    <blog-article :article="article" v-if="edit"></blog-article>
  </transition>
</template>

<script>
  import service from '@/services/BlogService'
  import VueNotifications from 'vue-notifications'
  import BlogArticle from './BlogArticle'

  export default {
    name: 'blog-articles',
    resource: 'BlogArticles',
    components: {BlogArticle},
    data () {
      return {
        articles: [],
        article: {},
        edit: false
      }
    },
    methods: {
      load () {
        this.$Progress.start()
        service.getArticles()
          .then(response => {
            this.$Progress.finish()
            this.articles = response.data
          })
          .catch(e => {
            this.$Progress.fail()
            this.showErrorMsg({message: '... we got problems fetching list', title: 'Uh oh!', timeout: 5000})
          })
      },
      detailModal (obj) {
        this.article = JSON.parse(JSON.stringify(obj))
        this.edit = true
      },
      deleteModal (obj) {
        this.article = obj
        this.$modal.show('delete-modal')
      },
      closeModal () {
        this.article = {}
        this.edit = false
        this.$modal.hide('delete-modal')
      },
      deleteData () {
        this.$Progress.start()
        service.delete(this.article.id)
          .then(response => {
            this.$Progress.finish()
            this.$modal.hide('delete-modal')
            this.article = {}
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
