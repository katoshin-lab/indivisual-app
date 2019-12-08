<template>
  <div>
    <h2>掲示板</h2>
    <div class="posts">
      <transition-group
        name="fade"
        mode="out-in"
      >
      
        <div
          v-for="(post, index) in posts"
          :key="post.name"
          class="post-box"
        >
          <router-link :to="{
            name: 'thread',
            params: {id: index + 1}
          }">
            <div :id="index + 1">投稿者：{{ post.fields.name.stringValue }}</div>
            <div>トピック：{{ post.fields.comment.stringValue }}</div>
          </router-link>
        </div>
      </transition-group>
    </div>
    <h3>掲示板に投稿する</h3>
    <div class="form-box">
      <div class="form-box__name">
        <label for="name">nickname</label>
        <input
          id="name"
          class="form"
          type="text"
          v-model="name"
        >
      </div>
      <div>
        <label for="comment">comment</label>
        <textarea
          id="commnet"
          class="form"
          v-model="comment"
        ></textarea>
      </div>
      <button @click="createComment">送信</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      name: "",
      comment: "",
      posts: []
    }
  },
  computed: {
    idToken() {
      return this.$store.getters.idToken;
    }
  },
  created() {             // ロード時に実行
    axios.get(
      '/comments', {
        headers: {
          Authorization: `Bearer ${this.idToken}`
        }
      }
    )
    .then(response => {
      this.posts = response.data.documents;
    })
  },
  methods: {
    createComment() {
      axios.post(
        '/comments', {        // baseURLを使用 postの引数（url, data, ヘッダーなどの設定）
          fields: {                 // cloud firestoreではこの型が必要
            name: {                 // オブジェクトでカラム
              stringValue: this.name      // このような形でデータを送る
            },
            comment: {
              stringValue: this.comment
            }
          }
        }, {
          headers: {
            Authorization: `Bearer ${this.idToken}`
          }
        }
      )
      .then(response => {
        console.log(response);
        this.$router.go({path: this.$router.currentRoute.path, force: true})
      })
      .catch(error => {
        console.log(error);
      })
      this.name = "";
      this.comment = "";
    }
  }
}
</script>

<style lang="scss" scoped>
  .posts {
    height: 450px;
    overflow: scroll;
  }
  .post-box {
    width: 60vw;
    padding: 10px;
    margin: 10px auto;
    border: solid 1px gray;
    border-radius: 3px;
  }

  .form-box {
    width: 60%;
    margin: 0 auto;
  }

  .form {
    border-radius: 3px;
    width: 50%;
  }

  label {
    display: inline-block;
    margin: auto;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s;
  }

</style>
