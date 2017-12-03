<template>
  <transition name="fade">
    <article class="post">
      <header>
        <div style="position:absolute; right: 0; margin: 4px">
          <a class="button small" style=" cursor: pointer; padding-top: 4px"  @click="publishModal" v-if="!article.publishedAt && articleId"><i class="fa fa-cloud-upload fa-2x"></i></a>
          <a class="button small" style=" cursor: pointer; padding-top: 4px"  @click="unpublishModal" v-if="article.publishedAt && articleId"><i class="fa fa-cloud-download fa-2x"></i></a>
          <a class="button small" style=" cursor: pointer; padding-top: 4px"  @click="saveData"><i class="fa fa-floppy-o fa-2x"></i></a>
          <a class="button small" style=" cursor: pointer; padding-top: 4px"  @click="cancelModal"><i class="fa fa-times fa-2x"></i></a>
        </div>
        <div class="title">
          <div style="width:48%; float:left">
            <p style="text-align: justify;">KEY: <input type="text" v-model="article.key" :readonly="articleId"></p>
          </div>
          <div style="width:48%; float:right; margin-left:4%">
            <p style="text-align: justify;">AUTHOR: <select v-model="author">
              <option disabled value="">-- SELECT --</option>
              <option v-for="author in authors" :value="author.id">{{author.name.toUpperCase()}} &lt;&#064;{{author.alias.toUpperCase()}}&gt;</option>
            </select></p>
          </div>

          <div style="width:48%; float:left">
            <p style="text-align: justify;">TITLE: <input type="text" v-model="article.title"></p>
          </div>
          <div style="width:48%; float:right; margin-left:4%">
            <p style="text-align: justify;">ABSTRACT:  <textarea v-model="article.abstract" style="resize: vertical" rows="7"/></p>
          </div>

          <div style="width:48%; float:left">
            <p style="text-align: justify;">IMAGE: <input type="text" v-model="article.imageUrl"></p>
          </div>

          <div style="width:48%; float:left">
            <p style="text-align: justify;">SHORT URL: <input type="text" v-model="article.shortUrl"></p>
          </div>


          <p style="text-align: justify;" v-if="articleId"><br/>TAGS: <v-select multiple :options="tags" :label="'name'" :value.sync="tagList"></v-select></p>

        </div>
      </header>

      <div>
        <tabs :options="{ useUrlFragment: false }">
          <tab name="EDIT CONTENT">
            <textarea v-model="article.content" rows="20"></textarea>
          </tab>
          <tab name="PREVIEW">
            <p><vue-markdown :source="article.content"></vue-markdown></p>
          </tab>
        </tabs>
      </div>

      <modal name="publish-modal"  :height="200" :adaptive="true">
        <div style="margin:30px">
          <h2>Publish Article</h2>
          <p style="text-align: center;">Unsaved changes won't be published. Do you want to continue?</p>
          <p style="text-align: right;">
            <a class="button small" style="cursor: pointer"  @click="closeModal"><i class="fa fa-times fa-lg"></i> CANCEL</a>
            <a class="button small" style="cursor: pointer"  @click="publish"><i class="fa fa-check fa-lg"></i> CONFIRM</a>
          </p>
        </div>
      </modal>

      <modal name="unpublish-modal"  :height="200" :adaptive="true">
        <div style="margin:30px">
          <h2>Unpublish Article</h2>
          <p style="text-align: center;">This action put the article offline. Do you want to continue?</p>
          <p style="text-align: right;">
            <a class="button small" style="cursor: pointer"  @click="closeModal"><i class="fa fa-times fa-lg"></i> CANCEL</a>
            <a class="button small" style="cursor: pointer"  @click="unpublish"><i class="fa fa-check fa-lg"></i> CONFIRM</a>
          </p>
        </div>
      </modal>

      <modal name="cancel-modal"  :height="200" :adaptive="true">
        <div style="margin:30px">
          <h2>Close Article</h2>
          <p style="text-align: center;">Unsaved changes will be lost. Do you want to continue?</p>
          <p style="text-align: right;">
            <a class="button small" style="cursor: pointer"  @click="closeModal"><i class="fa fa-times fa-lg"></i> CANCEL</a>
            <a class="button small" style="cursor: pointer"  @click="back"><i class="fa fa-check fa-lg"></i> CONFIRM</a>
          </p>
        </div>
      </modal>

    </article>
  </transition>
</template>
<script>
import articleService from '@/services/BlogService'
import tagService from '@/services/TagService'
import authorService from '@/services/AuthorService'
import VueNotifications from 'vue-notifications'
import VueMarkdown from 'vue-markdown'
import vSelect from 'vue-select'

export default {
  name: 'blog-article',
  resource: 'BlogArticle',
  props: { article: Object },
  components: {VueMarkdown, vSelect},
  data () {
    return {
      authors: [],
      tags: [],
      author: {},
      tagList: [],
      articleId: undefined
    }
  },
  methods: {
    getTags () {
      this.$Progress.start()
      tagService.list()
        .then(response => {
          this.$Progress.finish()
          this.tags = response.data
        })
        .catch(e => {
          this.$Progress.fail()
          this.showErrorMsg({message: '... we got problems fetching the tags list', title: 'Uh oh!', timeout: 5000})
        })
    },
    getAuthors () {
      this.$Progress.start()
      authorService.list()
        .then(response => {
          this.$Progress.finish()
          this.authors = response.data
        })
        .catch(e => {
          this.$Progress.fail()
          this.showErrorMsg({message: '... we got problems fetching the authors list', title: 'Uh oh!', timeout: 5000})
        })
    },
    cancelModal () {
      this.$modal.show('cancel-modal')
    },
    publishModal () {
      this.$modal.show('publish-modal')
    },
    unpublishModal () {
      this.$modal.show('unpublish-modal')
    },
    closeModal () {
      this.$modal.hide('cancel-modal')
      this.$modal.hide('publish-modal')
      this.$modal.hide('unpublish-modal')
    },
    back () {
      this.$parent.edit = false
      this.$parent.load()
      this.$modal.hide('cancel-modal')
    },
    publish () {
      const obj = {
        id: this.article.id,
        publishedAt: new Date()
      }
      articleService.update((this.article.id || this.articleId), obj)
        .then(response => {
          this.$Progress.finish()
          this.article.publishedAt = new Date()
          this.$modal.hide('publish-modal')
          this.showSuccessMsg({message: '... information successfully updated', title: 'Article'})
        })
        .catch(e => {
          this.$Progress.fail()
          this.showErrorMsg({message: '... we got problems updating data', title: 'Uh oh!', timeout: 5000})
        })
    },
    unpublish () {
      const obj = {
        id: (this.article.id || this.articleId),
        publishedAt: null
      }
      articleService.update((this.article.id || this.articleId), obj)
        .then(response => {
          this.$Progress.finish()
          this.article.publishedAt = null
          this.$modal.hide('unpublish-modal')
          this.showSuccessMsg({message: '... information successfully updated', title: 'Article'})
        })
        .catch(e => {
          this.$Progress.fail()
          this.showErrorMsg({message: '... we got problems updating data', title: 'Uh oh!', timeout: 5000})
        })
    },
    saveData () {
      this.$Progress.start()
      const obj = {
        id: this.article.id,
        title: this.article.title,
        key: this.article.key,
        abstract: this.article.abstract,
        content: this.article.content,
        imageUrl: this.article.imageUrl,
        shortUrl: this.article.shortUrl,
        author_id: this.author,
        tags: this.tagList
      }

      if (this.article.imageUrl === '') {
        this.article.imageUrl = null
      }
      if (this.article.id || this.articleId) {
        articleService.update((this.article.id || this.articleId), obj)
          .then(response => {
            this.$Progress.finish()
            this.showSuccessMsg({message: '... information successfully updated', title: 'Article'})
          })
          .catch(e => {
            this.$Progress.fail()
            this.showErrorMsg({message: '... we got problems updating data', title: 'Uh oh!', timeout: 5000})
          })
      } else {
        articleService.create(obj)
          .then(response => {
            this.$Progress.finish()
            this.articleId = response.data.id
            this.showSuccessMsg({message: '... information successfully stored', title: 'Article'})
          })
          .catch(e => {
            this.$Progress.fail()
            this.showErrorMsg({message: '... we got problems saving data', title: 'Uh oh!', timeout: 5000})
          })
      }
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
    this.author = ((this.article.author || {}).id) || ''
    this.tagList = this.article.tags
    this.articleId = this.article.id
    this.getTags()
    this.getAuthors()
  }
}
</script>
